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
        if ($(window).width()<480) {

        }

        $('.tar-item-title').height('auto').equalHeights();
        $('.tar-item-speedline').height('auto').equalHeights();

    }




    $(window).resize(function() {
        heightses();
    });

    heightses();


    /** FORMS START */

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

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
    /** FORMS END */
});
