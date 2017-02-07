Flower.Cloud = (function(Flower) {
    console.log('cloud')
    var canvas = Flower.canvas,
        ctx = canvas.getContext("2d"),
        timer = Flower.timer,
        cloudImg = document.createElement('img'),
        indexImg = 0,
        newCloud = null;
    var cloud = [{
        pX: 0,
        pY: 0,
        width: 194,
        height: 82,
        left: canvas.width * 0.1,
        top: canvas.height * 0.3
    }, {
        pX: 200,
        pY: 0,
        width: 144,
        height: 82,
        left: canvas.width * 0.7,
        top: canvas.height * 0.2
    }, {
        pX: 346,
        pY: 0,
        width: 108,
        height: 82,
        left: canvas.width * 0.5,
        top: canvas.height * 0.4
    }];

    cloudImg.src = 'images/cloud.png';
    cloudImg.addEventListener('load', function() {
        Flower.loading++;
        Flower.observer.publish('loading-change', 'cloud');
        // console.log('load')
        for (i in cloud) {
            Flower.clouds.push(new createCloud(cloud[i]));
        }
        draw();
    })

    function createCloud(options) {
        this.pX = options.pX;
        this.pY = options.pY;
        this.width = options.width;
        this.height = options.height;
        this.left = Flower.gameIsRunning ? canvas.width : options.left;
        this.top = options.top;
    }



    function cloudMoving() {
        var clouds = Flower.clouds;
        for (i in clouds) {
            var value = clouds[i];
            if (value.left + value.width < 0) {
                Flower.clouds.splice(i, 1);
                continue;
            }
            clouds[i].left -= Flower.movingPixel;
        }
    }

    function draw() {
        // console.log('draw-cloud')
        var clouds = Flower.clouds;
        for (i in clouds) {
            var value = clouds[i];
            // console.log(value)
            ctx.drawImage(cloudImg, value.pX, value.pY, value.width, value.height, value.left, value.top, value.width / 3 * 2, value.height / 3 * 2);
        }
    }
    var newTime;

    function addNew() {
        Flower.clouds.push(new createCloud(cloud[indexImg]));
        if (indexImg == cloud.length - 1) {
            indexImg = 0;
        } else {
            indexImg++;
        }
        if (Flower.gameIsRunning) {
            newTime = 1000 + 1000 * Math.random();
            setTimeout(addNew, newTime)
        }
    }
    Flower.observer.subscribe('game-begin', function() {
        addNew()
    })

    Flower.observer.subscribe('loop-render', function() {

        draw();
        cloudMoving();

    });
    Flower.observer.subscribe('game-over', function() {
        clearInterval(newCloud)
    })

}(Flower));
