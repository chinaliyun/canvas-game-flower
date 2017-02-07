var Flower = (function() {
    console.log()

    /*
     *                            _ooOoo_  
     *                           o8888888o  
     *                           88" . "88  
     *                           (| -_- |)  
     *                            O\ = /O  
     *                        ____/`---'\____  
     *                      .   ' \\| |// `.  
     *                       / \\||| : |||// \  
     *                     / _||||| -:- |||||- \  
     *                       | | \\\ - /// | |  
     *                     | \_| ''\---/'' | |  
     *                      \ .-\__ `-` ___/-. /  
     *                   ___`. .' /--.--\ `. . __  
     *                ."" '< `.___\_<|>_/___.' >'"".  
     *               | | : `- \`.;`\ _ /`;.`/ - ` : | |  
     *                 \ \ `-. \_ __\ /__ _/ .-` / /  
     *         ======`-.____`-.___\_____/___.-`____.-'======  
     *                            `=---='  
     *  
     *         .............................................  
     *                  佛祖保佑             永无BUG 
     *          佛曰:  
     *                  写字楼里写字间，写字间里程序员；  
     *                  程序人员写程序，又拿程序换酒钱。  
     *                  酒醒只在网上坐，酒醉还来网下眠；  
     *                  酒醉酒醒日复日，网上网下年复年。  
     *                  但愿老死电脑间，不愿鞠躬老板前；  
     *                  奔驰宝马贵者趣，公交自行程序员。  
     *                  别人笑我忒疯癫，我笑自己命太贱；  
     *                  不见满街漂亮妹，哪个归得程序员？ 
     */
    var panel = document.getElementById('canvasPanel'),
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext("2d"),
        backgroundCanvas = document.getElementById('background'),
        backgroundContent = background.getContext('2d'),
        ua = navigator.userAgent.toString(),
        loadingAllow = true,
        setMaxLoading = 8;

    function isMobile() {
        return /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile/i.test(ua)
    }

    console.log(panel);
    if (isMobile()) {
        $('#main').css({
            'width': window.innerWidth,
            'height': window.innerHeight,
        })
    } else {
        $('#main').css({
            'width': '414px',
            'height': '736px',
            'margin': '0 auto',
            // 'overflow-y': 'scroll',
            'overflow-x': 'hidden'
        })
    }
    if (!/MicroMessenger/i.test(ua)) {
        // loadingAllow = false;
        // $('#wechat').css('display', 'block')
    }
    // alert(ua);
    canvas.width = parseInt($('#main').width());
    canvas.height = parseInt($('#main').height());
    backgroundCanvas.width = parseInt($('#main').width());
    backgroundCanvas.height = parseInt($('#main').height());
    audio = document.getElementById('audio');
    timeCount = 30;
    return {
        canvas: canvas, //游戏面板
        ctx: ctx, //游戏面板上下文
        background: backgroundCanvas, //游戏背景
        backgroundContent: backgroundContent, //游戏背景上下文
        backgroundSliceTop: 0.9,
        backgroundSliceBottom: 0.1,
        grounds: [],
        cactuses: [],
        daisies: [],
        clouds: [],
        stones: [],
        timer: 8,
        maxTime: 1000 * timeCount,
        leftTime: timeCount,
        score: {
            daisy: {},
            cactus: {}
        },
        cactusArray: [],
        daisyArray: [],
        daisyCount: 0,
        cactusCount: 0,
        audio: audio,
        gameIsRunning: false,
        movingPixel: 1,
        loading: 0,
        loadingAllow: loadingAllow,
        maxLoading: setMaxLoading,
        observer: (function() {
            var events = {};

            return {
                subscribe: function(eventName, callback) {

                    if (!events.hasOwnProperty(eventName)) {
                        events[eventName] = [];
                    }

                    events[eventName].push(callback);
                },

                publish: function(eventName) {
                    var data = Array.prototype.slice.call(arguments, 1),
                        index = 0,
                        length = 0;

                    if (events.hasOwnProperty(eventName)) {
                        length = events[eventName].length;

                        for (; index < length; index++) {
                            events[eventName][index].apply(this, data);
                        }
                    }
                }
            };
        }())
    }
}());

Flower.Events = (function(Flower) {

    function gameBegin() {
        // document.title = Flower.leftTime;
        if (Flower.leftTime == 0) {
            Flower.observer.publish('game-over');
            // return false;
        }
        Flower.observer.publish('clear-canvas');
        // Flower.observer.publish('ground-render');
        Flower.observer.publish('loop-render');
        if (Flower.gameIsRunning) {
            setTimeout(gameBegin, Flower.timer)
        }

    }

    function addResultImg() {

    }

    // 这里是倒计时的定时器
    var timer;

    Flower.observer.subscribe('game-begin', function() {
        Flower.gameIsRunning = true;
        Flower.observer.publish('background-render');
        gameBegin();
        timer = setInterval(function() {
            Flower.leftTime--;
            if (Flower.leftTime < 11 && Flower.leftTime > 0) {
                Flower.observer.publish('ten-left');
            }

        }, 1000);
        // setTimeout(gameBegin, Flower.timer)

    });
    Flower.observer.subscribe('clear-canvas', function() {
        Flower.ctx.clearRect(0, 0, Flower.canvas.width, Flower.canvas.height);
    });

    Flower.observer.subscribe('player-in-cactus', function(count) {
        // Flower.audio.play();
        if (!Flower.score.cactus.hasOwnProperty(count)) {
            Flower.score.cactus[count] = count;
            Flower.cactusArray.push(count);
            var indexNum = parseInt(count.slice('6')) + 1;
            var newImg = document.createElement('img');
            newImg.src = 'images/sm/c' + indexNum + '.png';
            $('#result>.fail>.imgbox>.content').append(newImg);
        }

        switchResult();
        // console.log(Flower.cactusArray.length + Flower.daisyArray.length);
        // console.log(Flower.scoreArray)
    });

    function switchResult() {
        $('#result>.fail').css('display', 'block');
        $('#result>.succ').hide();
        $('#result').addClass('result_fail');
    }
    Flower.observer.subscribe('player-in-daisy', function(count) {
        // Flower.audio.play();
        if (!Flower.score.daisy.hasOwnProperty(count)) {
            Flower.score.daisy[count] = count;
            Flower.daisyArray.push(count);
            var indexNum = parseInt(count.slice('5')) + 1;
            var newImg = document.createElement('img');
            newImg.src = 'images/sm/d' + indexNum + '.png';
            $('#result>.fail>.imgbox>.content').append(newImg);
        }
        /*if (Flower.cactusArray.length + Flower.daisyArray.length > 20) {
            $('#result>.imgbox>.content>img').css('width', '10 %');
        }*/

        switchResult();
        // Flower.observer.publish()
        // console.log(Flower.scoreArray)
    });

    Flower.observer.subscribe('game-over', function() {
        Flower.gameIsRunning = false;
        clearInterval(timer);
        console.log(Flower.score)
        $('#result').show();
        if (Flower.cactusArray.length == 0 && Flower.daisyArray.length == 0) {
            Flower.observer.publish('game-succ');
        } else {
            Flower.observer.publish('game-fail');
        }
        setTimeout(function() {
            $('.share').show();

        }, 2000);
    });

    Flower.observer.subscribe('game-reset', function() {
        Flower.gameIsRunning = true;
        Flower.observer.publish('background-render');
        gameBegin();
    });

}(Flower));
