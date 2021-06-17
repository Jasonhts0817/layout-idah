// var $openBtnOfMb;
// var $closeBtnOfMb;
$(document).ready(function () {
    common();

    bannerSlider();
    productDetailSlider();
    new WOW().init();

    // $openBtnOfMb = $('.mobile-toggle-open span');
    // var $logoImg = $('#menu-scroll').find('.logolink img');
    // $openBtnOfMb.click(function () {
    //     // alert('click mobile open');
    //     //觸發log lz=>會影發banner破版
    //     // console.log('觸發logo lz');
    //     // setTimeout(function() {
    //     //     $(window).resize();
    //     // }, 500);
    //     // console.log($logoImg);
    //     $logoImg.attr('src', $logoImg.attr('data-lazy'));
    //     $logoImg.removeAttr('data-lazy');
    // });

    blogSharing();
    setTopMenuTitleFromBlogView();

    //注意時間差，ig/slider載入完成後導致頁面的高度變動
    //所以跳cut會不準

    jumpMenu();
    loadGoogleFont();
    // animateNumber();
    owlFans();
    // owlAdBanner();
    owlBlog();
    // instaFeed();
    bgImagesLazyload();

    var $jumpToDesign = $('#jumpToDesign');
    if($jumpToDesign.length > 0){
        var $jumpToDesignTarget = $('#jumpToDesignTarget');
        // jumpSection('jumpToDesignType');
        $jumpToDesign.click(function(){
            $('html,body').animate({
                scrollTop: $jumpToDesignTarget .offset().top - 150
            }, 500);
        });
    
    }
    
});

function bannerSlider() {
    var bSlider = null;

    var $bannerSlider = $('#bannerSlider');
    if ($bannerSlider.length > 0) {

        if ($bannerSlider.find('.ms-view').length == 0) {
            setMasterSliderImageOnScreen($bannerSlider);

            try {
                bSlider = new MasterSlider();

                bSlider.control('timebar', {
                    insertTo: '#bannerSlider'
                });
                bSlider.control('bullets');

                bSlider.control('circletimer', {
                    autohide: false,
                    overVideo: true,
                    color: '#FFFFFF',
                    radius: 4,
                    stroke: 9
                });

                bSlider.control('arrows', {
                    autohide: true
                });
                bSlider.setup('bannerSlider', {
                    width: 1920,
                    height: 570,
                    minHeight: 400,
                    start: 1,
                    space: 0,
                    layout: 'fullwidth',
                    loop: true,
                    preload: 0,
                    instantStartLayers: false,
                    autoplay: true,
                    overPause: true,
                    view: "fadeBasic"
                });


            } catch (err) {
                console.error(err);

                removeErrorMasterSliderContainer($bannerSlider);
            }
        }


    }

}

function productDetailSlider() {
    var $productSlider = $('#productSlider');
    if ($productSlider.length > 0) {


        if ($productSlider.find('.ms-view').length == 0) {
            try {
                var slider = new MasterSlider();

                slider.control(
                    'thumblist', {
                        autohide: false,
                        overVideo: true,
                        dir: 'h',
                        speed: 17,
                        inset: false,
                        arrows: false,
                        hover: false,
                        customClass: '',
                        align: 'bottom',
                        type: 'thumbs',
                        margin: 5,
                        width: 100,
                        height: 100,
                        space: 5
                    });
                slider.setup('productSlider', {
                    width: 500,
                    height: 500,
                    space: 5,
                    view: 'fadeBasic'
                });

            } catch (err) {
                console.error(err);
                removeErrorMasterSliderContainer($productSlider);
            }
        }



    }
}

function jumpMenu() {

    //選單跳段落
    $('.nav a').click(function () {

        console.log('click menu link');

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            jumpSection(this.hash);
        }
        // return false;
    });

    //處理編輯器要跳段落
    $('.editor a').click(function () {
        var $anchor = $(this);
        console.log('click editor internal link');
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            if ($anchor.attr('href').indexOf('http') < 0) {
                //不是完整連結才要跳
                jumpSection(this.hash);
                // return false;
            }

        }
    });

    //關閉手機選單
    $('body').click(function (event) {
        // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called 
        if ($('.navbar-collapse').is(':visible') && $('.navbar-toggle').is(':visible')) {
            $('.navbar-collapse').collapse('toggle');
        }
    });

    /*才能避免slider產生後的高度讓跳cut不正確*/
    var jumpHash = location.hash;
    //超連結跳段落
    if (jumpHash !== '') {
        var newjumpHash = jumpHash.replace(/\//, '');
        console.log('detect jump from link url:' + newjumpHash);
        Pace.on('done', function () {
            jumpSection(newjumpHash);
        });
    }


}

