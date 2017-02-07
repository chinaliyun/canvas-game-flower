Flower.Player = (function(Flower) {
    console.log('player')
    var playerImg = document.createElement('img');
    playerImg.src = 'images/player.png'; //40*40
    playerImg.width = 45;
    playerImg.height = 58;

    daisyImg = playerImg.cloneNode();
    daisyImg.src = 'images/daisy.png'

    cactusImg = playerImg.cloneNode();
    cactusImg.src = 'images/cactus.png'

    playerImg.addEventListener('load', function() {
        Flower.loading++;
        Flower.observer.publish('loading-change', 'player');
        drawPlayer(player)
    })
    var playerPosition = {};
    var player = new createPlayer();

    function drawPlayer(player) {
        Flower.ctx.drawImage(playerImg, player.left, player.top);
    }

    function createPlayer() {
        this.left = (Flower.canvas.width / 2) - playerImg.width / 2;
        this.top = Flower.canvas.height * Flower.backgroundSliceTop - playerImg.height;
        this.basicTop = Flower.canvas.height * Flower.backgroundSliceTop - playerImg.height;
    }

    Flower.canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (Flower.gameIsRunning && player.top > 40) {
            player.top -= 30;
        }
    }, false);
    Flower.canvas.addEventListener('click', function(e) {
        e.preventDefault();
        if (Flower.gameIsRunning && player.top > 40) {
            player.top -= 30;
        }
    }, false);
    window.addEventListener('keydown', function(e) {
        e.preventDefault();
        if (e.keyCode == 38 && Flower.gameIsRunning && player.top > 400) {
            player.top -= 30;
        };
    }, false);

    function playerMoving() {
        if (player.top < player.basicTop) {
            player.top += Flower.movingPixel;
        }
        playerPosition.left = player.left;
        playerPosition.top = player.top;
        playerPosition.right = player.left + playerImg.width;
        playerPosition.bottom = player.top + playerImg.height;
    }

    Flower.observer.subscribe('loop-render', function() {
        drawPlayer(player)
        playerMoving();
    });

    Flower.observer.subscribe('player-in', function() {
        // player.top -= 100;
        // playerPosition.left = player.left;
        // playerPosition.right = player.left + playerImg.width;
        // playerPosition.bottom = player.top + playerImg.height;
    });

    return playerPosition;
}(Flower));
