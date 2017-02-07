Flower.Daisy = (function(Flower) {
    console.log('daisy')
    var canvas = Flower.canvas,
        ctx = Flower.ctx,
        daisyImg = document.createElement('img'),
        newDaisy,
        daisyCount = 0,
        daisyIndex = 0;


    daisyImg.src = 'images/daisies.png'; //43*50
    daisyImgWidth = daisyImgHeight = 60;
    daisyImg.addEventListener('load', function() {
        Flower.loading++;
        Flower.observer.publish('loading-change', 'daisy');
        // console.log('daisy.png');
    });

    function drawDaisy() {
        if (Flower.daisies.length > 0) {
            var daisies = Flower.daisies;
            // console.log('debug')
            for (i in daisies) {
                var value = daisies[i];
                ctx.drawImage(daisyImg, daisyImgWidth * value.indexNum, 0, daisyImgWidth, daisyImgHeight, value.left, value.top, daisyImgWidth, daisyImgHeight);
            }
        }
    }


    function createDasiy() {
        this.top = 0 - daisyImg.height;
        this.left = canvas.width / 3 + canvas.width * 1.5 * Math.random();
        this.right = this.left + daisyImgWidth;
        this.bottom = this.top + daisyImgHeight;
        this.count = 'daisy' + daisyCount;
        this.indexNum = daisyIndex;
    }

    function checkCrash(playerLeft, playerRight, playerTop, playerBottom, daisyLeft, daisyRight, daisyTop, daisyBottom) {


        var px = playerTop > daisyTop && playerTop < daisyBottom || playerBottom > daisyTop && playerTop < daisyBottom,
            py = playerLeft > daisyLeft && playerLeft < daisyRight || playerRight > daisyLeft && playerRight < daisyRight,
            result = px && py;

        return px && py;

    }
    // Flower.daisies.push(new createDasiy);

    function daisyMoving() {
        if (Flower.daisies.length > 0) {
            var daisies = Flower.daisies,
                playerLeft = Flower.Player.left,
                playerRight = Flower.Player.right,
                playerTop = Flower.Player.top,
                playerBottom = Flower.Player.bottom;

            for (i in daisies) {
                var key = daisies[i],
                    keyLeft = key.left,
                    keyRight = key.right,
                    keyTop = key.top,
                    keyBottom = key.bottom;
                if (key.left + daisyImg.width < 0) {
                    Flower.daisies.splice(i, 1);
                    continue;
                }
                if (checkCrash(playerLeft, playerRight, playerTop, playerBottom, keyLeft + 5, keyRight - 5, keyTop + 5, keyBottom - 5)) {
                    Flower.observer.publish('player-in-daisy', key.count);
                    Flower.daisies.splice(i, 1);
                    continue;
                }
                key.left -= Flower.movingPixel;
                key.top += Flower.movingPixel;
                key.right -= Flower.movingPixel;
                key.bottom += Flower.movingPixel;
            }
        }
    };

    var newTime;

    function addNew() {
        Flower.daisies.push(new createDasiy());

        // console.log(Flower.daisies.length, daisyIndex)
        daisyCount++;
        if (daisyIndex == daisyImg.width / daisyImgWidth - 1) {
            daisyIndex = 0;
        } else {
            daisyIndex++;
        }
        if (Flower.gameIsRunning) {
            newTime = Math.random() * 1000 + 500;
            setTimeout(addNew, newTime)
        }
    }

    Flower.observer.subscribe('game-begin', function() {
        addNew();
    });
    Flower.observer.subscribe('loop-render', function() {
        drawDaisy();
        daisyMoving();
    });
    Flower.observer.subscribe('game-over', function() {
        // clearInterval(newDaisy)
    })

}(Flower));
