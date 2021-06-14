$(document).ready(function() {
    bannerSlider();
});

//JS請以小寫字母開頭=>竟然拆開以function來寫
//http://www.masterslider.com/doc/#slide-layers 輪播外掛元件 
//=>　未來我們後台會做一個這個的管理系統，所以一律統一使用這個
function bannerSlider() {
    if ($('#bannerSlider').length > 0) {
        //這個主程式已包在jq core裡面
        var slider = new MasterSlider();
        // adds Arrows navigation control to the slider.

        slider.control('timebar', {
            insertTo: '#bannerSlider'
        });
        slider.control('bullets');

        //依案子不一樣要調整width/height
        slider.setup('bannerSlider', {
            width: 800, // slider standard width
            height: 350, // slider standard height
            space: 0,
            layout: 'fullwidth',
            loop: true,
            preload: 0,
            instantStartLayers: true,
            autoplay: true
        });
    }
}