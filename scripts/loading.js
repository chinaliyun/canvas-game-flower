Flower.Loading = (function(Flower) {
    console.log('loading')
    var loading = document.getElementById('loading');
    Flower.observer.subscribe('loading-change', function(name) {
        document.title = Flower.loading;
        if (Flower.loadingAllow) {
            var loading = Flower.loading,
                maxLoading = Flower.maxLoading,
                percent = loading / maxLoading,
                progressWidth = $('#progress_bar').width(),
                slideUp = $('#loading').height();
            // document.title = percent;
            console.log(name + ':' + percent)
            $('#percent').animate({
                'left': progressWidth * percent - progressWidth
            }, 400, function() {
                if (percent == 1) {
                    $('.progress_img>.heart').addClass('heartShow');
                    setTimeout(function() {
                        $('#loading').animate({
                            'top': '-' + slideUp + 'px'
                        }, 400);
                        Flower.observer.publish('game-ready');
                    }, 1000)
                }
            });
            $('.progress_img>.left').animate({
                'left': (progressWidth - 52) * percent
            });
        }
    })
}(Flower));
