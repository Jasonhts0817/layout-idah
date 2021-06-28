$(document).ready(function () {
    initOwlSlider();
    menuClick();
    headerScroll();
    scrollToHash();
    iframeVideo();
});

function iframeVideo() {
    var body = $(document.body);
    var videoList = $('.hot-video-item iframe');
    var hotVideoModel = $('.hot-video-model');
    var hotVideoModelContainer = $('.hot-video-model-container');
    var hotVideoModelCloseBtn = $('.hot-video-close-btn');
    videoList.each(function (i, iframe) {
        var currentIframe = $(iframe);
        var iframe_src = currentIframe.data('url');

        var youtube_video_id = iframe_src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

        if (youtube_video_id.length == 11) {
            var video_thumbnail = $('<img src="//img.youtube.com/vi/' + youtube_video_id + '/0.jpg">');
            currentIframe.parent().append(video_thumbnail);
            currentIframe.appendTo(hotVideoModelContainer);
            video_thumbnail.click(function () {
                currentIframe.attr('src', iframe_src);
                hotVideoModel.fadeIn('400').css('display', 'flex');
                currentIframe.fadeIn('400');
                body.addClass("freezed");
            });
            hotVideoModelCloseBtn.click(function () {
                if (currentIframe.is(":visible") == true) { currentIframe.attr('src', iframe_src); }
                hotVideoModel.fadeOut('400');
                currentIframe.fadeOut('400');
                body.removeClass("freezed");
            });
        }
    });
}


function initOwlSlider() {

    var $promoteList = $('.promote-list');
    $promoteList.owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        responsiveRefreshRate: 0,
        responsive: {
            0: {},
            767: {}
        }
    });
    owlSliderEnableLazyload($promoteList);

    var $newsList = $('.news-list');
    $newsList.owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        responsiveRefreshRate: 0,
        responsive: {
            0: {
                center: true,
                items: 1.3
            },
            767: {
                items: 1
            }
        }
    });
    owlSliderEnableLazyload($newsList);

    var $expertList = $('.expert-list');
    $expertList.owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        responsiveRefreshRate: 0,
        responsive: {
            0: {
                center: true,
                margin: 10,
                items: 1.35
            },
            767: {
                margin: 17,
                items: 3.6
            }
        }
    });
    owlSliderEnableLazyload($expertList);

    var $hotVideoList = $('.hot-video-list');
    $hotVideoList.owlCarousel({
        nav: false,
        dots: false,
        loop: true,
        navText: ["<i class='glyphicon glyphicon-menu-left nav-prev'></i>", "<i class='glyphicon glyphicon-menu-right nav-next'></i>"],
        responsiveRefreshRate: 0,
        responsive: {
            0: {
                center: true,
                margin: 31,
                items: 1.35,
            },
            767: {
                margin: 20,
                items: 3.6,
            },
            1366: {
                margin: 40,
                items: 3.6,
            }
        }
    });
    owlSliderEnableLazyload($hotVideoList);
}


function owlSliderEnableLazyload($owlSlider) {
    console.log('owlSlider');
    if ($owlSlider.length > 0) {
        var $owlImages = $owlSlider.find('img');
        $owlImages.on('inview', function (event, isInView) {
            if (isInView) {
                console.log('owl img inview');
                var $img = $(this);
                $img.attr('src', $img.attr('data-lazy'));
                $img.removeAttr('data-lazy');
            }
        });
    }

}

function menuClick() {
    const body = $(document.body);
    const hdr = $('#hdr');
    const mask = $("#mask");
    const menuBtn = $("#menuBtn");
    const menuList = $("#menuList");
    const menuToggle = function () {
        menuList.toggleClass("active");
        menuBtn.toggleClass("active");
        mask.toggleClass("active");
        body.toggleClass("freezed");
    };
    const hideHeader = function () {
        hdr.attr('style', `top:${hdr.height() * -1}`);
    }
    menuBtn.click(function () {
        menuToggle();
    });

    $(body).click(function (e) {
        if (menuList.width() > 0 && mask.hasClass('active')) {
            headerFreeze();
            menuToggle();
            hideHeader();
        }
    });
}

function headerScroll() {
    const win = $(window);
    const hdr = $('#hdr');
    var prevScrollpos = win.scrollTop();
    win.scroll(function () {
        if (hdr.data("freeze") == true ||
            win.scrollTop() <= hdr.height()) {
            return;
        }
        var currentScrollPos = win.scrollTop();
        if (prevScrollpos > currentScrollPos) {
            hdr.attr('style', 'top:0');
        } else {
            hdr.attr('style', `top:${hdr.height() * -1}`);
        }
        prevScrollpos = currentScrollPos;
    });
}

function scrollToHash() {
    $('.btn-scroll-top').click(function (e) {
        const hash = $(e.target).attr('href');
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 500);
    });
}

function headerFreeze() {
    const hdr = $('#hdr');
    hdr.data("freeze", true);
    setTimeout(() => {
        hdr.data("freeze", false);
    }, 1000);
}