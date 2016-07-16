/*
 RequireJS domReady 2.0.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/requirejs/domReady for details
*/
define(function(){var isBrowser=typeof window!=="undefined"&&window.document,isPageLoaded=!isBrowser,doc=isBrowser?document:null,readyCalls=[],isTop,testDiv,scrollIntervalId;function runCallbacks(callbacks){var i;for(i=0;i<callbacks.length;i++)callbacks[i](doc)}function callReady(){var callbacks=readyCalls;if(isPageLoaded)if(callbacks.length){readyCalls=[];runCallbacks(callbacks)}}function pageLoaded(){if(!isPageLoaded){isPageLoaded=true;if(scrollIntervalId)clearInterval(scrollIntervalId);callReady()}}
if(isBrowser){if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){setTimeout(pageLoaded,1)},false);window.addEventListener("load",pageLoaded,false)}else if(window.attachEvent){window.attachEvent("onload",pageLoaded);testDiv=document.createElement("div");try{isTop=window.frameElement===null}catch(e){}if(testDiv.doScroll&&isTop&&window.external)scrollIntervalId=setInterval(function(){try{testDiv.doScroll();pageLoaded()}catch(e){}},30)}var isMSIE=0;if(document.readyState===
"complete"||document.readyState==="interactive"&&!isMSIE)pageLoaded()}function domReady(callback){if(isPageLoaded)callback(doc);else readyCalls.push(callback);return domReady}domReady.version="2.0.0";domReady.load=function(name,req,onLoad,config){if(config.isBuild)onLoad(null);else domReady(onLoad)};return domReady});