// function jumpSection(hashId) {
//     console.log('jumpSection:' + hashId);
//     var target = $(hashId);

//     console.log(hashId + ' target elem =>  top pos:' + target.offset().top);

//     // target = target.length ? target : $('[name=' + hashId.slice(1) + ']');
//     if (target.length > 0) {

//         console.log('scroller !! find link target:' + hashId);

//         $('html,body').animate({
//             scrollTop: target.offset().top - 150
//         }, 0);
//         //自動關閉選單
//         // $closeBtnOfMb.click();
//         return false;
//     } else {
//         console.warn('cannot find jumpSection #id:' + hashId);

//     }
// }


function blogSharing() {
    initJsSocial($('#blogSharing'));
}

// function productSharing() {
//     initJsSocial($('#productSharing'));
// }

function initJsSocial($targetElem) {
    Pace.on('done', function () {
        if ($targetElem.length > 0) {
            $targetElem.jsSocials({
                shares: ["twitter", "facebook"]
            });
        }
    })
}

function setTopMenuTitleFromBlogView() {

    var $logolink = $('.header_top').find('.logolink-scroll');
    if ($('.post-detail-row').length > 0) {

        $logolink.hide();
        $('#page-title').show().html($('.post-body h1').html());

    } else {
        $logolink.show();
    }
}

// function instaFeed() {
//     var feed = new Instafeed({
//         target: 'instafeed_wall',
//         limit: 9,
//         get: 'user',
//         userId: '5563064300',
//         //template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
//         template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" />' +
//             '<div class="instafeed-overlay">' +
//             '<div class="instafeed-info">' +
//             '<span><i class="fa fa-heart" aria-hidden="true"></i> {{likes}}</span>' +
//             '<span><i class="fa fa-commenting-o" aria-hidden="true"></i> {{comments}}</span>' +
//             '<div class="instafeed-caption">{{caption}} </div>' +
//             '</div></div>' +
//             '</a>',

//         sortBy: 'most-recent',
//         accessToken: '',
//         resolution: 'standard_resolution',
//         after: function () {

//             var $igImages =
//                 $('#instafeed_wall').find('img');

//             lazyloadImages($igImages);


//         }
//     });
//     feed.run();
// }

function loadGoogleFont() {
    Pace.on('done', function () {
        WebFont.load({
            timeout: 2000,
            google: {
                families: ['Noto Sans TC', 'Roboto']
            }
        });
    });
}

function animateNumber() {
    var $animate_number = $('.animate-number');

    if ($animate_number.length > 0) {
        $animate_number.each(function () {
            var $this = $(this);
            $this.data('isAnimate', false);

            if (!$this.hasClass('animate-stop')) {
                // if ($this.isInViewport()) {
                //     $this.animateNumber({
                //         number: $this.attr("data-value")
                //     }, 750);
                //     $this.addClass('animate-stop');
                // }

                $this.on('inview', function (event, isInView) {
                    if (isInView) {
                        if ($this.data('isAnimate') == false) {
                            $this.animateNumber({
                                number: $this.attr("data-value")
                            }, 750);
                            $this.addClass('animate-stop');
                            $this.data('isAnimate', true);
                        }

                    }
                });
            }
        });
    }
}

function owlFans() {
    Pace.on('done', function () {
        owlSlider(
            $('.fans-row'),
            1,
            1, {

            });
    });
}

function owlAdBanner() {
    Pace.on('done', function () {
        owlSlider(
            $('.ad-banner-row'),
            1,
            1, {

            });
    });
}

