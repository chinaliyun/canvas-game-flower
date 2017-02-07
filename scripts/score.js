Flower.Score = (function(Flower) {
    console.log('score')
    var canvas = Flower.canvas,
        ctx = canvas.getContext("2d"),
        score = document.createElement('img'),
        daisyCount = 0,
        cactusCount = 0,
        leftTime = 0;
    score.src = "images/score.png";

    score.addEventListener('load', function() {
        Flower.loading++;
        Flower.observer.publish('loading-change', 'score');
        draw();
    });

    function draw() {
        // ctx.fillStyle = "rgba(0,0,0,0.6)";
        // ctx.fillRect(0, 0, canvas.width, 50);
        daisyCount = 'x ' + Flower.daisyArray.length;
        cactusCount = 'x ' + Flower.cactusArray.length;
        leftTime = Flower.leftTime > 9 ? Flower.leftTime : '0' + Flower.leftTime;

        ctx.drawImage(score, 0, 0, 30, 30, 10, 10, 30, 30);
        ctx.drawImage(score, 0, 48, 36, 36, 8, 50, 30, 30);
        ctx.drawImage(score, 30, 0, 98, 43, canvas.width - 120, 20, 98, 43);
        ctx.fillStyle = "#2d2d2d";
        ctx.font = "bold 20px arial";
        ctx.fillText(daisyCount, 55, 34);
        ctx.fillText(cactusCount, 55, 74);
        ctx.font = "50px";
        ctx.fillText('00:' + leftTime, canvas.width - 96, 48);
        // console.log(ctx.font)
    }
    Flower.observer.subscribe('loop-render', function() {
        draw();
    });
    // function draw(){

    // }
}(Flower));
