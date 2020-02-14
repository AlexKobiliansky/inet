$(document).ready(function(){

    //*** mobile-mnu customization *****//
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-wrapper"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        setTimeout(function(){
            $('.mmenu-btn').addClass('is-active')
        }, 300);

    });

    $('#close-mnu').click(function(e){
        e.preventDefault();
        API.close();
    });

    API.bind( "close:start", function() {
        setTimeout(function() {
            $('.mmenu-btn').removeClass( "is-active" );
        }, 300);
    });
    //***** end mobile-mnu customization *****//






    $('img.svg').each(function() {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.tar-slider').owlCarousel({
        nav: false,
        items: 1,
        margin: 30,
        dots: false,
        autoHeight: true,
        autoWidth: true
    });

    $('.news-slider').owlCarousel({
        nav: false,
        items: 1,
        margin: 30,
        dots: false,
        autoHeight: true,
        autoWidth: true,
        loop: true
    });

    $( "#tar-tabs" ).tabs();

    function heightses() {


        $('.tar-item-title').height('auto').equalHeights();
        $('.tar-item-speedline').height('auto').equalHeights();

    }

    if ($(window).width()<480) {
        $('.foot-mnu-wrap').each(function(){
            var th = $(this);
            var h3 = th.find('h3');
            var ul = th.find('ul');

            h3.click(function(){
                th.toggleClass('rolled');
                ul.slideToggle();
            });
        });
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('.preloader').fadeOut();


    /** FORMS START */

    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    $('.form-select, input[type="radio"]').styler();

    $('.radio-wrap label').on('click', function(){
       var th = $(this);

       th.addClass('checked');
       th.siblings('label').removeClass('checked');
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    $('.next-stage').on('click', function(e){
        e.preventDefault();
        $('#mobile-name-input').validate(function(valid, elem) {
            if (valid === true) {
                $('#mobile-phone-input').validate(function(valid, elem) {
                    if (valid === true) {
                        $('.mobile-block-1').hide();
                        $('.mobile-block-2').show();
                    }
                });
            }
        });
    });

    //E-mail Ajax Send
    $(".contact-form").submit(function() { //Change
        var th = $(this);
        th.find(".btn-submit").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text("Отправить");
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });
    /** FORMS END */

    $('.telegram-link').each(function(){
        $(this).click(function(){
            $(this).toggleClass('opened');
        })
    });

    $('.city-popup a').on('click', function(e){
        var th = $(this);
        var val = th.text();
        var valContainer = $('.telegram-link>a');

        valContainer.text(val);

    });

    $('.gal-wrap').photoswipe();




    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {},
                    {
                        preset: 'islands#redDotIconWithCaption'
                    });

            map.geoObjects.add(myPlacemark);
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }
});
