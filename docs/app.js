"use strict";function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}function _iterableToArrayLimit(arr,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(arr)))return;var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}!function(t){var e={};function o(s){if(e[s])return e[s].exports;var a=e[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=e,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==_typeof(t)&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t){o.d(s,a,function(e){return t[e]}.bind(null,a))}return s},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){t.exports=o(1)},function(t,e){yodasws.page("home").setRoute({template:"pages/home.html",route:"/([a-z]{2}/(\\w+/)?)?"}).on("load",function(){if(!google||!google.maps)return;var t=function(){var t=window.location.hash.replace(/^#!\/|\/$/g,"");var e={"jp/hakone":{search:"Hakone, Japan",title:"Hakone, Japan"},"us/charlotte":{search:"Charlotte, NC, USA",title:"Charlotte"}};return e[t]?e[t]:(e=Object.entries(e).filter(function(_ref){var _ref2=_slicedToArray(_ref,2),e=_ref2[0],o=_ref2[1];return e.includes(t)}),e[Math.floor(Math.random()*e.length)][1])}();if(!t)return;(function(){var e=document.querySelector("main > h2");e instanceof Element&&(e.innerHTML=t.title)})();if(!(document.getElementById("google-maps")instanceof Element))return;_toConsumableArray(document.querySelectorAll("#google-maps, .gtfs")).forEach(function(t){t.removeAttribute("hidden")});new google.maps.Geocoder().geocode({address:t.search},function(e,o){"OK"==o?(gtfs.map=new google.maps.Map(document.getElementById("google-maps"),{mapTypeId:google.maps.MapTypeId.ROADMAP,gestureHandling:"cooperative",keyboardShortcuts:!0,disableDefaultUI:!0,scaleControl:!0,scrollWheel:!0,zoomControl:!0,maxZoom:18,minZoom:9,zoom:11,center:e[0].geometry.location,restriction:{latLngBounds:function(){if(t.bounds)return t.bounds;var o=e[0].geometry.bounds;return o.Ua&&o.La?{north:o.Ua.i,east:o.La.i,south:o.Ua.g,west:o.La.g}:{north:o.northeast.lat,east:o.northeast.lng,south:o.southwest.lat,west:o.southwest.lng}}()}}),gtfs.map.zoom=gtfs.map.getZoom(),gtfs.map.addListener("zoom_changed",function(t){var e=gtfs.map.zoom>=14?gtfs.map.zoom-13:6-Math.floor((gtfs.map.zoom-1)/2);Object.values(gtfs.poly).forEach(function(t){gtfs.poly[i].Polyline&&t.Polyline.setOptions({strokeWeight:t.weight+e})})})):console.log("Sam, Geocoder failed,",o)})}),yodasws.on("page-loaded",function(){"undefined"!=typeof $&&$&&($("main").on("click","section[data-route-id]",function(t){var e=$(t.target).closest("section[data-route-id]").is(".active");var o=$(t.target).closest("li[data-stop-id]").length>0;if(e&&o&&(o=o&&$(t.target).closest("li[data-stop-id]").is(".active")),e)o||$("section[data-route-id].active").trigger("unfocus");else{$("section[data-route-id].active").trigger("unfocus");var s=$(t.target).closest("section[data-route-id]").addClass("active");if(route=s.data("route-id"),shape=gtfs.routes[route].shape,pts=[],!shape||!gtfs.poly[shape])return;gtfs.poly[shape].Polyline.setOptions({strokeWeight:4,opacity:1,zIndex:1}),gtfs.routes[route].stops.forEach(function(t){pts.push(gtfs.stops[t])}),$("html, body").animate({scrollTop:0},300,function(){pts.length?gtfs.setBounds(pts):gtfs.map.fitBounds(gtfs.extremes)})}}).on("unfocus",function(t){var e=$(t.target).closest("section[data-route-id]").removeClass("active").data("route-id"),o=gtfs.routes[e].shape;o&&gtfs.poly[o]&&(gtfs.map.fitBounds(gtfs.extremes),gtfs.poly[o].Polyline.setOptions({strokeWeight:gtfs.poly[o].weight,opacity:gtfs.poly[o].opacity||.6,zIndex:0}))}),$(document).on("click",function(t){$(t.target).closest("section[data-route-id]").length||$(t.target).closest("#google-maps").length||$("section[data-route-id].active").trigger("unfocus")}),$("main").on("click","li[data-stop-id]",function(t){var e=$(t.target).closest("li[data-stop-id]"),o=e.data("stop-id"),s=(e.parents("section[data-route-id]").data("route-id"),gtfs.stops[o].Marker.getVisible());!$(t.target).closest("section[data-route-id]").is(".active")&&e.is(".active")||(gtfs.hideStops(),$("li[data-stop-id].active").removeClass("active"),$("section[data-route-id].highlighted").removeClass("highlighted"),s||($("li[data-stop-id=\""+o+"\"]").addClass("active").parents("section[data-route-id]").addClass("highlighted"),gtfs.stops[o].Marker.setVisible(!0),gtfs.map.panTo(gtfs.stops[o].Marker.getPosition())))}))});var o=document.querySelector("script[src*=\"maps.google.com/maps/api/js\"]");o instanceof Element&&o.addEventListener("load",function(){})}]);