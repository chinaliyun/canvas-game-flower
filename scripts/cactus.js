Flower.Cactus = (function(Flower) {
    console.log('cactus')

    var canvas = Flower.canvas,
        ctx = Flower.ctx,
        cactusImg = document.createElement('img'),
        newCactus = null,
        newTime,
        cactusCount = 0,
        cactusIndex = 0;

    cactusImg.src = 'images/cactuses.png'; //70*80
    cactusImgWidth = 70;
    cactusImgHeight = 80;
    cactusImg.addEventListener('load', function() {
        Flower.loading++;
        Flower.observer.publish('loading-change', 'cactus');

    });


    function drawCactus() {
        var cactuses = Flower.cactuses;

        if (Flower.cactuses.length > 0) {
            var cactuses = Flower.cactuses;
            // console.log('debug')
            for (i in cactuses) {
                var value = cactuses[i];
                ctx.drawImage(cactusImg, cactusImgWidth * value.indexNum, 0, cactusImgWidth, cactusImgHeight, value.left, value.top, cactusImgWidth, cactusImgHeight);
                // console.log(value)
                // console.log(cactusImgWidth * value.indexNum, 0, cactusImgWidth, cactusImgHeight, value.left, value.top, cactusImgWidth, cactusImgHeight)
                // console.log('this.indexNum: ' + value.indexNum)
                // Flower.ctx.drawImage(daisyImg, canvas.width / 2, 0);
            }
        }
    }

    function createCactus() {
        this.left = Flower.canvas.width;
        this.top = Flower.canvas.height * Flower.backgroundSliceTop - cactusImg.height;
        this.right = this.left + cactusImgWidth;
        this.count = 'cactus' + cactusCount;
        this.indexNum = cactusIndex;
    }

    function cactusMoving() { //移动仙人掌并检查碰撞
        if (Flower.cactuses.length > 0) {
            var cactuses = Flower.cactuses;
            var player = Flower.Player;
            for (i in cactuses) {
                var key = cactuses[i];
                if (key.left + cactusImg.width <
                    0) {
                    Flower.cactuses.splice(i, 1);
                    continue;
                }
                if (player.right > key.left + 10 && player.bottom > key.top && player.left < key.right - 20) {
                    Flower.observer.publish('player-in-cactus', key.count);
                    Flower.cactuses.splice(i, 1);
                    continue;
                }
                key.left -= Flower.movingPixel;
                key.right -= Flower.movingPixel;
            }
        }
    }

    function addNew() {
        cactusCount++;
        Flower.cactuses.push(new createCactus());
        if (cactusIndex == cactusImg.width / cactusImgWidth - 1) {
            cactusIndex = 0;
        } else {
            cactusIndex++;
        }
        if (Flower.gameIsRunning) {
            newTime = Math.random() * 4000 + 500;
            setTimeout(addNew, newTime)
        }
    }

    // Flower.cactuses.push
    (new createCactus());

    Flower.observer.subscribe('game-begin', function() {
        addNew();
    })

    Flower.observer.subscribe('loop-render', function() {
        drawCactus();
        cactusMoving();
    });
}(Flower));
