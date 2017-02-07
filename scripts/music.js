Flower.music = (function(Flower) {
    console.log('audio');
    var backaudio = document.createElement('audio');

    backaudio.src = "audio/jucilang2.mp3";
    backaudio.loop = true;
    backaudio.volume = 0.5;
    backaudio.preload = true;
    // backaudio.load();
    backaudio.addEventListener('canplaythrough', function() {
        Flower.loading++;
        Flower.observer.publish('loading-change', 'backaudio');
        // backaudio.play();
    }, false);

    // 检查背景音乐加载进度

    // checkBackAudio();

    function checkBackAudio() {
        // document.title = backaudio.currentTime;
        if (backaudio.currentTime > 0) {
            Flower.loading++;
            Flower.observer.publish('loading-change', 'backaudio');
        } else {
            setTimeout(checkBackAudio, 30);
        }
    }

    var playerInaudio = backaudio.cloneNode();
    playerInaudio.src = "audio/audio.mp3"
    playerInaudio.loop = false;

    playerInaudio.addEventListener('canplay', function() {
        // Flower.loading++;
        // Flower.observer.publish('loading-change', 'playerInaudio');
    }, false);

    // 成功通关的声音
    var succAudio = playerInaudio.cloneNode();
    succAudio.src = 'audio/succ.mp3';
    succAudio.addEventListener('canplay', function() {

    });

    // 游戏失败的声音
    var failAudio = playerInaudio.cloneNode();
    failAudio.src = 'audio/fail.mp3';
    failAudio.addEventListener('canplay', function() {

    });

    // 最后十秒倒计时声音
    var tenLeftAudio = playerInaudio.cloneNode();
    tenLeftAudio.src = 'audio/ding.mp3';
    tenLeftAudio.addEventListener('canplay', function() {

    });

    Flower.observer.subscribe('game-ready', function() {
        backaudio.currentTime = 5;
        // backaudio.play();
    })
    Flower.observer.subscribe('game-over', function() {
        backaudio.pause();
    })
    Flower.observer.subscribe('ten-left', function() {
        tenLeftAudio.play();
    })

    var cactusFirstTime = true;

    Flower.observer.subscribe('player-in-cactus', function(count) {
        if (cactusFirstTime) {
            cactusFirstTime = false;
            playerInaudio.play()
        }
        if (playerInaudio.ended) {
            playerInaudio.play();
        } else {
            playerInaudio.currentTime = 0.1;
        }
    });
    var daisyFirstTime = true;
    Flower.observer.subscribe('player-in-daisy', function(count) {
        if (daisyFirstTime) {
            daisyFirstTime = false;
            playerInaudio.play()
        }
        if (playerInaudio.ended) {
            playerInaudio.play();
        } else {
            playerInaudio.currentTime = 0.1;
        }
    });
    Flower.observer.subscribe('game-succ', function() {
        succAudio.play();
    });

    Flower.observer.subscribe('game-fail', function() {
        failAudio.play();
    });
}(Flower));
