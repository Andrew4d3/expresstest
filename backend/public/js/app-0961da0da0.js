angular.module("app",["ui.router","ui.bootstrap"]),_.mixin(_.str.exports()),angular.module("app").config(["$logProvider","$locationProvider","API","RESTfulProvider","PageServiceProvider","$provide",function(n,t,r,e,i,u){n.debugEnabled(!0),u.decorator("$locale",["$delegate",function(n){return"en-us"==n.id&&(n.NUMBER_FORMATS.PATTERNS[1].negPre="-¤",n.NUMBER_FORMATS.PATTERNS[1].negSuf=""),n}]),e.setBaseUrl(r.url),i.setBaseTitle("Scaffolar"),t.html5Mode(!1),u.decorator("$uiViewScroll",["$delegate",function(){return function(){window.scrollTo(0,0)}}])}]),angular.module("app").run(["$rootScope","$http","$log","$window",function(n,t,r,e){n.online=navigator.onLine,e.addEventListener("offline",function(){n.$apply(function(){n.online=!1})},!1),e.addEventListener("online",function(){n.$apply(function(){n.online=!0})},!1)}]),angular.module("app").constant("API",{version:"",port:"3000",protocol:"http",host:"localhost",prefix:"",get url(){return this.protocol+"://"+this.host+(this.port?":"+this.port:"")+"/"+this.prefix+(this.prefix?"/":"")+this.version+(this.version?"/":"")}}).constant("APP_VERSION","0.1.0"),angular.module("app").config(["$httpProvider",function(n){n.interceptors.push(["$q","$location","$log",function(n,t,r){return{request:function(t){return t||n.when(t)},response:function(t){return t||n.when(t)},responseError:function(t){return r.error("Failed with",t.status,"status"),n.reject(t)}}}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(n,t){n.state("login",{url:"/",controller:"LoginController",templateUrl:"app/views/login/login.tpl.html",title:"Login"}),t.otherwise("/")}]),angular.module("app").run(["$rootScope","$log","PageService",function(n,t,r){n.$on("$stateChangeStart",function(){}),n.$on("$stateChangeSuccess",function(){r.get()}),n.$on("$stateChangeError",function(){}),n.$on("$stateNotFound",function(){}),n.$on("$viewContentLoaded",function(){}),n.$log=t}]),angular.module("app").directive("a",function(){return{restrict:"E",link:function(n,t,r){(r.ngClick||""===r.href||"#"===r.href)&&t.on("click",function(n){n.preventDefault()})}}}),angular.module("app").directive("autoHeight",["$window",function(n){return{restrict:"A",link:function(t,r,e){var i=e.autoHeight&&t.$eval(e.autoHeight)||0,u=e.autoHeightFixed&&t.$eval(e.autoHeightFixed)||!1;_.isString(i)&&(i=0);var o=function(){var t=Math.abs(n.innerHeight-i);r.css("max-height",t),u&&r.css("min-height",t)};angular.element(n).bind("resize",function(){o()}),angular.element(document).ready(function(){o()})}}}]),angular.module("app").directive("loginRegisterContainer",function(){return{restrict:"A",link:function(){$(function(){$("#login-form-link").click(function(n){$("#login-form").delay(100).fadeIn(100),$("#register-form").fadeOut(100),$("#register-form-link").removeClass("active"),$(this).addClass("active"),n.preventDefault()}),$("#register-form-link").click(function(n){$("#register-form").delay(100).fadeIn(100),$("#login-form").fadeOut(100),$("#login-form-link").removeClass("active"),$(this).addClass("active"),n.preventDefault()})})}}}),angular.module("app").directive("scrollGlue",function(){return{priority:1,require:["?ngModel"],restrict:"A",link:function(n,t,r,e){function i(n){return{$setViewValue:function(n){this.$viewValue=n},$viewValue:n}}function u(){l.scrollTop=l.scrollHeight}function o(){l.scrollLeft=l.scrollWidth}function c(){return a?l.scrollLeft+l.clientWidth+1>=l.scrollWidth:l.scrollTop+l.clientHeight+1>=l.scrollHeight}var l=t[0],f=e[0]||i(!0),a=r.glueHorizontal||!1;n.$watch(function(){f.$viewValue&&(a?o():u())}),t.bind("scroll",function(){var t=c();t!==f.$viewValue&&n.$apply(f.$setViewValue.bind(f,t))})}}}),angular.module("app").factory("HelperService",["$filter",function(){return{DateHelper:{},TimeHelper:{},StringHelper:{},ObjectHelper:{},NumericHelper:{},ArrayHelper:{}}}]),angular.module("app").provider("PageService",function(){var n=null;return{setBaseTitle:function(t){n=t},$get:["$rootScope","$state",function(t,r){return{get:function(){r.is(r.current.name)&&(t.gPage={pageTitle:(n?n+" | ":"")+r.current.title,title:r.current.title,alias:r.current.alias,fullWidth:r.current.fullWidth||!1})}}}]}}),angular.module("app").provider("RESTful",function(){var n="",t=function(t,r){return r&&!_.isEmpty(r)&&(t+=-1===t.indexOf("?")?"?":"&",t+=jQuery.param(r)),n+t};return{setBaseUrl:function(t){n=t},$get:["$http","$q",function(n,r){return{get:function(e,i){var u=r.defer();return _.isString(e)||u.reject('"url" isn\'t a string.'),n.get(t(e,i)).success(function(n){u.resolve(n)}).error(function(n){u.reject(n)}),u.promise},post:function(e,i,u){var o=r.defer();return _.isString(e)||o.reject('"url" isn\'t a string.'),i&&_.isObject(i)||(i={}),n.post(t(e,u),i).success(function(n){o.resolve(n)}).error(function(n){o.reject(n)}),o.promise},put:function(e,i,u){var o=r.defer();return _.isString(e)||o.reject('"url" isn\'t a string.'),i&&_.isObject(i)||(i={}),n.put(t(e,u),i).success(function(n){o.resolve(n)}).error(function(n){o.reject(n)}),o.promise},"delete":function(e,i){var u=r.defer();return _.isString(e)||u.reject('"url" isn\'t a string.'),n.delete(t(e,i)).success(function(n){u.resolve(n)}).error(function(n){u.reject(n)}),u.promise}}}]}}),angular.module("app").filter("reverseArray",function(){return function(n){return n.slice().reverse()}}).filter("unique",function(){return function(n,t){var r=[],e=[];return angular.forEach(n,function(n){var i=n;t&&(i=n[t]),-1===e.indexOf(i)&&(e.push(i),(i||angular.isNumber(i)&&0===i)&&r.push(n))}),r}}),angular.module("app").filter("fraction",function(){return function(n){return Ratio.parse(n,!0).simplify().toQuantityOf(2,3,4,5,8,16,32,40).toLocaleString()}}),angular.module("app").filter("available",function(){return function(n,t){return t=t||""===t?t:"N/A",_.isString(n)&&(n=n.trim()),_.isNull(n)||_.isBlank(n)||_.isUndefined(n)?t:n}}).filter("conditional",function(){return function(n,t,r){var e=t||"Yes",i=r||"No";return n?e:i}}).filter("capitalize",function(){return function(n){return _.capitalize(n)}}).filter("decapitalize",function(){return function(n){return _.decapitalize(n)}}).filter("chop",function(){return function(n,t){return _.chop(n,t)}}).filter("clean",function(){return function(n){return _.clean(n)}}).filter("chars",function(){return function(n){return _.chars(n)}}).filter("swapCase",function(){return function(n){return _.swapCase(n)}}).filter("isInclude",function(){return function(n,t){return _.str.include(n,t)}}).filter("countSubstr",function(){return function(n,t){return t&&t.length?_.count(n,t):n.length}}).filter("escapeHTML",function(){return function(n){return _.escapeHTML(n)}}).filter("unescapeHTML",function(){return function(n){return _.unescapeHTML(n)}}).filter("insert",function(){return function(n,t,r){return _.insert(n,t,r)}}).filter("isBlank",function(){return function(n){return _.isBlank(n)}}).filter("joinBy",function(){return function(n,t){return(n||[]).join(t||", ")}}).filter("lines",function(){return function(n){return _.lines(n)}}).filter("reverseString",function(){return function(n){return _.str.reverse(n)}}).filter("spliceString",function(){return function(n,t,r,e){return _.splice(n,t,r,e)}}).filter("startsWith",function(){return function(n,t,r){return _.startsWith(n,t,r)}}).filter("endsWith",function(){return function(n,t,r){return _.endsWith(n,t,r)}}).filter("successor",function(){return function(n){return _.succ(n)}}).filter("titleize",function(){return function(n){return _.titleize(n)}}).filter("camelize",function(){return function(n){return _.camelize(n)}}).filter("classify",function(){return function(n){return _.classify(n)}}).filter("underscored",function(){return function(n){return _.underscored(n)}}).filter("dasherize",function(){return function(n){return _.dasherize(n)}}).filter("humanize",function(){return function(n){return _.humanize(n)}}).filter("trim",function(){return function(n,t){return _.trim(n,t)}}).filter("ltrim",function(){return function(n,t){return _.ltrim(n,t)}}).filter("rtrim",function(){return function(n,t){return _.rtrim(n,t)}}).filter("truncate",function(){return function(n,t,r){return _.truncate(n,t,r)}}).filter("prune",function(){return function(n,t,r){return _.prune(n,t,r)}}).filter("split",function(){return function(n,t){return _.words(n,t)}}).filter("pad",function(){return function(n,t,r,e){return _.pad(n,t,r,e)}}).filter("lpad",function(){return function(n,t,r){return _.lpad(n,t,r)}}).filter("rpad",function(){return function(n,t,r){return _.rpad(n,t,r)}}).filter("lrpad",function(){return function(n,t,r){return _.lrpad(n,t,r)}}).filter("strRight",function(){return function(n,t){return _.strRight(n,t)}}).filter("strRightBack",function(){return function(n,t){return _.strRightBack(n,t)}}).filter("strLeft",function(){return function(n,t){return _.strLeft(n,t)}}).filter("strLeftBack",function(){return function(n,t){return _.strLeftBack(n,t)}}).filter("stripTags",function(){return function(n){return _.stripTags(n)}}).filter("toSentence",function(){return function(n,t,r){return _.toSentence(n,t,r)}}).filter("toSentenceSerial",function(){return function(n,t,r){return _.toSentenceSerial(n,t,r)}}).filter("repeatString",function(){return function(n,t,r){return _.repeat(n,t,r)}}).filter("surround",function(){return function(n,t){return _.surround(n,t)}}).filter("quote",function(){return function(n,t){return _.quote(n,t)}}).filter("unquote",function(){return function(n,t){return _.unquote(n,t)}}).filter("slugify",function(){return function(n){return _.slugify(n)}}).filter("toBool",function(){return function(n){return _.toBool(n)}}),angular.module("app").controller("LoginController",["$scope",function(){console.log("From controller"),console.log("Another log from controller")}]);