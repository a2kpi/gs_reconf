/*
 * --- INIT ---
 */
 var ultimediaVisiblePlayer = function() {
    var close_video = false;
    var videos_Ultimedia_Array = new Array();
    var videos_Ultimedia_Array_Valid = new Array();
    var videos_visible_length = false;
    var videoPlay = new Array();
    var video_is_iframe = new Array();
    var old_play = new Array();
    var alreadyVisiblePlayer = new Array();
    var videosTimeOut = new Array();
    var transitionInProgress = new Array();
    var the_timer = 0;
    var the_timer_play = 0;
    var duration_transition = 300;
    var uvp = this;
    var ot_check = 7;
    var css = false;
    var position_css = false;
    var top_css = false;
    var bottom_css = false;
    var left_css = false;
    var right_css = false;
    var width_css = false;
    var style = false;
    var head = false;
    var class_name = new Array();
    /*
    * On récupère toutes les videos unitaire (iFrame)
    * En les ajoutant à videos_Ultimedia_Array
    */  
    
    window.addEventListener('scroll', function (e) {
        if (!close_video && css != false) {
            clearTimeout(the_timer);
            the_timer = setTimeout(function(){
                scrollVisiblePlayer();
            }, 15);

            clearTimeout(the_timer_play);
            the_timer_play = setTimeout(function(){
                uvp.check_play();
            }, 200);
        }
    }, false);

    this.addCss = function (position, top_bottom, right_left, width) {
        if (!css && typeof position != 'undefined' && position != 0) {
            css = '.visible_player {position: fixed !important; z-index: 1000 !important; width: '+width+'px !important;';
            switch(position) {
                case 1: //bas droite
                    css = css + 'top : auto !important; left: auto !important; bottom:'+top_bottom+'px !important; right:'+right_left+'px !important;';
                    top_css = 'auto';
                    bottom_css = top_bottom;
                    left_css = 'auto';
                    right_css = right_left;
                    break;
                case 2: //haut droite
                    css = css + 'bottom : auto !important; left: auto !important; top:'+top_bottom+'px !important; right:'+right_left+'px !important;';
                    top_css = top_bottom;
                    bottom_css = 'auto';
                    left_css = 'auto';
                    right_css = right_left;
                    break;
                case 3: //haut gauche
                    css = css + 'bottom : auto !important; right: auto !important; top:'+top_bottom+'px !important; left:'+right_left+'px !important;';
                    top_css = top_bottom;
                    bottom_css = 'auto';
                    left_css = right_left;
                    right_css = 'auto';
                    break;
                case 4: //bas gauche
                    css = css + 'top : auto !important; right: auto !important; bottom:'+top_bottom+'px !important; left:'+right_left+'px !important;';
                    top_css = 'auto';
                    bottom_css = top_bottom;
                    left_css = top_bottom;
                    right_css = 'auto';
                    break;
            }

            css = css + '}';
            position_css = position;
            width_css = width;
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
            style.type = 'text/css';
            
            if (style.styleSheet){
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
        head.appendChild(style);
        }
    }
    
    this.findVideos = function(position, top_bottom, right_left, width) {
        this.addCss(position, top_bottom, right_left, width);
        var nodes = document.querySelectorAll('iframe');
        for (var m = 0; m < nodes.length; m++) {
            if (nodes[m].hasAttribute("src")) {
                if (nodes[m].getAttribute("src").match(/(ultimedia|digiteka)\.(com|net)/) && videos_Ultimedia_Array.indexOf(nodes[m]) == -1) {
                    
                    videos_visible_length = videos_Ultimedia_Array.length;
                    videos_Ultimedia_Array.push(nodes[m]);
                    console.debug(nodes[m]);
                    console.debug(nodes[m].className);
                    videoPlay[videos_visible_length] = 'pause';
                    video_is_iframe[videos_visible_length] = true;
                    class_name[videos_visible_length] = nodes[m].className;

                    alreadyVisiblePlayer[videos_visible_length] = false;
                    
                    nodes[m].contentWindow.postMessage('your_id=' + videos_visible_length ,'*');

                    var video_parent = nodes[m].parentNode;

                    var wrapper = document.createElement('div');
                    wrapper.id = videos_visible_length + '_visible_player_brother';
                    video_parent.insertBefore(wrapper, nodes[m]);

                    var css = '#' + video_parent.parentNode.id + ' .' + video_parent.className + ' iframe#' + nodes[m].id + css,
                    head = document.head || document.getElementsByTagName('head')[0],
                    style = document.createElement('style');
                    style.type = 'text/css';
                
                    if (style.styleSheet){
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }
                    head.appendChild(style); 
                }
            }
        }
    }
 
    function scrollVisiblePlayer() {
        for (var i = 0; i < videos_Ultimedia_Array.length; i++) {
 
            var isquirks= document.compatMode!=='BackCompat';
            var page= isquirks? document.documentElement : document.body;
            var x= (document.body.scrollLeft != 0) ? document.body.scrollLeft : document.documentElement.scrollLeft;
            var y= (document.body.scrollTop != 0) ? document.body.scrollTop : document.documentElement.scrollTop;
            var win_w= 'innerWidth' in window? window.innerWidth : page.clientWidth;
            var win_h= 'innerHeight' in window? window.innerHeight : page.clientHeight;
            var pageRect = [x, y, x+win_w, y+win_h, win_w, win_h];
 
            if (video_is_iframe[i]) {
                var x= 0, y= 0;
                var ele = document.getElementById(i + '_visible_player_brother');
                if (!alreadyVisiblePlayer[i] || !videos_Ultimedia_Array[i].classList.contains("visible_player")) {
                    var w= videos_Ultimedia_Array[i].offsetWidth, h= videos_Ultimedia_Array[i].offsetHeight;
                } else {
                    var w= ele.offsetWidth, h= ele.offsetHeight;
                }
                while (ele.offsetParent!==null) {
                    x+= ele.offsetLeft;
                    y+= ele.offsetTop;
                    ele= ele.offsetParent;
                }
 
                var viewportOffset = videos_Ultimedia_Array[i].getBoundingClientRect();
                var off_top_bottom = (position_css == 1 || position_css == 4) ? win_h - viewportOffset.top - h : viewportOffset.top;
                var off_right_left = (position_css == 1 || position_css == 2) ? win_w - viewportOffset.left - w : viewportOffset.left;
 
                var playerRectFixed = [x, y, x+w, y+h, w, h];
 
                var isintersectfloat_bottom = (videos_Ultimedia_Array_Valid[i] == 1 || videos_Ultimedia_Array_Valid[i] == 2) && (pageRect[0] <= playerRectFixed[2]) && (pageRect[1] >= playerRectFixed[1] + 0.5*playerRectFixed[5]) && (pageRect[2] >= playerRectFixed[0]) && (pageRect[3] >= playerRectFixed[3]);
                var isintersectfloat_top = (videos_Ultimedia_Array_Valid[i] == 1 || videos_Ultimedia_Array_Valid[i] == 3) && (pageRect[0] <= playerRectFixed[2]) && (pageRect[3] <= playerRectFixed[1] + 0.5*playerRectFixed[5]) && (pageRect[2] >= playerRectFixed[0]) && (pageRect[1] <= playerRectFixed[1]);
                var isIntersect = (isintersectfloat_bottom || isintersectfloat_top) && videoPlay[i] == 'play';

                // ---> VISIBLE PLAYER POUR VIDEO UNITAIRE iFRAME
                if (isIntersect && !transitionInProgress[i] && (!alreadyVisiblePlayer[i] || !videos_Ultimedia_Array[i].classList.contains("visible_player"))) {
                    videos_Ultimedia_Array[i].style.position = 'fixed';
                    videos_Ultimedia_Array[i].style.height = h + 'px';
                    videos_Ultimedia_Array[i].style.width = w + 'px';
                    videos_Ultimedia_Array[i].style.opacity = '0.1';
                    videos_Ultimedia_Array[i].style.zIndex = '1001';                     
                    
                    if (position_css == 1) {
                        videos_Ultimedia_Array[i].style.bottom = off_top_bottom + 'px';
                        videos_Ultimedia_Array[i].style.right = off_right_left + 'px';
                    } else if (position_css == 2) {
                        videos_Ultimedia_Array[i].style.top = off_top_bottom + 'px';
                        videos_Ultimedia_Array[i].style.right = off_right_left + 'px';
                    }  else if (position_css == 3) {
                        videos_Ultimedia_Array[i].style.top = off_top_bottom + 'px';
                        videos_Ultimedia_Array[i].style.left = off_right_left + 'px';
                    }  else if (position_css == 4) {
                        videos_Ultimedia_Array[i].style.bottom = off_top_bottom + 'px';
                        videos_Ultimedia_Array[i].style.left = off_right_left + 'px';
                    } 

                    for (var j = 0; j < videos_Ultimedia_Array.length; j++) {
                        if (i != j) {
                            set_pause(j);
                        }
                    }
                    
                    videos_Ultimedia_Array[i].className = "";
                    toggleVisiblePlayer(i, true, h, w, off_top_bottom, off_right_left);
 
                // NOT VISIBLE PLAYER POUR VIDEO UNITAIRE iFRAME
                } else if (!isIntersect && (alreadyVisiblePlayer[i] || videos_Ultimedia_Array[i].classList.contains("visible_player"))) {
                    toggleVisiblePlayer(i, false, h, w, off_top_bottom, off_right_left);
                }
            } else { // WIDGET
                var x= 0, y= 0;
                var ele = document.getElementById(videos_Ultimedia_Array[i]._target + '_visible_player').parentNode;
                var w= ele.offsetWidth, h= ele.offsetHeight;
                while (ele.offsetParent!==null) {
                    x+= ele.offsetLeft;
                    y+= ele.offsetTop;
                    ele= ele.offsetParent;
                }
 
                var viewportOffset = document.getElementById(videos_Ultimedia_Array[i]._target).getBoundingClientRect();
                var off_top_bottom = (position_css == 1 || position_css == 4) ? win_h - viewportOffset.top - h : viewportOffset.top;
                var off_right_left = (position_css == 1 || position_css == 2) ? win_w - viewportOffset.left - w : viewportOffset.left;
 
                var playerRectFixed = [x, y, x+w, y+h, w, h];
                var isintersectfloat_bottom = (videos_Ultimedia_Array_Valid[i] == 1 || videos_Ultimedia_Array_Valid[i] == 2) && (pageRect[0] <= playerRectFixed[2]) && (pageRect[1] >= playerRectFixed[1] + 0.5*playerRectFixed[5]) && (pageRect[2] >= playerRectFixed[0]) && (pageRect[3] >= playerRectFixed[3]);
                var isintersectfloat_top = (videos_Ultimedia_Array_Valid[i] == 1 || videos_Ultimedia_Array_Valid[i] == 3) && (pageRect[0] <= playerRectFixed[2]) && (pageRect[3] <= playerRectFixed[1] + 0.5*playerRectFixed[5]) && (pageRect[2] >= playerRectFixed[0]) && (pageRect[1] <= playerRectFixed[1]);
                var isIntersect = isintersectfloat_top || isintersectfloat_bottom;
                var isPlaying = videos_Ultimedia_Array[i]._jw.getState() == 'PLAYING' || videos_Ultimedia_Array[i]._jw.getState() == 'playing' ||  videos_Ultimedia_Array[i]._jw.getState() == 'buffer' ||  videos_Ultimedia_Array[i]._jw.getState() == 'BUFFER' || videos_Ultimedia_Array[i]._state == 'preroll' || videos_Ultimedia_Array[i]._state == 'after_preroll' || videos_Ultimedia_Array[i]._state == 'before_preroll';
 
                if (old_play[i] == 'pauseAd') {
                    isPlaying = false;
                } else if (old_play[i] == 'pause' && isPlaying) {
                    for (var j = 0; j < videos_Ultimedia_Array.length; j++) {
                        if (i != j) {
                            set_pause(j);
                        }
                    }
                    old_play[i] = 'play';
                } else if (!isPlaying) {
                    old_play[i] = 'pause';
                }

                var video_widget = document.getElementById(videos_Ultimedia_Array[i]._target + '_visible_player');
                // VISIBLE PLAYER POUR WIDGET
                if (isIntersect && isPlaying && !transitionInProgress[i] && (!alreadyVisiblePlayer[i] || !video_widget.classList.contains("visible_player"))) {
 
                    toggleVisiblePlayer(i, true, h, w, off_top_bottom, off_right_left);
                    for (var j = 0; j < videos_Ultimedia_Array.length; j++) {
                        if (i != j) {
                            set_pause(j);
                        }
                    }
 
                    // NOT VISIBLE PLAYER POUR WIDGET
                } else if ((!isIntersect || !isPlaying) && (alreadyVisiblePlayer[i] || video_widget.classList.contains("visible_player"))) {
                    toggleVisiblePlayer(i, false, h, w, off_top_bottom, off_right_left);
                }
            }
        }
    }
    
    function toggleVisiblePlayer(id_video, visible, h, w, off_top_bottom, off_right_left) {
        var video_brother = false;
        var diff_top = false;
        var diff_bot = false;
        var diff_bot = false;
        var diff_rig = false;
        var diff_rig = false;
        var diff_lef = false;
        if (video_is_iframe[id_video]) {
                var iframe = videos_Ultimedia_Array[id_video].contentWindow;
                video_brother = document.getElementById(id_video + '_visible_player_brother');
            if (visible) {
                uvp.set_in_page_visible_player(true);
                alreadyVisiblePlayer[id_video] = 1;
                transitionInProgress[id_video] = 1;
                video_brother.style.width = w + 'px';
                video_brother.style.height = h + 'px';
                video_brother.style.backgroundColor = 'black';
 
                iframe.postMessage('fb_btn_hide', '*');
                videosTimeOut[id_video] = new Array();
 
                for (var l = 1; l <= duration_transition; l++) {
                    videosTimeOut[id_video].push(setTimeout( function(x) {
                        return function()
                        {
                            switch (position_css) {
                                case 1:
                                    diff_top = top_css + ' !important;';
                                    diff_bot = off_top_bottom + (bottom_css - off_top_bottom) * x / duration_transition;
                                    diff_bot = diff_bot + 'px !important;';
                                    diff_rig = off_right_left + (right_css - off_right_left) * x / duration_transition;
                                    diff_rig = diff_rig + 'px !important;';
                                    diff_lef = left_css + ' !important;';
                                    break;
                                case 2:
                                    diff_top = off_top_bottom + (top_css - off_top_bottom) * x / duration_transition;
                                    diff_top = diff_top + 'px !important;';
                                    diff_bot = bottom_css + ' !important;';
                                    diff_rig = off_right_left + (right_css - off_right_left) * x / duration_transition;
                                    diff_rig = diff_rig + 'px !important;';
                                    diff_lef = left_css + ' !important;';
                                    break;
                                case 3:
                                    diff_top = off_top_bottom + (top_css - off_top_bottom) * x / duration_transition;
                                    diff_top = diff_top + 'px !important;';
                                    diff_bot = bottom_css + ' !important;';
                                    diff_rig = right_css + ' !important;';
                                    diff_lef = off_right_left + (left_css - off_right_left) * x / duration_transition;
                                    diff_lef = diff_lef + 'px !important;';
                                    break;
                                case 4:
                                    diff_top = top_css + ' !important;';
                                    diff_bot = off_top_bottom + (bottom_css - off_top_bottom) * x / duration_transition;
                                    diff_bot = diff_bot + 'px !important;';
                                    diff_rig = right_css + ' !important;';
                                    diff_lef = off_right_left + (left_css - off_right_left) * x / duration_transition;
                                    diff_lef = diff_lef + 'px !important;';
                                    break;
                            }
                            
                            var diff_h = h + (h / w * width_css - h) * x / duration_transition;
                            var diff_w = w + (width_css - w) * x / duration_transition;
                            var diff_opa = 0.1 + (0.9) * x / duration_transition;

                            videos_Ultimedia_Array[id_video].style.cssText = 'z-index:1000;position:fixed !important;height:'+diff_h+'px !important;width:'+diff_w+'px !important;bottom:'+diff_bot+'right:'+diff_rig+'top:'+diff_top+'left:'+diff_lef;
                            videos_Ultimedia_Array[id_video].style.opacity = diff_opa;
 
                            if (x == duration_transition) {
                                videos_Ultimedia_Array[id_video].className = "visible_player";
                                videos_Ultimedia_Array[id_video].style.removeProperty('width');
                                videos_Ultimedia_Array[id_video].style.removeProperty('opacity');
                                videos_Ultimedia_Array[id_video].style.removeProperty('zIndex');
                                videos_Ultimedia_Array[id_video].style.removeProperty('position');
                                videos_Ultimedia_Array[id_video].style.removeProperty('bottom');
                                videos_Ultimedia_Array[id_video].style.removeProperty('right'); 
                                videos_Ultimedia_Array[id_video].style.removeProperty('top'); 
                                videos_Ultimedia_Array[id_video].style.removeProperty('left'); 
                                transitionInProgress[id_video] = 0;
                            }
                        }
                    }(l), l)); // ICI c'est la lettre L et pas le chiffre 1.
                }
            } else {
                uvp.set_in_page_visible_player(false);
                for (var r in videosTimeOut[id_video]) {
                    clearTimeout(videosTimeOut[id_video][r]);
                }
                video_brother.style.width = '';
                video_brother.style.height = '';
                videos_Ultimedia_Array[id_video].style.removeProperty('height');
                videos_Ultimedia_Array[id_video].style.removeProperty('width');
                videos_Ultimedia_Array[id_video].style.removeProperty('opacity');
                videos_Ultimedia_Array[id_video].style.removeProperty('zIndex');
                videos_Ultimedia_Array[id_video].style.removeProperty('position');
                videos_Ultimedia_Array[id_video].style.removeProperty('bottom');
                videos_Ultimedia_Array[id_video].style.removeProperty('right');
                videos_Ultimedia_Array[id_video].className = class_name[id_video];
                console.debug(class_name[id_video]);
                transitionInProgress[id_video] = 0;
                alreadyVisiblePlayer[id_video] = 0;
                iframe.postMessage('fb_btn_show', '*');
            }
        } else { // WIDGET
            var video_Ultimedia = document.getElementById(videos_Ultimedia_Array[id_video]._target + '_visible_player');
            if (visible) {
                uvp.set_in_page_visible_player(true);
                alreadyVisiblePlayer[id_video] = 1;
                transitionInProgress[id_video] = 1;
                video_Ultimedia.parentNode.style.width = w + 'px';
                video_Ultimedia.parentNode.style.height = h + 'px';
                video_Ultimedia.parentNode.style.backgroundColor = 'black';
                
                videos_Ultimedia_Array[id_video].setVisiblePlayer(true);
                videos_Ultimedia_Array[id_video].showPanel(false);

                for (var l = 1; l <= duration_transition; l++) {
                    videosTimeOut[id_video] = setTimeout( function(x) {
                        return function() {
                            switch (position_css) {
                                case 1:
                                    diff_top = top_css + ' !important;';
                                    diff_bot = off_top_bottom + (bottom_css - off_top_bottom) * x / duration_transition;
                                    diff_bot = diff_bot + 'px !important;';
                                    diff_rig = off_right_left + (right_css - off_right_left) * x / duration_transition;
                                    diff_rig = diff_rig + 'px !important;';
                                    diff_lef = left_css + ' !important;';
                                    break;
                                case 2:
                                    diff_top = off_top_bottom + (top_css - off_top_bottom) * x / duration_transition;
                                    diff_top = diff_top + 'px !important;';
                                    diff_bot = bottom_css + ' !important;';
                                    diff_rig = off_right_left + (right_css - off_right_left) * x / duration_transition;
                                    diff_rig = diff_rig + 'px !important;';
                                    diff_lef = left_css + ' !important;';
                                    break;
                                case 3:
                                    diff_top = off_top_bottom + (top_css - off_top_bottom) * x / duration_transition;
                                    diff_top = diff_top + 'px !important;';
                                    diff_bot = bottom_css + ' !important;';
                                    diff_rig = right_css + ' !important;';
                                    diff_lef = off_right_left + (left_css - off_right_left) * x / duration_transition;
                                    diff_lef = diff_lef + 'px !important;';
                                    break;
                                case 4:
                                    diff_top = top_css + ' !important;';
                                    diff_bot = off_top_bottom + (bottom_css - off_top_bottom) * x / duration_transition;
                                    diff_bot = diff_bot + 'px !important;';
                                    diff_rig = right_css + ' !important;';
                                    diff_lef = off_right_left + (left_css - off_right_left) * x / duration_transition;
                                    diff_lef = diff_lef + 'px !important;';
                                    break;
                            }
                            
                            var diff_h = h + (h / w * width_css - h) * x / duration_transition;
                            var diff_w = w + (width_css - w) * x / duration_transition;
                            var diff_opa = 0.1 + (0.9) * x / duration_transition;
                            video_Ultimedia.style.cssText = 'z-index:1000;position:fixed !important;height:'+diff_h+'px !important;width:'+diff_w+'px !important;bottom:'+diff_bot+'right:'+diff_rig+'top:'+diff_top+'left:'+diff_lef;
                            video_Ultimedia.style.opacity = diff_opa;
 
                            if (x == duration_transition) {
                                video_Ultimedia.classList.add("visible_player");
                                transitionInProgress[id_video] = 0;
                            }
                        }
                    } (l), l); // ICI c'est la lettre L et pas le chiffre 1.
                }
                 
            } else {
                uvp.set_in_page_visible_player(false);
                video_Ultimedia.parentNode.style.width = '';
                video_Ultimedia.parentNode.style.height = '';
                video_Ultimedia.style.height = '';
                video_Ultimedia.style.width = '';
                video_Ultimedia.style.opacity = '';
                video_Ultimedia.style.zIndex = '';
                video_Ultimedia.style.position = '';
                video_Ultimedia.style.bottom = '';
                video_Ultimedia.style.right = '';
                video_Ultimedia.classList.remove("visible_player");
                transitionInProgress[id_video] = 0;
                clearTimeout(videosTimeOut[id_video]);
                alreadyVisiblePlayer[id_video] = 0;
                videos_Ultimedia_Array[id_video].setVisiblePlayer(false);
            }
        }
    }
 
    function displayMessage (evt) {
        if (!close_video && typeof evt.data == "string") {
            var matches = evt.data.match(/(state_player)=(.*)_(\d+)/);
            var matches_2 = evt.data.match(/(new_video_)(\d+)_(\d+)_(\d+)_(\d+)/);
            if (matches) {
                if (matches[1] == 'state_player') {
                    if (matches[2] == 'play') { // && videoPlay[matches[3]] == 'pause') { // Si la vidéo passe de pause à play
                        videoPlay[matches[3]] = 'play';
                        for (var k = 0; k < videos_Ultimedia_Array.length; k++) {   // On met à pause toutes les autres vidéos
                            if (matches[3] != k) {
                                set_pause(k);
                                if (alreadyVisiblePlayer[k]) { // On retire le visiblePlayer de la vidéo qui est en visible player si il y en a une.
                                    toggleVisiblePlayer(k, false, 320, 640, 5, 5);
                                }
                            }
                        }
//                    } else if (matches[2] == 'play') { // Si la vidéo est encore en play
//                        videoPlay[matches[3]] = 'play';
                    } else if (matches[2] == 'close') {
                        close_video = true;

                        for (var k = 0; k < videos_Ultimedia_Array.length; k++) {
                            toggleVisiblePlayer(k, false, 320, 640,5, 5);
                        }
                    } else if (matches[2].startsWith("valid")) { // sinon si differend de loading
                        videos_Ultimedia_Array_Valid[matches[3]] = parseInt(matches[2].slice(-1));
                    } else if (matches[2] != 'loading') { // sinon si differend de loading
                        videoPlay[matches[3]] = 'pause';
                        var ot_check = 7;
                    }
                }
            } else if (matches_2) {
                uvp.findVideos(parseInt(matches_2[2]), parseInt(matches_2[3]), parseInt(matches_2[4]), parseInt(matches_2[5]));
            }
        }
    }
 
    this.initWidget = function(video_target, visible_level) {
        if (videos_Ultimedia_Array.indexOf(video_target) >= 0)
            return; 
        if (null == document.getElementById(video_target._target + '_visible_player')) {

            videos_Ultimedia_Array.push(video_target);
            videos_visible_length = videos_Ultimedia_Array.length -1;
            video_is_iframe[videos_visible_length] = false;
            videos_Ultimedia_Array_Valid[videos_visible_length] = visible_level;
                  
            var video_parent = document.getElementById(video_target._target);
            var wrapper = document.createElement('div');
            wrapper.id = video_target._target + '_visible_player';
            var wrapper_button = document.createElement('div');
            wrapper_button.id = videos_visible_length + '_button_visible_player';
            wrapper_button.className = 'button_visible_player';
            wrapper_button.style.position = 'absolute';
            wrapper_button.style.top = '0 px';
            wrapper_button.style.left = '0 px';
            wrapper_button.style.width = '100%';
            wrapper_button.style.height = '100%';
            wrapper_button.style.zIndex = '11';
            wrapper_button.style.display = 'none';
            wrapper_button.style.cursor = 'pointer';
            video_parent.parentNode.insertBefore(wrapper, video_parent);
            wrapper.appendChild(video_parent);
            wrapper.parentNode.insertBefore(wrapper_button, wrapper); 

            var close_img = document.createElement('img');
            close_img.id = "close_cross";
            close_img.style.cursor = "pointer";
            close_img.style.display = "none";
            close_img.style.position = "absolute";
            close_img.style.right = "7px";
            close_img.style.width = "14px";
            close_img.style.height = "14px";
            close_img.style.zIndex = "100";
            close_img.style.margin = "0";
            close_img.style.top = "7px";
            
            close_img.src = video_target._path + '/img/deliver/close_cross.png';
            video_parent.parentNode.insertBefore(close_img, video_parent);

            close_img.onclick = function () {
                close_video = true;
                for (var k = 0; k < videos_Ultimedia_Array.length; k++) {
                    toggleVisiblePlayer(k, false, 320, 640,5, 5);
                }
            }

            wrapper_button.onclick = function() {
                video_target._jw.play(true);
                video_target.toggleLayerVisiblePlayer(videos_Ultimedia_Array.indexOf(video_target), false);
                old_play[videos_Ultimedia_Array.indexOf(video_target)] = 'play';
                 
                for (var j = 0; j < videos_Ultimedia_Array.length; j++) {
                    if (videos_Ultimedia_Array.indexOf(video_target) != j) {
                        set_pause(j);
                        if (alreadyVisiblePlayer[j]) { // On retire le visiblePlayer de la vidéo qui est en visible player si il y en a une.
                            toggleVisiblePlayer(j, false, 320, 640,5, 5);
                        }
                    }
                }

                if (jwplayer.version.charAt(0) == 6 ) {
                    video_target._jw.callInternal("jwCallVPAID", "resumeAd");
                }
            }
        }
    }

    this.changeState = function(state, video_obj) {
        var v = videos_Ultimedia_Array.indexOf(video_obj);
        var video_target = videos_Ultimedia_Array[v];
        if (typeof video_target == 'undefined' || typeof video_target._jw == 'undefined') {
            return;
        }
        if (state == 'otplay') {
            ot_check ++;
            if (ot_check % 8 == 0) {
                old_play[v] = 'play';
                for (var j = 0; j < videos_Ultimedia_Array.length; j++) {
                    if (v != j) {
                        set_pause(j);
                        if (alreadyVisiblePlayer[j]) { // On retire le visiblePlayer de la vidéo qui est en visible player si il y en a une.
                            toggleVisiblePlayer(j, false, 320, 640,5, 5);
                        }
                    }
                }
            }
        } else if (state == 'play' || state == 'playAd') {
            old_play[v] = 'play';
            for (var j = 0; j < videos_Ultimedia_Array.length; j++) {
                if (v != j) {
                    set_pause(j);
                    if (alreadyVisiblePlayer[j]) { // On retire le visiblePlayer de la vidéo qui est en visible player si il y en a une.
                        toggleVisiblePlayer(j, false, 320, 640,5, 5);
                    }
                }
            }
        } else if (state == 'pause' || state == 'pauseAd') {
            set_pause(v);
            toggleVisiblePlayer(v, false, 320, 640,5, 5);
            ot_check = 7;
            if (state == 'pauseAd') {
                old_play[v] = 'pauseAd';
            }
        } else if (old_play[v] != 'pauseAd') {
            if (video_target._jw.getState() == 'PLAYING' || video_target._jw.getState() == 'playing' || video_target._jw.getState() == 'buffer'   || video_target._jw.getState() == 'BUFFER' || video_target._state == 'preroll' || video_target._state == 'after_preroll' || video_target._state == 'before_preroll') {
                old_play[v] = 'play';
                for (var j = 0; j < videos_Ultimedia_Array.length; j++) {
                    if (v != j) {
                        set_pause(j);
                        if (alreadyVisiblePlayer[j]) { // On retire le visiblePlayer de la vidéo qui est en visible player si il y en a une.
                            toggleVisiblePlayer(j, false, 320, 640,5, 5);
                        }
                    }
                }
            } else {
                set_pause(v);
                toggleVisiblePlayer(v, false, 320, 640,5, 5);
                ot_check = 7;
                if (state == 'pauseAd') {
                    old_play[v] = 'pauseAd';
                }
            }
        }
    }
    
    this.set_in_page_visible_player = function(state) {
        for (var b = 0; b < videos_Ultimedia_Array.length; b++) {
            if (video_is_iframe[b]) {
                videos_Ultimedia_Array[b].contentWindow.postMessage( 'in_page_visible_player_' + state ? 'true' : 'false', '*');
            } else {
                videos_Ultimedia_Array[b].in_page_visible_player = state;
            }
        }
    }

    this.check_play = function() {
        for (var q = 0; q < videos_Ultimedia_Array.length; q++) {
            if (video_is_iframe[q]) {
                videos_Ultimedia_Array[q].contentWindow.postMessage( 'check_play', '*');
            }
        }
    }

    function set_pause(id_video) {
        if (!close_video) {
            if (video_is_iframe[id_video]) {
                var iframe = videos_Ultimedia_Array[id_video].contentWindow;
                iframe.postMessage('pause_', '*');
            } else {
                videos_Ultimedia_Array[id_video]._jw.pause(true);
                if (videos_Ultimedia_Array[id_video]._state == 'preroll') {
                    videos_Ultimedia_Array[id_video].toggleLayerVisiblePlayer(id_video, true);
                    old_play[id_video] = 'pauseAd';
                    if (jwplayer.version.charAt(0) == 6 ) {
                        videos_Ultimedia_Array[id_video]._jw.callInternal("jwCallVPAID", "pauseAd");
                    }
                }
            }
        }
    }
 
    if (window.addEventListener) {window.addEventListener("message", displayMessage, false);}
    else {window.attachEvent("onmessage", displayMessage);}
};
ultimediaVisiblePlayer = new ultimediaVisiblePlayer();
