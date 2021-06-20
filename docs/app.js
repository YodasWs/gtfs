"use strict";function _toArray(arr){return _arrayWithHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableRest()}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(arr,i){var _i=arr&&(typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"]);if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly){symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})}keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass)}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else{result=Super.apply(this,arguments)}return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call}return _assertThisInitialized(self)}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _wrapNativeSuper(Class){var _cache=typeof Map==="function"?new Map:undefined;_wrapNativeSuper=function _wrapNativeSuper(Class){if(Class===null||!_isNativeFunction(Class))return Class;if(typeof Class!=="function"){throw new TypeError("Super expression must either be null or a function")}if(typeof _cache!=="undefined"){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper)}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor)}Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:false,writable:true,configurable:true}});return _setPrototypeOf(Wrapper,Class)};return _wrapNativeSuper(Class)}function _construct(Parent,args,Class){if(_isNativeReflectConstruct()){_construct=Reflect.construct}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor;if(Class)_setPrototypeOf(instance,Class.prototype);return instance}}return _construct.apply(null,arguments)}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function _isNativeFunction(fn){return Function.toString.call(fn).indexOf("[native code]")!==-1}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _getPrototypeOf(o)}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}!function(e){var t={};function o(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==_typeof(e)&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e){o.d(r,s,function(t){return e[t]}.bind(null,s))}return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){e.exports=o(1)},function(e,t){function o(){_toConsumableArray(document.querySelectorAll(".no-google")).forEach(function(e){e.removeAttribute("hidden")}),_toConsumableArray(document.querySelectorAll("#google-maps")).forEach(function(e){e.setAttribute("hidden","hidden")})}function r(){_toConsumableArray(document.querySelectorAll(".no-workers")).forEach(function(e){e.removeAttribute("hidden")})}var s={tram:{minZoom:10,zIndex:90,icon:{url:"pins/icons8-tram-32.png",scaledSize:{width:22,height:22},anchor:{x:11,y:11}}},metro:{minZoom:14,zIndex:95,icon:{url:"pins/icons8-tram-32.png",scaledSize:{width:22,height:22},anchor:{x:11,y:11}}},rail:{minZoom:12,zIndex:100,icon:{url:"pins/icons8-tram-32.png",scaledSize:{width:22,height:22},anchor:{x:11,y:11}}},bus:{minZoom:15,zIndex:0,icon:{url:"pins/icons8-bus-32.png",scaledSize:{width:22,height:22},anchor:{x:11,y:11}}}};var i=function(_Worker){_inherits(i,_Worker);var _super=_createSuper(i);function i(){var _this;_classCallCheck(this,i);for(var _len=arguments.length,e=new Array(_len),_key=0;_key<_len;_key++){e[_key]=arguments[_key]}_this=_super.call.apply(_super,[this].concat(e)),_this.extremes={north:-90,south:90,east:-180,west:180},_this.eventAborts=new AbortController,_this.polylines={},_this.shapes={},_this.stops={};return _this}_createClass(i,[{key:"getStopOptionsForRouteType",value:function getStopOptionsForRouteType(e){var t=Number.parseInt(e);return _objectSpread(_objectSpread({},function(){if("object"==_typeof(s[e])&&null!==s[e]&&Number.isFinite(s[e]))return s[e];if(Number.isFinite(t))switch(Math.floor(t/100)){case 1:return s.rail;case 7:return s.bus;case 9:return s.tram;}switch(e){case"0":return s.tram;case"1":return s.metro;case"2":return s.rail;case"3":return s.bus;case"4":case"5":case"6":case"7":return s.tram;case"11":return s.bus;case"12":return s.metro;}return s.bus}()),{},{minZoom:this.getMinZoomForRouteType(e)})}},{key:"getPinForType",value:function getPinForType(e){}},{key:"getMinZoomForRouteType",value:function getMinZoomForRouteType(e){if("object"==_typeof(s[e])&&null!==s[e]&&Number.isFinite(s[e].minZoom))return s[e].minZoom;var t=Number.parseInt(e);if(Number.isFinite(t)){switch(t){case 107:return s.rail.minZoom+1;case 107:return s.bus.minZoom;}switch(Math.floor(t/100)){case 1:return s.rail.minZoom;case 4:return s.metro.minZoom;case 7:case 8:return s.bus.minZoom;case 9:return s.tram.minZoom;}}return 16}},{key:"listAgencies",value:function listAgencies(e){if(!Array.isArray(e))return;var t=document.querySelector("main");if(!(t instanceof Element))return;var o=document.querySelector("section.agency");o instanceof Element||(o=document.createElement("section"),o.classList.add("agency")),e.forEach(function(e){"object"==_typeof(e)&&null!==e&&e.agency_id&&(o.insertAdjacentHTML("beforeend","<h1>"+e.agency_name),e.agency_url&&o.insertAdjacentHTML("beforeend","<a href=\"".concat(e.agency_url,"\" target=\"_blank\">Agency Website")))}),t.appendChild(o)}},{key:"listRoutes",value:function listRoutes(e){var _this2=this;if(!Array.isArray(e))return;var t=document.querySelector("main");t instanceof Element&&(e.forEach(function(e){var o=document.querySelector("section[data-route-id=\"".concat(e.route_id,"\"]"));o instanceof Element&&o.querySelector("h1")instanceof Element||(o=document.createElement("section"),o.setAttribute("data-route-id",e.route_id),o.setAttribute("data-route-type",e.route_type),o.setAttribute("data-route-short-name",e.route_short_name),t.appendChild(o),e.route_short_name?(o.insertAdjacentHTML("beforeend","<h1 style=\"background:#".concat(e.route_color||"ffffff",";color:#").concat(e.route_text_color||"000000","\">&#x").concat(e.x_route_icon,";&#xfe0f; ").concat(e.route_short_name)),o.insertAdjacentHTML("beforeend","<h2 style=\"background:#".concat(e.route_color||"ffffff",";color:#").concat(e.route_text_color||"000000","\">&#x").concat(e.x_route_icon,";&#xfe0e; ").concat(e.route_long_name))):o.insertAdjacentHTML("beforeend","<h1 style=\"background:#".concat(e.route_color||"ffffff",";color:#").concat(e.route_text_color||"000000","\">&#x").concat(e.x_route_icon,";&#xfe0f; ").concat(e.route_long_name," &#x").concat(e.x_route_icon,";&#xfe0e;")),"string"==typeof e.route_desc&&""!==e.route_desc&&o.insertAdjacentHTML("beforeend","<div>"+e.route_desc))}),this.eventAborts.abort(),this.eventAborts=new AbortController,_toConsumableArray(document.querySelectorAll("section[data-route-id] > h1, section[data-route-id] > h2")).forEach(function(e){e.addEventListener("click",_this2.activateRoute.bind(_this2),{signal:_this2.eventAborts.signal})}),_toConsumableArray(document.querySelectorAll("section[data-route-id]")).sort(function(e,t){var o=e.getAttribute("data-route-type"),r=t.getAttribute("data-route-type");if(o!==r){var _e=Number.parseInt(o),_t=Number.parseInt(r);if(Number.isFinite(_e)&&Number.isFinite(_t)&&_e!==_t){var _o=3===_e||7===Math.floor(_e/100),_r=3===_t||7===Math.floor(_t/100);if(_o&&_r)return _e-_t;if(_o!==_r){if(_o)return 1;if(_r)return-1}if(Math.floor(_e/100)!==Math.floor(_t/100)){if(8==Math.floor(_e/100))return 1;if(8==Math.floor(_t/100))return-1;if(2==Math.floor(_e/100))return 1;if(2==Math.floor(_t/100))return-1}return _e-_t}}var s=e.getAttribute("data-route-short-name"),_i=t.getAttribute("data-route-short-name");if(s&&_i){var _e2=Number.parseInt(s),_t2=Number.parseInt(_i);return Number.isFinite(_e2)&&Number.isFinite(_t2)&&_e2!==_t2?_e2-_t2:s.localeCompare(_i)}return 0}).forEach(function(e){t.appendChild(e)}))}},{key:"activateRoute",value:function activateRoute(e){var _this3=this;var t=e.target.closest("section[data-route-id]");if(!(t instanceof Element))return;var o=t.classList.contains("highlighted");if(_toConsumableArray(document.querySelectorAll("section[data-route-id].highlighted")).forEach(function(e){var t=e.getAttribute("data-route-id");"object"==_typeof(_this3.stops[t])&&null!==_this3.stops[t]&&Object.entries(_this3.stops[t]).forEach(function(_ref){var _ref2=_slicedToArray(_ref,2),e=_ref2[0],t=_ref2[1];t.highlighted=!1,t.setVisible(!1)}),e.classList.remove("highlighted");var o=e.querySelector("ol");o instanceof Element&&(o.style.maxHeight="0")}),!o){t.classList.add("highlighted");var _e3=t.querySelector("ol");_e3 instanceof Element&&(_e3.style.maxHeight=_e3.getAttribute("data-max-height")+"px")}var r=t.getAttribute("data-route-id");Object.entries(this.shapes).forEach(function(_ref3){var _ref4=_slicedToArray(_ref3,2),e=_ref4[0],t=_ref4[1];t.highlighted=!1,t.routes.has(r)&&(o||(t.highlighted=!0,_this3.polylines[t.shape_id].setOptions({strokeOpacity:.9,strokeWeight:9,zIndex:100})))}),o||"object"!=_typeof(this.stops[r])||null===this.stops[r]||Object.entries(this.stops[r]).forEach(function(_ref5){var _ref6=_slicedToArray(_ref5,2),e=_ref6[0],t=_ref6[1];t.setOptions(_this3.getStopOptionsForRouteType(t.route_type)),t.highlighted=!0,t.setVisible(!0)}),this.zoomChangePolylines(),o||(t.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(function(){t.scrollIntoView({behavior:"smooth",block:"start"})},1e3))}},{key:"zoomChangePolylines",value:function zoomChangePolylines(){var _this4=this;var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;(function(){if("object"!=_typeof(_this4.polylines)||null===_this4.polylines)return;var t={opacity:{rail:1,bus:1,etc:1},weight:{rail:0,bus:0,etc:0}},o=new Map([[1,"rail"],[7,"bus"]]);var r=1;_this4.map.zoom>=10&&(t.weight.rail=1),_this4.map.zoom>=12&&(t.weight.rail=2),_this4.map.zoom>=14&&(r=1.5,t.weight.bus=_this4.map.zoom-13,t.weight.rail=_this4.map.zoom-12),_this4.map.zoom>=16&&(t.weight.bus=_this4.map.zoom-14),Object.entries("object"==_typeof(e)&&null!==e?_defineProperty({},e.shape_id,e):_this4.shapes).forEach(function(_ref8){var _ref9=_slicedToArray(_ref8,2),e=_ref9[0],s=_ref9[1];if(!s.highlighted&&_this4.polylines[s.shape_id]instanceof google.maps.Polyline){var _e4="etc";if(Number.parseInt(s.route_type)>=100){var _t3=Math.floor(Number.parseInt(s.route_type)/100);o.has(_t3)&&(_e4=o.get(_t3))}else"0"===s.route_type||"2"===s.route_type?_e4="rail":"3"===s.route_type&&(_e4="bus");_this4.polylines[s.shape_id].setOptions({strokeOpacity:s.opacity*r,strokeWeight:s.weight+t.weight[_e4]})}})})(),function(){"object"==_typeof(_this4.stops)&&null!==_this4.stops&&Object.entries(_this4.stops).forEach(function(_ref10){var _ref11=_slicedToArray(_ref10,2),e=_ref11[0],t=_ref11[1];Object.entries(t).forEach(function(_ref12){var _ref13=_slicedToArray(_ref12,2),e=_ref13[0],t=_ref13[1];_this4.map.zoom>=_this4.getMinZoomForRouteType(t.route_type)?t.setVisible(!0):t.highlighted||t.setVisible(!1)})})}()}},{key:"drawPolylines",value:function drawPolylines(e){google&&this.map&&Object.values(e).forEach(this.drawPolyline.bind(this))}},{key:"drawPolyline",value:function drawPolyline(e){if("object"!=(typeof google==="undefined"?"undefined":_typeof(google))||"object"!=_typeof(this.map)||!Array.isArray(e.path)||e.path.length<=1)return;this.shapes[e.shape_id]=e,this.polylines[e.shape_id]instanceof google.maps.Polyline||(this.polylines[e.shape_id]=new google.maps.Polyline({geodesic:!0,opacity:.6,clickable:!0,map:this.map}));var t=function(e){switch(Math.floor(Number.parseInt(e)/100)){case 1:return 10;case 7:return 0;}switch(e){case"0":return 8;case"1":return 9;case"2":return 10;case"3":return 0;case"1200":case"4":return 7;case"1300":case"6":return 6;case"1400":case"7":return 7;case"12":return 9;}return 1}(e.route_type);this.polylines[e.shape_id].setOptions({strokeColor:"#"+(e.route_color||"008800"),zIndex:t,path:e.path}),this.zoomChangePolylines(e)}},{key:"listStops",value:function listStops(e){var _this5=this;Object.entries(e).forEach(function(_ref14){var _ref15=_slicedToArray(_ref14,2),e=_ref15[0],t=_ref15[1];var o=document.querySelector("section[data-route-id=\"".concat(e,"\"]"));if(!(o instanceof Element))return void console.error("Sam, route",e,"not set?!");if(!Array.isArray(t)||0===t.length)return;_toConsumableArray(o.querySelectorAll("ol")).forEach(function(e){return e.remove()}),"object"==_typeof(_this5.stops[e])&&null!==_this5.stops[e]||(_this5.stops[e]={});var r=document.createElement("ol"),s=o.getAttribute("data-route-type");t.forEach(function(t){var o=document.createElement("li");var _i2=t.stop_name;"string"==typeof t.stop_code&&""!==t.stop_code?(_i2="".concat(t.stop_code,". ").concat(t.stop_name),Number.isFinite(Number.parseInt(t.stop_code)),o.innerHTML="".concat(t.stop_name," (").concat(t.stop_code,")")):o.innerHTML=t.stop_name,r.appendChild(o),_this5.stops[e][t.stop_id]instanceof google.maps.Marker||(_this5.stops[e][t.stop_id]=new google.maps.Marker(_objectSpread(_objectSpread({},_this5.getStopOptionsForRouteType(s)),{},{position:{lat:Number.parseFloat(t.stop_lat),lng:Number.parseFloat(t.stop_lon)},visible:!1,map:_this5.map,title:_i2}))),_this5.stops[e][t.stop_id].route_type=s}),o.appendChild(r),r.setAttribute("data-max-height",r.offsetHeight)})}}]);return i}(_wrapNativeSuper(Worker));yodasws.page("home").setRoute({template:"pages/home.html",route:"/([a-z]{2}/([\\w-]+/)?)?"}).on("load",function(){if(!window.Worker)return void r();var e=new i("res/gtfs.js");if(!(e instanceof Worker))return void r();e.onmessage=function(t){var _t$data=_toArray(t.data),o=_t$data[0],r=_t$data.slice(1);"function"==typeof e[o]&&e[o].apply(e,_toConsumableArray(r))};var t=function(){var e=window.location.hash.replace(/^#!\/|\/$/g,"");var t={"jp/hakone":{search:"Hakone, Japan",title:"Hakone, Japan",files:["jp/hakone"]},"us/charlotte":{search:"Charlotte, NC, USA",title:"Charlotte",files:["us/charlotte"]},"us/new-york":{search:"New York City",title:"New York City",files:["us/nyc-bx-bus","us/nyc-si-bus","us/nyc-subway","us/nyc-b-bus","us/nyc-m-bus","us/nyc-q-bus","us/nyc-lirr","us/nyc-path"]}};return t[e]?t[e]:(t=Object.entries(t).filter(function(_ref16){var _ref17=_slicedToArray(_ref16,2),t=_ref17[0],o=_ref17[1];return t.includes(e)}),t[Math.floor(Math.random()*t.length)][1])}();if(!t)return void o();var s="yodasws.github.io"===window.location.hostname?"gtfs/":"";if(t.files.forEach(function(t){e.postMessage(["loadGTFS","".concat(s).concat(t)])}),function(){_toConsumableArray(document.querySelectorAll("#google-maps, .gtfs")).forEach(function(e){e.removeAttribute("hidden")}),yodasws.setPageTitle(t.title);var e=document.querySelector("main > h2");e instanceof Element&&(e.innerHTML=t.title)}(),"object"!=(typeof google==="undefined"?"undefined":_typeof(google))||null===google||"object"!=_typeof(google.maps)||null===google.maps)return void o();if(!(document.getElementById("google-maps")instanceof Element))return void o();new google.maps.Geocoder().geocode({address:t.search},function(t,r){if("OK"!==r)return o(),void console.error("Sam, Geocoder failed,",r);e.map=new google.maps.Map(document.getElementById("google-maps"),{mapTypeId:google.maps.MapTypeId.ROADMAP,gestureHandling:"cooperative",keyboardShortcuts:!0,disableDefaultUI:!0,scaleControl:!0,scrollWheel:!0,zoomControl:!0,maxZoom:18,minZoom:9,zoom:11,center:t[0].geometry.location}),e.map.zoom=e.map.getZoom(),e.map.addListener("zoom_changed",function(t){e.zoomChangePolylines()})})}),yodasws.on("page-loaded",function(){"undefined"!=typeof $&&$&&$("main").on("click","li[data-stop-id]",function(e){var t=$(e.target).closest("li[data-stop-id]"),o=t.data("stop-id"),r=(t.parents("section[data-route-id]").data("route-id"),gtfs.stops[o].Marker.getVisible());!$(e.target).closest("section[data-route-id]").is(".active")&&t.is(".active")||(gtfs.hideStops(),$("li[data-stop-id].active").removeClass("active"),$("section[data-route-id].highlighted").removeClass("highlighted"),r||($("li[data-stop-id=\""+o+"\"]").addClass("active").parents("section[data-route-id]").addClass("highlighted"),gtfs.stops[o].Marker.setVisible(!0),gtfs.map.panTo(gtfs.stops[o].Marker.getPosition())))})})}]);