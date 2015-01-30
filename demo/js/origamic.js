/*
 * origamic.js v0.0.1
 * Copyright 2015 COBITOWORKS
 * Contributing Author: Yoshiaki SATO
 */


var Origamic = function(param){

    "use strict";


    if (!(this instanceof Origamic)) {
        return new Origamic(param);
    }


    var glob = this;

    glob.el = {
        paperLeft : {},
        paperRight : {},
        paperRows : {},
        paperCells : {},
        lengthPaperLeft : 0
    };

    glob.control = {
        tab:{},
        bar:{}
    };

    glob.vars = {
        wControlTab : 0,
        wBar : 0,
        xOffset : 0
    };

    glob.param = param;

    glob.defaultOption = {
        colorLeft: {r:240, g:240, b:240},
        colorRight: {r:220, g:220, b:220},
        colorDiff: 5,
        shadowDiff: 0.3,
        wholeShadow: true
    };


    /** @constructor */
    (function (){


        //
        // init
        //

        var angle = (glob.param.initialAngle >= 0)? glob.param.initialAngle : 60,
            unitHeight = glob.param.unitHeight || 10,
            blocks = glob.param.blocks || [];

        var container = document.querySelector( glob.param.selector );
        if(!container){ return; }

        if(glob.param.perspective){
            container.style.perspective = param.perspective + 'px';
        }

        _setupControl();
        container.innerHTML = _createBlocksHtml( blocks, param );
        _setupElements();

        for ( var i = 0; i < glob.el.paperRows.length; i++ ) {
            glob.el.paperRows.item( i ).style.height = unitHeight + 'px';
        }

        _setTabPosition( angle );
        _setAngle( angle, glob.param );


        //
        // end init
        //





        function _setupControl () {
            glob.control.tab = document.querySelector( glob.param.controlTab );
            glob.control.bar = document.querySelector( glob.param.controlBar );

            glob.vars.wControlTab = glob.control.tab.offsetWidth;
            glob.vars.wBar = glob.control.bar.offsetWidth;
            glob.vars.xOffset = glob.control.bar.offsetLeft;

            if(glob.control.tab){
                glob.control.tab.draggable = true;
                _setDragEvent();
            }
        }





        function _setupElements () {
            glob.el.paperRows = document.querySelectorAll( glob.param.selector + " .origamic_row" );
            glob.el.paperCells = document.querySelectorAll( glob.param.selector + " .origamic_cell" );
            glob.el.paperLeft = document.querySelectorAll( glob.param.selector + " .cell_left" );
            glob.el.paperRight = document.querySelectorAll( glob.param.selector + " .cell_right" );
            glob.el.lengthPaperLeft = glob.el.paperLeft.length;
        }





        function _createBlocksHtml(blocks, param){

            var html = '',
                style,
                colorTop,
                colorBottom,
                colorDiff = param.colorDiff || glob.defaultOption.colorDiff,
                shadowDiff = param.shadowDiff || glob.defaultOption.shadowDiff;

            if(!param.colorRight || !param.colorLeft){
                param.colorRight = glob.defaultOption.colorRight;
                param.colorLeft = glob.defaultOption.colorLeft;
            }


            for (var row in blocks) if (blocks.hasOwnProperty(row)) {
                html += '<div class="origamic_row">\n';


                for (var cell in blocks[row]) if (blocks[row].hasOwnProperty(cell)) {

                    var cellDirection = (cell % 2) ? 'cell_right' : 'cell_left';



                    if (param.bgImage) {

                        var shadowDiffInitial = (cell % 2)? 0.15 : 0;
                        var shadowStyle = 'linear-gradient( to ' + ((cell % 2)? 'left':'right') + ','
                                        + ' rgba(0, 0, 0, ' + shadowDiffInitial + '),'
                                        + ' rgba(0, 0, 0, ' + (shadowDiffInitial + (shadowDiff * blocks[row][cell] / param.centerLine)) + ') ), ';

                        style = 'background-image:' + shadowStyle
                              + ' url('+ param.bgImage +');'
                              + 'background-position: 0 -' + (param.unitHeight * row + 1 ) + 'px;';
                        
                    } else {

                        if ( cell % 2 ) {
                            colorTop = 'rgba(' + Math.floor(param.colorRight.r) + ',' + Math.floor(param.colorRight.g) + ',' + Math.floor(param.colorRight.b) + ',1)';
                            colorBottom = 'rgba(' + Math.floor(param.colorRight.r - colorDiff) + ',' + Math.floor(param.colorRight.g - colorDiff) + ',' + Math.floor(param.colorRight.b - colorDiff) + ',1)';
                        } else {
                            colorTop = 'rgba(' + Math.floor(param.colorLeft.r) + ',' + Math.floor(param.colorLeft.g) + ',' + Math.floor(param.colorLeft.b) + ',1)';
                            colorBottom = 'rgba(' + Math.floor(param.colorLeft.r - colorDiff) + ',' + Math.floor(param.colorLeft.g - colorDiff) + ',' + Math.floor(param.colorLeft.b - colorDiff) + ',1)';
                        }

                        style = 'background-image: linear-gradient(' + colorTop + ', ' + colorBottom + '); ';
                    }

                    html += '<div class="origamic_cell ' + cellDirection + '" style="' + style +'"></div>\n';
                }
                html += '</div>\n';


                // darken cells step by step
                param.colorLeft.r -= colorDiff;
                param.colorLeft.g -= colorDiff;
                param.colorLeft.b -= colorDiff;
                param.colorRight.r -= colorDiff;
                param.colorRight.g -= colorDiff;
                param.colorRight.b -= colorDiff;
            }

            // set whole shadow
            if ( param.wholeShadow === true) {
                var shadowHeight = unitHeight * ( row*1 ) - 15;
                var wholeShadowStyle = 'height:' + shadowHeight + 'px!important;';
                
                console.log(row);
                console.log(unitHeight);
                console.log(wholeShadowStyle);
                html += '<div class="origamic_row whole_shadow" style="' + wholeShadowStyle + '">';
                html += '<div class="origamic_cell cell_left cell_shadow"></div>';
                html += '<div class="origamic_cell cell_right cell_shadow"></div>\n';
                html += '</div>\n';
            }

            return html;
        }



        function _setAngle(angle, param){

            _setRotateStyle(angle);

            var unitWidth = param.unitWidth || 10,
                centerLine = param.centerLine || 5,
                blocks = param.blocks || [],
                xCenterLine = centerLine * unitWidth,
                zIndex = 9999;

            for (var row in blocks) if (blocks.hasOwnProperty(row)) {

                zIndex --;

                var leftArr = [];
                var rightArr = [];

                for (var cell in blocks[row]) if (blocks[row].hasOwnProperty(cell)) {
                    if(cell % 2){
                        rightArr.push(blocks[row][cell] * unitWidth);
                    } else {
                        leftArr.push(blocks[row][cell] * unitWidth);
                    }
                }
                cell = 0;

                var theRow = glob.el.paperRows.item(row);
                var cells = theRow.childNodes;
                var cellCnt = 0;
                for(var m = 0; m < cells.length; m++){


                    if (cells[m].nodeName === 'DIV'){

                        var cellWidth = blocks[row][cellCnt] * unitWidth;
                        var cellDirection = (cellCnt % 2) ? 'cell_right' : 'cell_left';

                        var originX = 0,
                            leftTotal = 0,
                            passedTotal = 0,
                            restTotal = 0;

                        if ( cellDirection == 'cell_left' ){

                            for( i = 0; i < cellCnt/2; i++){
                                passedTotal += rightArr[i];
                            }
                            for( var k = cellCnt/2 + 1; k < rightArr.length; k++){
                                restTotal += leftArr[k];
                            }
                            originX = (passedTotal + restTotal + cellWidth) / cellWidth * 100;
                            leftTotal = xCenterLine + 2 * passedTotal * Math.cos(angle * Math.PI / 180) - (cellWidth + passedTotal + restTotal);

                        } else if ( cellDirection == 'cell_right' ) {

                            for( i = 0; i < (cellCnt + 1)/2 - 1; i++){
                                passedTotal += rightArr[i];
                            }
                            for( k = (cellCnt + 1)/2; k < leftArr.length; k++){
                                restTotal += leftArr[k];
                            }
                            originX = - (passedTotal + restTotal) / cellWidth * 100;
                            leftTotal = xCenterLine - 2 * restTotal * Math.cos(angle * Math.PI / 180) + (passedTotal + restTotal);

                        }

                        cells[m].style.width = cellWidth + 'px';
                        cells[m].style.left = leftTotal + 'px';
                        cells[m].style.transformOrigin = originX + '% 0 0';
                        cells[m].style.zIndex = zIndex;
                        
                        cellCnt ++;
                    }

                }

            }
            
            if (param.wholeShadow == true) {
                
                var shadowRow = glob.el.paperRows.item(row * 1 + 1);
                var shadowCells = shadowRow.childNodes;
                cellCnt = 0;

                var shadowLength,
                    shadowAlpha,
                    shadowY;
                for(var m = 0; m < shadowCells.length; m++){
                    if (shadowCells[m].nodeName === 'DIV') {

                        shadowY = (50 * angle/90);
                        shadowLength = (angle * 50/90) + 5;
                        shadowAlpha = - (angle * 0.45/90) + 0.5;


                        if (cellCnt % 2) { // right side shadow

                            shadowCells[m].style.boxShadow = '0 0 ' + shadowLength + 'px ' + shadowLength +'px rgba(0, 0, 0, ' + shadowAlpha + ')';
                            shadowCells[m].style.background = 'rgba(0, 0, 0, ' + (shadowAlpha) +')';
                            shadowCells[m].style.width = xCenterLine - (angle/90) + 'px';
                            shadowCells[m].style.left = xCenterLine + (shadowLength * Math.cos(angle * Math.PI / 180)) -1 + 'px';
                            shadowCells[m].style.top = shadowY + 'px';

                        } else { // left side shadow

                            shadowCells[m].style.boxShadow = '0 0 ' + shadowLength + 'px ' + shadowLength +'px rgba(0, 0, 0, ' + shadowAlpha + ')';
                            shadowCells[m].style.background = 'rgba(0, 0, 0, ' + shadowAlpha + ' )';
                            shadowCells[m].style.width = xCenterLine - (angle/90) + 'px';
                            shadowCells[m].style.right = xCenterLine + (shadowLength * Math.cos(angle * Math.PI / 180)) -1 + 'px';
                            shadowCells[m].style.top = shadowY + 'px';

                        }

                        cellCnt ++;
                    }
                }
            }

        }




        function _setRotateStyle (angle) {

            var angleStyleStrLeft = 'rotateY(' + angle  + 'deg)' ;
            var angleStyleStrRight= 'rotateY( -' + angle  + 'deg)' ;

            for (var i = 0; i < glob.el.lengthPaperLeft; i++ ){
                _setRotate(glob.el.paperLeft.item(i), angleStyleStrLeft);
                _setRotate(glob.el.paperRight.item(i), angleStyleStrRight);
                
                
                // for whole shadow
                //if(glob.param.wholeShadow == true && i == glob.el.lengthPaperLeft - 1){
                //    angleStyleStrLeft = 'rotateY(' + (angle / 2)  + 'deg)' ;
                //    angleStyleStrRight= 'rotateY( -' + (angle / 2)  + 'deg)' ;
                //    _setRotate(glob.el.paperLeft.item(i), angleStyleStrLeft);
                //    _setRotate(glob.el.paperRight.item(i), angleStyleStrRight);
                //}
            }
        }




        function _setRotate (dom, s){
            dom.style.webkitTransform = s;
            dom.style.mozTransform = s;
            dom.style.msTransform = s;
            dom.style.oTransform = s;
            dom.style.transform = s;
        }





        function _setTabPosition (angle) {
            var left = angle / 90 * (glob.vars.wBar - 20);
            if(angle < 0){
                left = 0;
            } else if (angle > 90){
                left = glob.vars.xOffset + glob.vars.wBar - 20;
            }

            glob.control.tab.style.left = left + 'px';
        }




        function _offsetXToAngle (x) {
            var offset = glob.vars.xOffset;
            var wBar = glob.vars.wBar;
            var wControlTab = glob.vars.wControlTab;

            if(x < offset){
                x = offset;
            } else if (x > offset + wBar - wControlTab){
                x = offset + wBar - wControlTab;
            }

            return ( x - offset )/ wBar * 90;
        }
        




        function _setDragEvent(){
            function dragStartFunc(e){
                var a = _offsetXToAngle(e.clientX);
                _setAngle(a, glob.param);
                _setTabPosition(a);
            }

            function dragFunc(e){
                var a = _offsetXToAngle(e.clientX);
                _setAngle(a, glob.param);
                _setTabPosition(a);
            }

            function dragEndFunc(e){
                var a = _offsetXToAngle(e.clientX);
                _setAngle(a, glob.param);
                _setTabPosition(a);
            }

            var tab = glob.control.tab;
            if(tab.addEventListener){
                tab.addEventListener("dragstart" , dragStartFunc);
                tab.addEventListener("drag" , dragFunc);
                tab.addEventListener("dragend" , dragEndFunc);
            }else{
                tab.attachEvent("ondragstart" , dragStartFunc);
                tab.attachEvent("ondrag" , dragFunc);
                tab.attachEvent("ondragend" , dragEndFunc);
            }

        }


    }());


};




// open APIs

//Origamic.prototype.myFunc = function () {
//
//};