function owlBlog() {

    Pace.on('done', function () {

        owlSlider(
            $('.newest-blog-area'),
            4,
            1, {
                0: {
                    items: 1
                },
                1024: {
                    items: 4,
                    nav: true
                },
                1200: {
                    items: 4,
                    nav: true
                }
            }
        );

        // var $newestSlider = $('.newest-blog-area');
        // if ($newestSlider.length > 0) {
        //     $newestSlider.owlCarousel({
        //         autoplay: 1000,
        //         loop: true,
        //         // center: true,
        //         animateOut: 'fadeOut',
        //         animateIn: 'fadeIn',
        //         margin: 10,
        //         // autoWidth: true,
        //         // stagePadding: 50,

        //         items: 120,

        //         dots: true,
        //         nav: true,
        //         // lazyLoad: true,
        //         // navText: [
        //         //     '<img src="' + OWL.prev + '" />',
        //         //     '<img src="' + OWL.next + '" />'
        //         // ],
        //         responsive: {
        //             0: {
        //                 items: 1
        //             },
        //             1024: {
        //                 items: 4,
        //                 nav: true
        //             },
        //             1200: {
        //                 items: 4,
        //                 nav: true
        //             }
        //         }
        //     });

        //     $newestSlider.on('initialized.owl.carousel', function(event) {
        //         console.log('owl init');
        //     });
        //     $newestSlider.on('changed.owl.carousel', function(event) {
        //         console.log('owl changed');
        //         var element = event.target;
        //         // console.log(element);
        //         $imgsNotLoad = $(element).find('img[class*=lazyload]');
        //         if ($imgsNotLoad.length > 0) {
        //             for (var i = 0; i < $imgsNotLoad.length; i++) {
        //                 var $img = $($imgsNotLoad[i]);

        //                 if ($img.isInViewport()) {
        //                     $img.attr('src', $img.attr('data-lazy'));
        //                     $img.removeAttr('data-lazy');
        //                 }

        //             }
        //         } else {
        //             console.log('cannot find data-lazy');
        //         }

        //     });
        // }


    });
}

function owlSlider($owlSlider, items, slideBy, responsive) {
    console.log('owlSlider');
    if ($owlSlider.length > 0) {

        var opts = {
            loop: true,
            items: items,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            margin: 10,
            autoplay: true,
            nav: true,
            dots: true,
            slideBy: slideBy
        }

        if (typeof (responsive) != 'undefined') {
            opts.responsive = responsive;
        }


        $owlSlider.owlCarousel(opts);
        var $owlImages = $owlSlider.find('img');
        $owlImages.on('inview', function (event, isInView) {
            if (isInView) {
                console.log('owl img inview');
                var $img = $(this);
                // console.log($img);
                $img.attr('src', $img.attr('data-lazy'));
                $img.removeAttr('data-lazy');
            }
        });
    }

}


function instaFeed() {

    // var feed;
    var $igWallIndex = $('#instafeed');
    var isEnableIG = false;
    if ($igWallIndex.length > 0) {
        $igWallIndex.on('inview', function (event, isInView) {
            if (isInView && isEnableIG == false) {

                $.instagramFeed({
                    'username': 'katt_nail_taiwan',
                    'container': "#instafeed",
                    'display_profile': false,
                    'display_biography': false,
                    'display_gallery': true,
                    'callback': null,
                    'styling': true,
                    // 'styling': false,
                    'items': 9,
                    'items_per_row': 3,
                    'margin': 1,
                    'lazy_load': true,
                    'on_error': function () {
                        console.error('目前的網路無法取得ig圖片');
                        $('#instafeed-err').show();
                    }
                });
                isEnableIG = true;

                // if (feed == null) {
                //     feed = new Instafeed({
                //         target: 'instafeed',
                //         limit: 12,
                //         get: 'user',
                //         userId: '17179740718',
                //         template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
                //         sortBy: 'most-recent',
                //         accessToken: '17179740718.1677ed0.1c32dba4588649f79e802c3a6ccdc4e5',
                //         resolution: 'low_resolution',
                //         after: function () {

                //             var $igImages =
                //                 $('#instafeed').find('img');

                //             lazyloadImages($igImages);


                //         }
                //     });
                //     feed.run();
                // }
            }
        });

    }

}


function bgImagesLazyload() {
    initLazyload($('.bg-cover'));

}