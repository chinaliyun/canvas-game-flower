Flower.Background = (function(Flower) {
    console.log('background')
    var canvas = Flower.background,
        ctx = Flower.backgroundContent,
        backgroundImg = document.createElement('img'),
        imgReady = false,
        backgroundBisicLeft = 0,
        backgroundWidth = Flower.background.width;

    backgroundImg.src = 'images/background.jpg'; //960*640
    backgroundImg.width = 960;
    backgroundImg.hegiht = 640;
    backgroundImg.addEventListener('load', function() {
        Flower.loading++;
        Flower.observer.publish('loading-change', 'background');
        ctx.drawImage(backgroundImg, backgroundBisicLeft, 0, Flower.background.width, backgroundImg.height, 0, 0, Flower.background.width, Flower.background.height);
    })
}(Flower));
