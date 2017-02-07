Flower.Stone = (function(Flower) {
    console.log('stone')
    var canvas = Flower.canvas,
        ctx = canvas.getContext("2d"),
        timer = Flower.timer,
        stoneImg = document.createElement('img'),
        indexImg = 0,
        newStone = null;
    var stone = [{
        pX: 0,
        pY: 0,
        width: 202,
        height: 64,
        left: canvas.width * 0.05,
        top: canvas.height * 0.94
    }, {
        pX: 212,
        pY: 0,
        width: 52,
        height: 64,
        left: canvas.width * 0.3,
        top: canvas.height * 0.85
    }, {
        pX: 266,
        pY: 0,
        width: 150,
        height: 64,
        left: canvas.width * 0.5,
        top: canvas.height * 0.8
    }, {
        pX: 422,
        pY: 0,
        width: 110,
        height: 64,
        left: canvas.width * 0.8,
        top: canvas.height * 0.92
    }];

    stoneImg.src = 'images/stone.png';
    stoneImg.addEventListener('load', function() {
        Flower.loading++;
        Flower.observer.publish('loading-change', 'store');
        for (i in stone) {
            Flower.stones.push(new createStone(stone[i]));
        }
        // Flower.stones.push(new createStone(stone[0]));
        // Flower.stones.push(new createStone(stone[1]));
        // Flower.stones.push(new createStone(stone[2]));
        // Flower.stones.push(new createStone(stone[3]));
        draw();
    })

    function createStone(options) {
        this.pX = options.pX;
        this.pY = options.pY;
        this.width = options.width;
        this.height = options.height;
        this.left = Flower.gameIsRunning ? canvas.width : options.left;
        this.top = options.top;
    }



    function stoneMoving() {
        var stones = Flower.stones;
        for (i in stones) {
            var value = stones[i];
            if (value.left + value.width < 0) {
                Flower.stones.splice(i, 1);
                continue;
            }
            stones[i].left -= Flower.movingPixel;
        }
    }

    function draw() {
        // console.log('draw-stone')
        var stones = Flower.stones;
        for (i in stones) {
            var value = stones[i];
            // console.log(value)
            ctx.drawImage(stoneImg, value.pX, value.pY, value.width, value.height, value.left, value.top, value.width / 3 * 2, value.height / 3 * 2);
        }
    }
    var newTime;

    function addNew() {
        Flower.stones.push(new createStone(stone[indexImg]));
        if (indexImg == stone.length - 1) {
            indexImg = 0;
        } else {
            indexImg++;
        }
        if (Flower.gameIsRunning) {
            newTime = 3000 + 1000 * Math.random();
            setTimeout(addNew, newTime)
        }
    }
    Flower.observer.subscribe('game-begin', function() {
        /*newStone = setInterval(function() {
            // console.log(Flower.stones.length, indexImg);
            Flower.stones.push(new createStone(stone[indexImg]));
            if (indexImg == stone.length - 1) {
                indexImg = 0;
            } else {
                indexImg++;
            }
        }, 3000 + 1000 * Math.random());*/
        addNew();

    })

    Flower.observer.subscribe('loop-render', function() {

        draw();
        stoneMoving();

    });
    Flower.observer.subscribe('game-over', function() {
        clearInterval(newStone)
    })

}(Flower));
