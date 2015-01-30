/* global $:false */


$(function() {

    "use strict";


    /* Debug Switch
     *===================================================*/
    var _debugMode = false;


    /* Check User Agent (especially for IE bugs)
     *===================================================*/
    var userAgent = window.navigator.userAgent.toLowerCase();
    if( userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) ) {
        var isIE = true;
        var ieVersion = userAgent.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
        ieVersion = parseInt(ieVersion);

        $('html').addClass('ie');
    } else {
        var isIE = false;
    }



    /* Header - Current Menu Styling
     *===================================================*/
    (function(){
        var dirArray = location.pathname.split('/');
        var $currentLi = $('#menu-' + dirArray[1]);
        var $headerMenu = $('#headerMenu');

        var offset,
            offsetMenu,
            initPos,
            $currentArrow = $('#currentArrow'),
            $links = $headerMenu.find('li');



        $(window).bind("load", function() {
            //setTimeout(function(){ init(); }, 0);
            init();
        });



        /*
         *  Member Function
         */
        function init(){

            // set current arrow in the header menu
            offset = $currentLi.offset();
            offsetMenu = $headerMenu.offset();
            if($currentLi.size()){
                $currentLi.addClass('current');
            }
            initPos = offset.left - offsetMenu.left + $currentLi.width()/2 - 14;
            setArrowPosition(initPos);
            $currentArrow.addClass('shown');


            // make image's context menu disabled in gallery page
            if(dirArray[1] == 'gallery'){
                disableContextmenu();
            }
        }

        function setArrowPosition(pos){
            $currentArrow.stop().css({ 'left' : pos + 'px' });
        }

        function disableContextmenu(){
            $('img').bind('contextmenu', function(e) {
                return false;
            });
        }




        /*
         *  Event Handler
         */
        $links.hover(function(){ // hover
            var el = $(this);
            var o = el.offset();
            var p = o.left - offsetMenu.left + el.width()/2 - 14;
            setArrowPosition(p);
        }, function(){ // hover out
            setArrowPosition(initPos);
        });

        $(window).resize(function(){
            init();
        });



        
    }());


});
