"use strict";function _toArray(arr){return _arrayWithHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableRest()}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(arr,i){var _i=arr&&(typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"]);if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass)}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else{result=Super.apply(this,arguments)}return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call}return _assertThisInitialized(self)}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _wrapNativeSuper(Class){var _cache=typeof Map==="function"?new Map:undefined;_wrapNativeSuper=function _wrapNativeSuper(Class){if(Class===null||!_isNativeFunction(Class))return Class;if(typeof Class!=="function"){throw new TypeError("Super expression must either be null or a function")}if(typeof _cache!=="undefined"){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper)}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor)}Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:false,writable:true,configurable:true}});return _setPrototypeOf(Wrapper,Class)};return _wrapNativeSuper(Class)}function _construct(Parent,args,Class){if(_isNativeReflectConstruct()){_construct=Reflect.construct}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor;if(Class)_setPrototypeOf(instance,Class.prototype);return instance}}return _construct.apply(null,arguments)}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function _isNativeFunction(fn){return Function.toString.call(fn).indexOf("[native code]")!==-1}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _getPrototypeOf(o)}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}!function(e){var t={};function o(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==_typeof(e)&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e){o.d(s,r,function(t){return e[t]}.bind(null,r))}return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){e.exports=o(1)},function(e,t){function o(){_toConsumableArray(document.querySelectorAll(".no-google")).forEach(function(e){e.removeAttribute("hidden")}),_toConsumableArray(document.querySelectorAll("#google-maps")).forEach(function(e){e.setAttribute("hidden","hidden")})}function s(){_toConsumableArray(document.querySelectorAll(".no-workers")).forEach(function(e){e.removeAttribute("hidden")})}var r=function(_Worker){_inherits(r,_Worker);var _super=_createSuper(r);function r(){var _this;_classCallCheck(this,r);for(var _len=arguments.length,e=new Array(_len),_key=0;_key<_len;_key++){e[_key]=arguments[_key]}_this=_super.call.apply(_super,[this].concat(e)),_this.extremes={north:-90,south:90,east:-180,west:180},_this.polylines={},_this.shapes={},_this.stops={};return _this}_createClass(r,[{key:"listAgencies",value:function listAgencies(e){if(!Array.isArray(e))return;var t=document.querySelector("main");if(!(t instanceof Element))return;var o=document.querySelector("section.agency");o instanceof Element||(o=document.createElement("section"),o.classList.add("agency")),e.forEach(function(e){"object"==_typeof(e)&&null!==e&&e.agency_id&&(o.insertAdjacentHTML("beforeend","<h1>"+e.agency_name),e.agency_url&&o.insertAdjacentHTML("beforeend","<a href=\"".concat(e.agency_url,"\" target=\"_blank\">Agency Website")))}),t.appendChild(o)}},{key:"listRoutes",value:function listRoutes(e){var _this2=this;if(!Array.isArray(e))return;var t=document.querySelector("main");t instanceof Element&&(e.forEach(function(e){var o=document.querySelector("section[data-route-id=\"".concat(e.route_id,"\"]"));o instanceof Element||(o=document.createElement("section"),o.setAttribute("data-route-id",e.route_id)),t.appendChild(o),e.route_short_name?(o.insertAdjacentHTML("beforeend","<h1 style=\"background:#".concat(e.route_color||"ffffff",";color:#").concat(e.route_text_color||"000000","\">&#x").concat(e.x_route_icon,";&#xfe0f; ").concat(e.route_short_name)),o.insertAdjacentHTML("beforeend","<h2 style=\"background:#".concat(e.route_color||"ffffff",";color:#").concat(e.route_text_color||"000000","\">&#x").concat(e.x_route_icon,";&#xfe0e; ").concat(e.route_long_name))):o.insertAdjacentHTML("beforeend","<h1 style=\"background:#".concat(e.route_color||"ffffff",";color:#").concat(e.route_text_color||"000000","\">&#x").concat(e.x_route_icon,";&#xfe0f; ").concat(e.route_long_name," &#x").concat(e.x_route_icon,";&#xfe0e;")),"string"==typeof e.route_desc&&""!==e.route_desc&&o.insertAdjacentHTML("beforeend","<div>"+e.route_desc)}),_toConsumableArray(document.querySelectorAll("section[data-route-id] > h1, section[data-route-id] > h2")).forEach(function(e){e.addEventListener("click",_this2.activateRoute.bind(_this2))}))}},{key:"activateRoute",value:function activateRoute(e){var _this3=this;var t=e.target.closest("section[data-route-id]");if(!(t instanceof Element))return;_toConsumableArray(document.querySelectorAll("section[data-route-id].highlighted")).forEach(function(e){var t=e.getAttribute("data-route-id");"object"==_typeof(_this3.stops[t])&&null!==_this3.stops[t]&&Object.entries(_this3.stops[t]).forEach(function(_ref){var _ref2=_slicedToArray(_ref,2),e=_ref2[0],t=_ref2[1];t.setMap(null)}),e.classList.remove("highlighted")}),t.classList.add("highlighted");var o=t.getAttribute("data-route-id");console.log("Sam, activateRoute:",o),Object.entries(this.shapes).forEach(function(_ref3){var _ref4=_slicedToArray(_ref3,2),e=_ref4[0],t=_ref4[1];t.highlighted=!1,t.routes.has(o)&&(t.highlighted=!0,console.log("Sam, shape:",t),_this3.polylines[t.shape_id].setOptions({strokeOpacity:.9,strokeWeight:10,zIndex:100}))}),"object"==_typeof(this.stops[o])&&null!==this.stops[o]&&Object.entries(this.stops[o]).forEach(function(_ref5){var _ref6=_slicedToArray(_ref5,2),e=_ref6[0],t=_ref6[1];t.setMap(_this3.map)}),this.zoomChangePolylines();var s=document.querySelector("#google-maps");s instanceof Element&&s.scrollIntoView({behavior:"smooth",block:"center"})}},{key:"zoomChangePolylines",value:function zoomChangePolylines(){var _this4=this;var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var t={opacity:{rail:1,bus:1,etc:1},weight:{rail:0,bus:0,etc:0}},o=new Map([[1,"rail"],[7,"bus"]]);var s=1;this.map.zoom>=10&&(t.weight.rail=1),this.map.zoom>=12&&(t.weight.rail=2),this.map.zoom>=14&&(s=1.5,t.weight.bus=this.map.zoom-13,t.weight.rail=this.map.zoom-12),this.map.zoom>=16&&(t.weight.bus=this.map.zoom-14),Object.entries("object"==_typeof(e)&&null!==e?_defineProperty({},e.shape_id,e):this.shapes).forEach(function(_ref8){var _ref9=_slicedToArray(_ref8,2),e=_ref9[0],_r=_ref9[1];if(!_r.highlighted&&_this4.polylines[_r.shape_id]instanceof google.maps.Polyline){var _e2="etc";if(Number.parseInt(_r.route_type)>=100){var _t=Math.floor(Number.parseInt(_r.route_type)/100);o.has(_t)&&(_e2=o.get(_t))}else"0"===_r.route_type||"2"===_r.route_type?_e2="rail":"3"===_r.route_type&&(_e2="bus");_this4.polylines[_r.shape_id].setOptions({strokeOpacity:_r.opacity*s,strokeWeight:_r.weight+t.weight[_e2]})}})}},{key:"drawPolylines",value:function drawPolylines(e){google&&this.map&&Object.values(e).forEach(this.drawPolyline.bind(this))}},{key:"drawPolyline",value:function drawPolyline(e){if("object"!=(typeof google==="undefined"?"undefined":_typeof(google))||"object"!=_typeof(this.map)||!Array.isArray(e.path)||e.path.length<=1)return;this.shapes[e.shape_id]=e,this.polylines[e.shape_id]instanceof google.maps.Polyline||(this.polylines[e.shape_id]=new google.maps.Polyline({geodesic:!0,opacity:.6,clickable:!0,map:this.map}));var t=function(e){switch(Math.floor(Number.parseInt(e)/100)){case 1:return 10;case 7:return 0;}switch(e){case"0":return 8;case"1":return 9;case"2":return 10;case"3":return 0;case"1200":case"4":return 7;case"1300":case"6":return 6;case"1400":case"7":return 7;case"12":return 9;}return 1}(e.route_type);this.polylines[e.shape_id].setOptions({strokeColor:"#"+(e.route_color||"008800"),zIndex:t,path:e.path}),this.zoomChangePolylines(e)}},{key:"listStops",value:function listStops(e){var _this5=this;Object.entries(e).forEach(function(_ref10){var _ref11=_slicedToArray(_ref10,2),e=_ref11[0],t=_ref11[1];console.log("Sam, listStops:",e,t);var o=document.querySelector("section[data-route-id=\"".concat(e,"\"]"));if(!(o instanceof Element))return void console.error("Sam, route",e,"not set?!");if(!Array.isArray(t)||0===t.length)return void console.error("Sam, route",e,"has no stops?!");_toConsumableArray(o.querySelectorAll("ol")).forEach(function(e){return e.remove()}),"object"==_typeof(_this5.stops[e])&&null!==_this5.stops[e]||(_this5.stops[e]={});var s=document.createElement("ol");t.forEach(function(t){var o=document.createElement("li");var _r2=t.stop_name;"string"==typeof t.stop_code&&(_r2="".concat(t.stop_code,". ").concat(t.stop_name),Number.isFinite(Number.parseInt(t.stop_code))&&o.setAttribute("value",t.stop_code)),o.innerHTML=t.stop_name,s.appendChild(o),_this5.stops[e][t.stop_id]instanceof google.maps.Marker||(_this5.stops[e][t.stop_id]=new google.maps.Marker({position:{lat:Number.parseFloat(t.stop_lat),lng:Number.parseFloat(t.stop_lon)},title:_r2,icon:{url:"https://yodasws.github.io/gtfs/pins/icons8-tram-32.png",scaledSize:new google.maps.Size(22,22),anchor:{x:11,y:11}}}))}),o.appendChild(s)})}}]);return r}(_wrapNativeSuper(Worker));yodasws.page("home").setRoute({template:"pages/home.html",route:"/([a-z]{2}/([\\w-]+/)?)?"}).on("load",function(){if(!window.Worker)return void s();var e=new r("res/gtfs.js");if(!(e instanceof Worker))return void s();e.onmessage=function(t){var _t$data=_toArray(t.data),o=_t$data[0],s=_t$data.slice(1);"function"==typeof e[o]&&e[o].apply(e,_toConsumableArray(s))};var t=function(){var e=window.location.hash.replace(/^#!\/|\/$/g,"");var t={"jp/hakone":{search:"Hakone, Japan",title:"Hakone, Japan",files:["jp/hakone"]},"us/charlotte":{search:"Charlotte, NC, USA",title:"Charlotte",files:["us/charlotte"]},"us/new-york":{search:"New York City",title:"New York City",files:["us/nyc-subway","us/nyc-m-bus"]}};return t[e]?t[e]:(t=Object.entries(t).filter(function(_ref12){var _ref13=_slicedToArray(_ref12,2),t=_ref13[0],o=_ref13[1];return t.includes(e)}),t[Math.floor(Math.random()*t.length)][1])}();if(!t)return void o();if(t.files.forEach(function(t){e.postMessage(["loadGTFS",t])}),function(){_toConsumableArray(document.querySelectorAll("#google-maps, .gtfs")).forEach(function(e){e.removeAttribute("hidden")}),yodasws.setPageTitle(t.title);var e=document.querySelector("main > h2");e instanceof Element&&(e.innerHTML=t.title)}(),"object"!=(typeof google==="undefined"?"undefined":_typeof(google))||null===google||"object"!=_typeof(google.maps)||null===google.maps)return void o();if(!(document.getElementById("google-maps")instanceof Element))return void o();new google.maps.Geocoder().geocode({address:t.search},function(t,s){if("OK"!==s)return o(),void console.error("Sam, Geocoder failed,",s);e.map=new google.maps.Map(document.getElementById("google-maps"),{mapTypeId:google.maps.MapTypeId.ROADMAP,gestureHandling:"cooperative",keyboardShortcuts:!0,disableDefaultUI:!0,scaleControl:!0,scrollWheel:!0,zoomControl:!0,maxZoom:18,minZoom:9,zoom:11,center:t[0].geometry.location}),e.map.zoom=e.map.getZoom(),e.map.addListener("zoom_changed",function(t){e.polylines&&"object"==_typeof(e.polylines)&&e.zoomChangePolylines()})})}),yodasws.on("page-loaded",function(){"undefined"!=typeof $&&$&&($("main").on("click","section[data-route-id]",function(e){var t=$(e.target).closest("section[data-route-id]").is(".active");var o=$(e.target).closest("li[data-stop-id]").length>0;if(t&&o&&(o=o&&$(e.target).closest("li[data-stop-id]").is(".active")),t)o||$("section[data-route-id].active").trigger("unfocus");else{$("section[data-route-id].active").trigger("unfocus");var s=$(e.target).closest("section[data-route-id]").addClass("active");if(route=s.data("route-id"),shape=gtfs.routes[route].shape,pts=[],!shape||!gtfs.poly[shape])return;gtfs.poly[shape].Polyline.setOptions({strokeWeight:4,opacity:1,zIndex:1}),gtfs.routes[route].stops.forEach(function(e){pts.push(gtfs.stops[e])}),$("html, body").animate({scrollTop:0},300,function(){pts.length?gtfs.setBounds(pts):gtfs.map.fitBounds(gtfs.extremes)})}}).on("unfocus",function(e){var t=$(e.target).closest("section[data-route-id]").removeClass("active").data("route-id"),o=gtfs.routes[t].shape;o&&gtfs.poly[o]&&(gtfs.map.fitBounds(gtfs.extremes),gtfs.poly[o].Polyline.setOptions({strokeWeight:gtfs.poly[o].weight,opacity:gtfs.poly[o].opacity||.6,zIndex:0}))}),$(document).on("click",function(e){$(e.target).closest("section[data-route-id]").length||$(e.target).closest("#google-maps").length||$("section[data-route-id].active").trigger("unfocus")}),$("main").on("click","li[data-stop-id]",function(e){var t=$(e.target).closest("li[data-stop-id]"),o=t.data("stop-id"),s=(t.parents("section[data-route-id]").data("route-id"),gtfs.stops[o].Marker.getVisible());!$(e.target).closest("section[data-route-id]").is(".active")&&t.is(".active")||(gtfs.hideStops(),$("li[data-stop-id].active").removeClass("active"),$("section[data-route-id].highlighted").removeClass("highlighted"),s||($("li[data-stop-id=\""+o+"\"]").addClass("active").parents("section[data-route-id]").addClass("highlighted"),gtfs.stops[o].Marker.setVisible(!0),gtfs.map.panTo(gtfs.stops[o].Marker.getPosition())))}))});var a=document.querySelector("script[src*=\"maps.google.com/maps/api/js\"]");a instanceof Element&&a.addEventListener("load",function(){})}]);