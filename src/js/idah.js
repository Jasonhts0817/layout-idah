$(document).ready(function () {
    // initOwlSlider();
    initMasterSlider();
    menuClick();
    headerScroll();
    scrollToHash();
    initAccordion();
    //iframeVideo();
});

function initOwlSlider() {

    var $bannerList = $('.banner-list');
    $bannerList.owlCarousel({
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
    owlSliderEnableLazyload($bannerList);
}
function initMasterSlider() {
    var slider = new MasterSlider();

    slider.control('arrows');
    slider.control('bullets', { autohide: false, align: 'bottom', margin: 10 });
    slider.control('scrollbar', { dir: 'h', color: '#333' });

    slider.setup('masterslider', {
        width: 750,
        height: 430,
        space: 5,
        view: 'parallaxMask'
    });
}

function owlSliderEnableLazyload($owlSlider) {
    if ($owlSlider.length > 0) {
        var $owlImages = $owlSlider.find('img');
        $owlImages.on('inview', function (event, isInView) {
            if (isInView) {
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
    const menuClose = $("#btnMenuClose");
    const menuList = $("#menuList");
    const menuToggle = function () {
        menuList.toggleClass("active");
        menuBtn.toggleClass("active");
        mask.toggleClass("active");
        body.toggleClass("freezed");
    };
    const hideHeader = function () {
        hdr.attr('style', 'top:' + (hdr.height() * -1));
    }
    menuBtn.click(function () {
        menuToggle();
    });
    menuClose.click(function () {
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
        var selLang = hdr.find("[aria-expanded='true']");
        if (selLang.length > 0) {
            selLang.parent().removeClass('open');
            selLang.attr('aria-expanded', 'false');
        }
        if (hdr.data("freeze") == true ||
            win.scrollTop() <= hdr.height()) {
            return;
        }
        var currentScrollPos = win.scrollTop();
        if (prevScrollpos > currentScrollPos) {
            hdr.attr('style', 'top:0');
        } else {
            hdr.attr('style', 'top:' + (hdr.height() * -1));
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
    setTimeout(function () {
        hdr.data("freeze", false);
    }, 1000);
}

function initAccordion() {
    var $collapseArr = $('.jCollapse');
    $collapseArr.each(function (i, e) {
        var $collapse = $(this);
        var $topics = $collapse.find('.jCollapseTopic');
        var $contents = $collapse.find('.jCollapseContent');
        $contents.hide();
        $topics.click(function () {
            if ($collapse.data('reject-device') && $collapse.data('reject-device').includes(getDeviceSize())) { return; }
            var $content = $(this).siblings('.jCollapseContent');
            var isActive = !$content.attr('style').includes('display: none');
            $contents.slideUp();
            $topics.attr("data-expanded", false)
            if (isActive) { return; }
            $(this).attr("data-expanded", true)
            $content.slideDown();
        });
    });
}

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

function getDeviceSize() {
    var desktopMinWidth = 1366;
    var tabletMinWidth = 767;
    if (window.matchMedia('screen and (min-width: ' + desktopMinWidth + 'px)').matches) {
        return 'p';
    } else if (window.matchMedia('screen and (max-width: ' + (desktopMinWidth - 1) + 'px) and (min-width: ' + (tabletMinWidth + 1) + 'px)').matches) {
        return 't';
    } else if (window.matchMedia('screen and (max-width: ' + tabletMinWidth + 'px)').matches) {
        return 'm';
    }
}