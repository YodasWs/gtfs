"use strict";function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest()}function _iterableToArrayLimit(arr,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(arr)))return;var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _toArray(arr){return _arrayWithHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass)}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else{result=Super.apply(this,arguments)}return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call}return _assertThisInitialized(self)}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _wrapNativeSuper(Class){var _cache=typeof Map==="function"?new Map:undefined;_wrapNativeSuper=function _wrapNativeSuper(Class){if(Class===null||!_isNativeFunction(Class))return Class;if(typeof Class!=="function"){throw new TypeError("Super expression must either be null or a function")}if(typeof _cache!=="undefined"){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper)}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor)}Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:false,writable:true,configurable:true}});return _setPrototypeOf(Wrapper,Class)};return _wrapNativeSuper(Class)}function _construct(Parent,args,Class){if(_isNativeReflectConstruct()){_construct=Reflect.construct}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor;if(Class)_setPrototypeOf(instance,Class.prototype);return instance}}return _construct.apply(null,arguments)}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function _isNativeFunction(fn){return Function.toString.call(fn).indexOf("[native code]")!==-1}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _getPrototypeOf(o)}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}!function(e){var t={};function o(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==_typeof(e)&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e){o.d(s,a,function(t){return e[t]}.bind(null,a))}return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){e.exports=o(1)},function(e,t){function o(){var e=document.querySelector("main > h2");e instanceof Element&&(e.innerHTML="Error")}function s(){o(),_toConsumableArray(document.querySelectorAll(".no-google")).forEach(function(e){e.removeAttribute("hidden")}),_toConsumableArray(document.querySelectorAll("#google-maps")).forEach(function(e){e.setAttribute("hidden","hidden")})}function a(){o(),_toConsumableArray(document.querySelectorAll(".no-workers")).forEach(function(e){e.removeAttribute("hidden")})}var r=function(_Worker){_inherits(r,_Worker);var _super=_createSuper(r);function r(){var _this;_classCallCheck(this,r);for(var _len=arguments.length,e=new Array(_len),_key=0;_key<_len;_key++){e[_key]=arguments[_key]}_this=_super.call.apply(_super,[this].concat(e)),_this.extremes={north:-90,south:90,east:-180,west:180},_this.shapes={};return _this}_createClass(r,[{key:"enlargeExtremes",value:function enlargeExtremes(e){e instanceof google.maps.LatLng&&(this.extremes={north:Math.max(this.extremes.north,e.lat()),south:Math.min(this.extremes.south,e.lat()),east:Math.max(this.extremes.east,e.lng()),west:Math.min(this.extremes.west,e.lng())}),e instanceof google.maps.LatLngBounds&&(this.extremes={north:Math.max(this.extremes.north,e.Ua.i),south:Math.min(this.extremes.south,e.Ua.g),east:Math.max(this.extremes.east,e.La.i),west:Math.min(this.extremes.west,e.La.g)}),Number.isFinite(e.lat)&&(this.extremes={north:Math.max(this.extremes.north,e.lat),south:Math.min(this.extremes.south,e.lat)}),Number.isFinite(e.lng)&&(this.extremes={east:Math.max(this.extremes.east,e.lng),west:Math.min(this.extremes.west,e.lng)}),Number.isFinite(e.north)&&(this.extremes.north=Math.max(this.extremes.north,e.north)),Number.isFinite(e.south)&&(this.extremes.south=Math.min(this.extremes.south,e.south)),Number.isFinite(e.east)&&(this.extremes.east=Math.max(this.extremes.east,e.east)),Number.isFinite(e.west)&&(this.extremes.west=Math.min(this.extremes.west,e.west)),this.map.setOptions({restriction:{latLngBounds:this.extremes}})}},{key:"listAgencies",value:function listAgencies(e){if(!Array.isArray(e))return;var t=document.querySelector("main");if(!(t instanceof Element))return;var o=document.createElement("section");o.classList.add("agency"),e.forEach(function(e){e&&""!=e.agency_id&&(o.insertAdjacentHTML("beforeend","<h1>"+e.agency_name),e.agency_url&&o.insertAdjacentHTML("beforeend","<a href=\"".concat(e.agency_url,"\" target=\"_blank\">Agency Website")))}),_toConsumableArray(document.querySelectorAll("main section.agency")).forEach(function(e){return e.remove()}),t.appendChild(o)}},{key:"updateShape",value:function updateShape(e,t){this.shapes[e]=_objectSpread(_objectSpread({},this.shapes[e]),t),this.drawPolyline(this.shapes[e])}},{key:"drawPolylines",value:function drawPolylines(){Object.values(this.shapes).forEach(this.drawPolyline.bind(this))}},{key:"drawPolyline",value:function drawPolyline(e){if(google&&this.map&&Array.isArray(e.path)&&e.path.length>1){e.poly=new google.maps.Polyline({path:e.path,geodesic:!0,strokeColor:"#008800",strokeWeight:2,opacity:.6,strokeOpacity:1,clickable:!0}),e.poly.setMap(this.map);var _t=_objectSpread({},this.extremes);e.path.forEach(function(e){_t={north:Math.max(_t.north,e.lat),south:Math.min(_t.south,e.lat),east:Math.max(_t.east,e.lng),west:Math.min(_t.west,e.lng)}}),this.enlargeExtremes(_t)}}}]);return r}(_wrapNativeSuper(Worker));yodasws.page("home").setRoute({template:"pages/home.html",route:"/([a-z]{2}/(\\w+/)?)?"}).on("load",function(){if(!window.Worker)return void a();var e=new r("res/gtfs.js");if(!(e instanceof Worker))return void a();e.onmessage=function(t){var _t$data=_toArray(t.data),o=_t$data[0],s=_t$data.slice(1);"function"==typeof e[o]&&e[o].apply(e,_toConsumableArray(s))};var t=function(){var e=window.location.hash.replace(/^#!\/|\/$/g,"");var t={"jp/hakone":{search:"Hakone, Japan",title:"Hakone, Japan",files:"jp/hakone"},"us/charlotte":{search:"Charlotte, NC, USA",title:"Charlotte",files:"us/charlotte"}};return t[e]?t[e]:(t=Object.entries(t).filter(function(_ref){var _ref2=_slicedToArray(_ref,2),t=_ref2[0],o=_ref2[1];return t.includes(e)}),t[Math.floor(Math.random()*t.length)][1])}();if(!t)return void s();if(e.postMessage(["loadGTFS",t.files]),function(){_toConsumableArray(document.querySelectorAll("#google-maps, .gtfs")).forEach(function(e){e.removeAttribute("hidden")});var e=document.querySelector("main > h2");e instanceof Element&&(e.innerHTML=t.title)}(),!google||!google.maps)return void s();if(!(document.getElementById("google-maps")instanceof Element))return void s();new google.maps.Geocoder().geocode({address:t.search},function(o,a){if("OK"==a){e.map=new google.maps.Map(document.getElementById("google-maps"),{mapTypeId:google.maps.MapTypeId.ROADMAP,gestureHandling:"cooperative",keyboardShortcuts:!0,disableDefaultUI:!0,scaleControl:!0,scrollWheel:!0,zoomControl:!0,maxZoom:18,minZoom:9,zoom:11,center:o[0].geometry.location,restriction:{latLngBounds:function(){if(t.bounds)return t.bounds;var e=o[0].geometry.bounds;return e.Ua&&e.La?{north:e.Ua.i,east:e.La.i,south:e.Ua.g,west:e.La.g}:{north:e.northeast.lat,east:e.northeast.lng,south:e.southwest.lat,west:e.southwest.lng}}()}}),e.map.zoom=e.map.getZoom(),e.map.addListener("zoom_changed",function(t){if(e.poly&&"object"==_typeof(e.poly)){var _t2=e.map.zoom>=14?e.map.zoom-13:6-Math.floor((e.map.zoom-1)/2);Object.values(e.poly).forEach(function(o){e.poly[i].Polyline&&o.Polyline.setOptions({strokeWeight:o.weight+_t2})})}});var _s2=e.map.addListener("tilesloaded",function(){e.enlargeExtremes(e.map.getBounds()),google.maps.event.removeListener(_s2)});setTimeout(function(){e.drawPolylines()},0)}else s(),console.error("Sam, Geocoder failed,",a)})}),yodasws.on("page-loaded",function(){"undefined"!=typeof $&&$&&($("main").on("click","section[data-route-id]",function(e){var t=$(e.target).closest("section[data-route-id]").is(".active");var o=$(e.target).closest("li[data-stop-id]").length>0;if(t&&o&&(o=o&&$(e.target).closest("li[data-stop-id]").is(".active")),t)o||$("section[data-route-id].active").trigger("unfocus");else{$("section[data-route-id].active").trigger("unfocus");var s=$(e.target).closest("section[data-route-id]").addClass("active");if(route=s.data("route-id"),shape=gtfs.routes[route].shape,pts=[],!shape||!gtfs.poly[shape])return;gtfs.poly[shape].Polyline.setOptions({strokeWeight:4,opacity:1,zIndex:1}),gtfs.routes[route].stops.forEach(function(e){pts.push(gtfs.stops[e])}),$("html, body").animate({scrollTop:0},300,function(){pts.length?gtfs.setBounds(pts):gtfs.map.fitBounds(gtfs.extremes)})}}).on("unfocus",function(e){var t=$(e.target).closest("section[data-route-id]").removeClass("active").data("route-id"),o=gtfs.routes[t].shape;o&&gtfs.poly[o]&&(gtfs.map.fitBounds(gtfs.extremes),gtfs.poly[o].Polyline.setOptions({strokeWeight:gtfs.poly[o].weight,opacity:gtfs.poly[o].opacity||.6,zIndex:0}))}),$(document).on("click",function(e){$(e.target).closest("section[data-route-id]").length||$(e.target).closest("#google-maps").length||$("section[data-route-id].active").trigger("unfocus")}),$("main").on("click","li[data-stop-id]",function(e){var t=$(e.target).closest("li[data-stop-id]"),o=t.data("stop-id"),s=(t.parents("section[data-route-id]").data("route-id"),gtfs.stops[o].Marker.getVisible());!$(e.target).closest("section[data-route-id]").is(".active")&&t.is(".active")||(gtfs.hideStops(),$("li[data-stop-id].active").removeClass("active"),$("section[data-route-id].highlighted").removeClass("highlighted"),s||($("li[data-stop-id=\""+o+"\"]").addClass("active").parents("section[data-route-id]").addClass("highlighted"),gtfs.stops[o].Marker.setVisible(!0),gtfs.map.panTo(gtfs.stops[o].Marker.getPosition())))}))});var n=document.querySelector("script[src*=\"maps.google.com/maps/api/js\"]");n instanceof Element&&n.addEventListener("load",function(){})}]);