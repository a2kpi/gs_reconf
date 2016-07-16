/**
 * Package www/header_utilisateur
 * jquery.noconflict
 * hogan
 * lmd/ui/header/header
 * lmd/ui/header/user-header
 * lmd/core/auth
 * lmd/core/conf
 * lmd/module/user/avatar
 * lib/jquery/plugin/jquery.spin
 * lmd/ui/auth/login
 * hoganpower!/partials/general/header/dropdown-inscrit.html.mu@www
 */

/* -- start module jquery.noconflict -- */
var jqyreu=jqyreu||{v:window.getElementsByClassName?"jquery":"jquery.fallback",j:window.$||window.jQuery};define("jquery.noconflict",[jqyreu.v],function($){var localjQuery=$.noConflict(true);window.$=window.jQuery=jqyreu.j;return localjQuery});

/* -- end module jquery.noconflict -- */
/* -- start module hogan -- */
var Hogan={};
(function(Hogan,useArrayBuffer){Hogan.Template=function(renderFunc,text,compiler,options){this.r=renderFunc||this.r;this.c=compiler;this.options=options;this.text=text||"";this.buf=useArrayBuffer?[]:""};Hogan.Template.prototype={r:function(context,partials,indent){return""},v:hoganEscape,t:coerceToString,render:function render(context,partials,indent){return this.ri([context],partials||{},indent)},ri:function(context,partials,indent){return this.r(context,partials,indent)},rp:function(name,context,
partials,indent){var partial=partials[name];if(!partial)return"";if(this.c&&typeof partial=="string")partial=this.c.compile(partial,this.options);return partial.ri(context,partials,indent)},rs:function(context,partials,section){var tail=context[context.length-1];if(!isArray(tail)){section(context,partials,this);return}for(var i=0;i<tail.length;i++){context.push(tail[i]);section(context,partials,this);context.pop()}},s:function(val,ctx,partials,inverted,start,end,tags){var pass;if(isArray(val)&&val.length===
0)return false;if(typeof val=="function")val=this.ls(val,ctx,partials,inverted,start,end,tags);pass=val===""||!!val;if(!inverted&&pass&&ctx)ctx.push(typeof val=="object"?val:ctx[ctx.length-1]);return pass},d:function(key,ctx,partials,returnFound){var names=key.split("."),val=this.f(names[0],ctx,partials,returnFound),cx=null;if(key==="."&&isArray(ctx[ctx.length-2]))return ctx[ctx.length-1];for(var i=1;i<names.length;i++)if(val&&typeof val=="object"&&names[i]in val){cx=val;val=val[names[i]]}else val=
"";if(returnFound&&!val)return false;if(!returnFound&&typeof val=="function"){ctx.push(cx);val=this.lv(val,ctx,partials);ctx.pop()}return val},f:function(key,ctx,partials,returnFound){var val=false,v=null,found=false;for(var i=ctx.length-1;i>=0;i--){v=ctx[i];if(v&&typeof v=="object"&&key in v){val=v[key];found=true;break}}if(!found)return returnFound?false:"";if(!returnFound&&typeof val=="function")val=this.lv(val,ctx,partials);return val},ho:function(val,cx,partials,text,tags){var compiler=this.c;
var options=this.options;options.delimiters=tags;var t=val.call(cx,text,function(t){return compiler.compile(t,options).render(cx,partials)});this.b(compiler.compile(t.toString(),options).render(cx,partials));return false},b:useArrayBuffer?function(s){this.buf.push(s)}:function(s){this.buf+=s},fl:useArrayBuffer?function(){var r=this.buf.join("");this.buf=[];return r}:function(){var r=this.buf;this.buf="";return r},ls:function(val,ctx,partials,inverted,start,end,tags){var cx=ctx[ctx.length-1],t=null;
if(!inverted&&this.c&&val.length>0)return this.ho(val,cx,partials,this.text.substring(start,end),tags);t=val.call(cx);if(typeof t=="function")if(inverted)return true;else if(this.c)return this.ho(t,cx,partials,this.text.substring(start,end),tags);return t},lv:function(val,ctx,partials){var cx=ctx[ctx.length-1];var result=val.call(cx);if(typeof result=="function")result=result.call(cx);result=coerceToString(result);if(this.c&&~result.indexOf("{{"))return this.c.compile(result,this.options).render(cx,
partials);return result}};var rAmp=/&/g,rLt=/</g,rGt=/>/g,rApos=/\'/g,rQuot=/\"/g,hChars=/[&<>\"\']/;function coerceToString(val){return String(val===null||val===undefined?"":val)}function hoganEscape(str){str=coerceToString(str);return hChars.test(str)?str.replace(rAmp,"&amp;").replace(rLt,"&lt;").replace(rGt,"&gt;").replace(rApos,"&#39;").replace(rQuot,"&quot;"):str}var isArray=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"}})(typeof exports!=="undefined"?
exports:Hogan);
(function(Hogan){var rIsWhitespace=/\S/,rQuot=/\"/g,rNewline=/\n/g,rCr=/\r/g,rSlash=/\\/g,tagTypes={"#":1,"^":2,"/":3,"!":4,">":5,"<":6,"=":7,"_v":8,"{":9,"&":10};Hogan.scan=function scan(text,delimiters){var len=text.length,IN_TEXT=0,IN_TAG_TYPE=1,IN_TAG=2,state=IN_TEXT,tagType=null,tag=null,buf="",tokens=[],seenTag=false,i=0,lineStart=0,otag="{{",ctag="}}";function addBuf(){if(buf.length>0){tokens.push(new String(buf));buf=""}}function lineIsWhitespace(){var isAllWhitespace=true;for(var j=lineStart;j<
tokens.length;j++){isAllWhitespace=tokens[j].tag&&tagTypes[tokens[j].tag]<tagTypes["_v"]||!tokens[j].tag&&tokens[j].match(rIsWhitespace)===null;if(!isAllWhitespace)return false}return isAllWhitespace}function filterLine(haveSeenTag,noNewLine){addBuf();if(haveSeenTag&&lineIsWhitespace())for(var j=lineStart,next;j<tokens.length;j++){if(!tokens[j].tag){if((next=tokens[j+1])&&next.tag==">")next.indent=tokens[j].toString();tokens.splice(j,1)}}else if(!noNewLine)tokens.push({tag:"\n"});seenTag=false;lineStart=
tokens.length}function changeDelimiters(text,index){var close="="+ctag,closeIndex=text.indexOf(close,index),delimiters=trim(text.substring(text.indexOf("=",index)+1,closeIndex)).split(" ");otag=delimiters[0];ctag=delimiters[1];return closeIndex+close.length-1}if(delimiters){delimiters=delimiters.split(" ");otag=delimiters[0];ctag=delimiters[1]}for(i=0;i<len;i++)if(state==IN_TEXT)if(tagChange(otag,text,i)){--i;addBuf();state=IN_TAG_TYPE}else if(text.charAt(i)=="\n")filterLine(seenTag);else buf+=text.charAt(i);
else if(state==IN_TAG_TYPE){i+=otag.length-1;tag=tagTypes[text.charAt(i+1)];tagType=tag?text.charAt(i+1):"_v";if(tagType=="="){i=changeDelimiters(text,i);state=IN_TEXT}else{if(tag)i++;state=IN_TAG}seenTag=i}else if(tagChange(ctag,text,i)){tokens.push({tag:tagType,n:trim(buf),otag:otag,ctag:ctag,i:tagType=="/"?seenTag-ctag.length:i+otag.length});buf="";i+=ctag.length-1;state=IN_TEXT;if(tagType=="{")if(ctag=="}}")i++;else cleanTripleStache(tokens[tokens.length-1])}else buf+=text.charAt(i);filterLine(seenTag,
true);return tokens};function cleanTripleStache(token){if(token.n.substr(token.n.length-1)==="}")token.n=token.n.substring(0,token.n.length-1)}function trim(s){if(s.trim)return s.trim();return s.replace(/^\s*|\s*$/g,"")}function tagChange(tag,text,index){if(text.charAt(index)!=tag.charAt(0))return false;for(var i=1,l=tag.length;i<l;i++)if(text.charAt(index+i)!=tag.charAt(i))return false;return true}function buildTree(tokens,kind,stack,customTags){var instructions=[],opener=null,token=null;while(tokens.length>
0){token=tokens.shift();if(token.tag=="#"||token.tag=="^"||isOpener(token,customTags)){stack.push(token);token.nodes=buildTree(tokens,token.tag,stack,customTags);instructions.push(token)}else if(token.tag=="/"){if(stack.length===0)throw new Error("Closing tag without opener: /"+token.n);opener=stack.pop();if(token.n!=opener.n&&!isCloser(token.n,opener.n,customTags))throw new Error("Nesting error: "+opener.n+" vs. "+token.n);opener.end=token.i;return instructions}else instructions.push(token)}if(stack.length>
0)throw new Error("missing closing tag: "+stack.pop().n);return instructions}function isOpener(token,tags){for(var i=0,l=tags.length;i<l;i++)if(tags[i].o==token.n){token.tag="#";return true}}function isCloser(close,open,tags){for(var i=0,l=tags.length;i<l;i++)if(tags[i].c==close&&tags[i].o==open)return true}function writeCode(tree){return'var _=this;_.b(i=i||"");'+walk(tree)+"return _.fl();"}Hogan.generate=function(code,text,options){if(options.asString)return"function(c,p,i){"+code+";}";return new Hogan.Template(new Function("c",
"p","i",code),text,Hogan,options)};function esc(s){return s.replace(rSlash,"\\\\").replace(rQuot,'\\"').replace(rNewline,"\\n").replace(rCr,"\\r")}function chooseMethod(s){return~s.indexOf(".")?"d":"f"}function walk(tree){var code="";for(var i=0,l=tree.length;i<l;i++){var tag=tree[i].tag;if(tag=="#")code+=section(tree[i].nodes,tree[i].n,chooseMethod(tree[i].n),tree[i].i,tree[i].end,tree[i].otag+" "+tree[i].ctag);else if(tag=="^")code+=invertedSection(tree[i].nodes,tree[i].n,chooseMethod(tree[i].n));
else if(tag=="<"||tag==">")code+=partial(tree[i]);else if(tag=="{"||tag=="&")code+=tripleStache(tree[i].n,chooseMethod(tree[i].n));else if(tag=="\n")code+=text('"\\n"'+(tree.length-1==i?"":" + i"));else if(tag=="_v")code+=variable(tree[i].n,chooseMethod(tree[i].n));else if(tag===undefined)code+=text('"'+esc(tree[i])+'"')}return code}function section(nodes,id,method,start,end,tags){return"if(_.s(_."+method+'("'+esc(id)+'",c,p,1),'+"c,p,0,"+start+","+end+',"'+tags+'")){'+"_.rs(c,p,"+"function(c,p,_){"+
walk(nodes)+"});c.pop();}"}function invertedSection(nodes,id,method){return"if(!_.s(_."+method+'("'+esc(id)+'",c,p,1),c,p,1,0,0,"")){'+walk(nodes)+"};"}function partial(tok){return'_.b(_.rp("'+esc(tok.n)+'",c,p,"'+(tok.indent||"")+'"));'}function tripleStache(id,method){return"_.b(_.t(_."+method+'("'+esc(id)+'",c,p,0)));'}function variable(id,method){return"_.b(_.v(_."+method+'("'+esc(id)+'",c,p,0)));'}function text(id){return"_.b("+id+");"}Hogan.parse=function(tokens,text,options){options=options||
{};return buildTree(tokens,"",[],options.sectionTags||[])},Hogan.cache={};Hogan.compile=function(text,options){options=options||{};var key=text+"||"+!!options.asString;var t=this.cache[key];if(t)return t;t=this.generate(writeCode(this.parse(this.scan(text,options.delimiters),text,options)),text,options);return this.cache[key]=t}})(typeof exports!=="undefined"?exports:Hogan);define("hogan",Hogan);

/* -- end module hogan -- */
/* -- start module lmd/ui/header/header -- */
define("lmd/ui/header/header",["jquery","lmd/core/conf","lmd/core/auth","lmd/ui/auth/login"],function($,conf,auth,login){return{exportMode:false,init:function(){this.initSearch();this.initOffline();this.initUser();this.initAbonnesLinks()},initSearch:function(){$("#header_utilisateur .recherche [name=token]").val(window.btoa(Math.round((new Date).getTime()/1E3)+conf.search_hash))},initOffline:function(){if(auth.authenticated===true)return;login.init();$(".trigger_boite_login").on("click",function(event){event.preventDefault();
login.open()})},initUser:function(){if(auth.authenticated===false)return;var k=this;require(["lmd/ui/header/user-header"],function(userHeader){userHeader.exportMode=k.exportMode;userHeader.init()})},initAbonnesLinks:function(){if(!auth.user)auth.loadUser();if(auth.authenticated===false||auth.user&&auth.user.abonne===false)return;var link=$("<a></a>").addClass("lien_edito").html("Le Monde Festival").attr("href","/festival/");$(".conteneur_haut","#surheader").append(link)}}});

/* -- end module lmd/ui/header/header -- */
/* -- start module lmd/ui/header/user-header -- */
define("lmd/ui/header/user-header",["jquery","hogan","lmd/core/auth","lmd/core/conf","lmd/module/user/avatar","hoganpower!/partials/general/header/dropdown-inscrit.html.mu@www"],function lmdUiHeaderUserHeader($,hogan,auth,conf,avatar,_dropdown){if(!auth.authenticated)return{};var user_area,user_area_avatar,user_area_name,user_area_blog,_tpl_elements_compte,$elements_compte,tag,tagged_already,displayAvatar,displayName,displayBlog,displayForecast,initDomEls,tagDomBody,placeholder_recherche_abo="Rechercher dans nos articles, archives depuis 1944";
tagDomBody=function(){if(typeof tag==="string")return;tag=document.body.className;tagged_already=tag.match(/app_abonnes/);tagged_already=tagged_already&&tag.match(/abonnes/);document.body.className=[tag,auth.user.abonne?!tagged_already?"app_abonnes":"":"app_inscrit"].join(" ")};initDomEls=function(){var hostname_url;if(auth.user.abonne){user_area=document.getElementById("surheader_abonne").querySelectorAll(".compte")[0];user_area_avatar=user_area.getElementsByTagName("img")[0];user_area_name=user_area.querySelectorAll(".nom")[0];
user_area_blog=user_area.querySelectorAll(".user_blog")[0]}else if(auth.user.type==="inscrit"){hostname_url=[window.location.protocol,"//",lmd.conf.www.location.hostname].join("");$elements_compte=$(_dropdown.render({hostname:hostname_url,base_url_version:conf.medias.location.base_url_version}));user_area=document.getElementById("header_utilisateur");user_area_avatar=$elements_compte.find("img").get(0);user_area_name=$elements_compte.find(".nom").get(0)}};if(auth.user&&auth.user.type){initDomEls();
tagDomBody();initDomEls=function(){return}}displayAvatar=function(){var options={width:user_area_avatar.width,height:user_area_avatar.height};avatar.get(options).done(function avatarGetCallback(url){if(url)user_area_avatar.src=url})};displayName=function(){auth.loadUser().done(function(){var matricule="";auth.user.nom=auth.user.nom||"Bonjour";matricule=auth.user.prenom?[auth.getUserFirstNameInitials(),auth.user.nom].join("&nbsp;"):auth.user.nom;user_area_name.innerHTML=matricule})};var displayJournalist=
function(){var journalist=document.getElementById("js-journalist-page");var style="none";var dataIn={"mode":"detecter"};var json="params="+JSON.stringify(dataIn);$.ajax({url:"api/1/user/journaliste/",dataType:"json",data:json,success:function(data){if(data.journaliste==="succes")style="inline";journalist.style.display=style}})};displayBlog=function(){auth.majServices().done(function authMajServicesCallback(){if(typeof auth.user.blog!=="undefined"&&auth.user.blog!==null&&typeof auth.user.blog.admin_url!==
"undefined"&&auth.user.blog.admin_url!==null)user_area_blog.href=auth.user.blog.admin_url})};return{exportMode:false,init:function(){var self=this;auth.loadUser().done(function authLoadUserCallback(){initDomEls();tagDomBody();if(typeof auth.user.abonne==="undefined"||!auth.user.abonne)$(".js_identifiant",user_area).append($elements_compte).show();displayAvatar();displayName();displayBlog();displayJournalist();$("#bouton_deconnexion").on("click",function boutonDeconnexionEvent(){return self.disconnect()});
user_area.style.visibility="visible";if(auth.user.abonne)document.forms.recherche.keywords.setAttribute("placeholder",placeholder_recherche_abo)})},refreshUserInfo:function(){var self=this;auth.loadUser(true).done(function refreshUserInfoCallback(){displayAvatar();displayName();displayBlog()})},tagDomBody:tagDomBody,disconnect:function(){if(auth.authenticated)auth.clearCache();return true}}});

/* -- end module lmd/ui/header/user-header -- */
/* -- start module lmd/core/auth -- */
define("lmd/core/auth",["jquery","lmd/core/storage","lib/jquery/plugin/jquery.cookie","lmd/core/service"],function($,storage,jqueryCookie,service){var storageKeys={user:"user",journalist:"journalistes",newsletters:"user_newsletters"};function getUserFromStorage(){var userData=storage.get(storageKeys.user);if(!userData)return null;if(userData.user)return userData.user;if(userData.id){auth.user=userData;auth._putInCache();return userData}return null}var auth={NEWSLETTERS_STORAGE_KEY:storageKeys.newsletters,COOKIE_USER_ID:"tdb_user_id",
COOKIE_NEW_USER_ID:"lmd_a_s",COOKIE_NEW_USER_MAIL:"lmd_a_m",COOKIE_ALM:"alm",COOKIE_WORDPRESS:"wordpress_domain",COOKIE_EDUCATION:"educ_partenaires",user:null,_loadUserDeferred:null,_loadUserServicesDeferred:null,authenticated:false,checkAuthentication:function(){this.authenticated=$.cookie(this.COOKIE_USER_ID)!==null||$.cookie(this.COOKIE_NEW_USER_MAIL)!==null;if(this.authenticated===false)this.clearCache();return this.authenticated},refresh:function(){return this.loadUser(true)},update:function(){this._putInCache()},
login:function(params,jsonp){var settings={};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/login",1,params,settings)},register:function(params,jsonp){var settings={};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/register",1,params,settings)},confirm:function(params,jsonp){var settings={};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/confirmation",1,params,settings)},resetPassword:function(params,jsonp){var settings=
{};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/password/reset",1,params,settings)},changePassword:function(params,jsonp){var settings={};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/password/change",1,params,settings)},logout:function(){this.clearCache();return service.get("auth/logout",1,null,{dataType:"jsonp"}).done($.proxy(this.clearCache,this))},loadUser:function(refresh){var firstLoad=false;if(this._loadUserDeferred===null||
refresh){this._loadUserDeferred=$.Deferred();firstLoad=true}if(this._loadUserServicesDeferred===null||refresh)this._loadUserServicesDeferred=$.Deferred();if($.cookie(this.COOKIE_USER_ID)===null&&$.cookie(this.COOKIE_NEW_USER_MAIL)!==null)var xhr=service.get("auth/legacy/sso",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserLegacyCallback,this));this.checkAuthentication();if(this.authenticated&&(firstLoad||refresh)){if(storage.isSupported&&!refresh){var user=getUserFromStorage();if(user!==null){var userId=
this._getUserIdAlm();if(user.id==userId||userId===null){user.newId=this._getNewUserId();this.user=user;this._loadUserDeferred.resolve();if(!$.cookie(this.COOKIE_WORDPRESS)&&auth.user.services.indexOf("blog"))this.majServices(true);else this._loadUserServicesDeferred.resolve();return this._loadUserDeferred.promise()}}}var xhr=service.get("auth/user",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserCallback,this));var xhr=service.get("auth/majServices",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserServicesCallback,
this))}if(!this.authenticated){this._loadUserDeferred.resolve();this._loadUserServicesDeferred.resolve()}return this._loadUserDeferred.promise()},majServices:function(refresh){if(refresh)var xhr=service.get("auth/majServices",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserServicesCallback,this));else{this.loadUser(refresh);return this._loadUserServicesDeferred.promise()}},clearCache:function(){storage.remove(storageKeys.user);storage.remove(storageKeys.journalist);storage.remove(storageKeys.newsletters)},
isUserEducation:function(){return this.checkAuthentication()&&$.cookie(this.COOKIE_EDUCATION)},getUserFirstNameInitials:function(){if(!this.user||!this.user.prenom)return"";else return this.user.prenom.split(/(-| )/).map(function(namePart){return namePart.length>1?namePart.charAt(0)+".":namePart}).join("").replace(" "," ")},_getUserIdAlm:function(){var cookieAlm=$.cookie(this.COOKIE_ALM);if(cookieAlm===null)return null;var tab=cookieAlm.split("-");if(tab.length>2)return parseInt(tab[tab.length-2]);
else return null},_getNewUserId:function(){return $.cookie(this.COOKIE_NEW_USER_ID)},_loadUserLegacyCallback:function(data){if(typeof data==="object"&&data.result)window.location.reload()},_loadUserCallback:function(data){if(typeof data==="object"&&typeof data.user==="object"){data.user.newId=this._getNewUserId();this.user=data.user;this._putInCache();this._loadUserDeferred.resolve()}else this._loadUserDeferred.reject()},_loadUserServicesCallback:function(data){if(typeof data==="object"&&data.succes)this._loadUserServicesDeferred.resolve();
else this._loadUserServicesDeferred.reject()},_putInCache:function(){if(storage.isSupported)storage.set(storageKeys.user,{user:this.user},18E5,false)}};auth.authenticated=auth.checkAuthentication();return auth});

/* -- end module lmd/core/auth -- */
/* -- start module lmd/core/conf -- */
define("lmd/core/conf",function(){if(typeof lmd==="undefined"||typeof lmd.conf==="undefined")return null;var matches,f=function(o,p){var i;if(typeof o.hostname!=="undefined"){o.domain=o.hostname.match(/[\-\w]+\.fr$/);o.domain=o.domain?o.domain[0]:"";p.app=o.hostname.match(/([\-\w]+)\.[\-\w]+\.fr$/);p.app=p.app?p.app[1]:""}for(i in o)if(typeof o[i]==="object")f(o[i],o)};f(lmd.conf);matches=window.location.hostname.match(/\.?([\-a-z]+[^\-org])(-org)?\.lemonde[\-a-z]*\.fr$/);lmd.conf.current=lmd.conf.www;if(matches&&
typeof lmd.conf[matches[1]]==="object")lmd.conf.current=lmd.conf[matches[1]];lmd.conf.search_hash="2139JDJ12J3";return lmd.conf});

/* -- end module lmd/core/conf -- */
/* -- start module lmd/module/user/avatar -- */
define("lmd/module/user/avatar",["jquery","lmd/core/auth","lmd/core/service"],function($,auth,service){return{get:function(options){if(typeof options==="undefined")options={width:32,height:32,refresh:false};var defer=$.Deferred();auth.loadUser(options.refresh).done(function(){var size=options.width+"x"+options.height;if(typeof auth.user.avatar!=="undefined"&&typeof auth.user.avatar[size]!=="undefined"&&typeof auth.user.avatar[size].src!=="undefined")defer.resolve(auth.user.avatar[size].src);else{if(typeof auth.user.avatar_id===
"undefined"||auth.user.avatar_id===null)defer.resolve(false);var data={id:auth.user.avatar_id,hdpi:typeof window.devicePixelRatio!=="undefined"&&window.devicePixelRatio>1.5,width:0,height:0};$.extend(data,options);service.get("illustration",1,data,{dataType:"jsonp"}).done(function(data){if(typeof data.src!=="undefined"){defer.resolve(data.src);if(typeof auth.user.avatar==="undefined")auth.user.avatar={};auth.user.avatar[size]={src:data.src};auth.update()}})}});return defer.promise()}}});

/* -- end module lmd/module/user/avatar -- */
/* -- start module lib/jquery/plugin/jquery.spin -- */
define("lib/jquery/plugin/jquery.spin",["jquery"],function(jQuery){(function(a,b,c){function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function j(a,
b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=0.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+0.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1);return g}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=
c[e];return d}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");h(b.getElementsByTagName("head")[0],a);return a.sheet||a.styleSheet}(),o=function r(a){if(!this.spin)return new r(a);this.opts=m(a||{},r.defaults,p)},p=o.defaults={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:0.25,fps:20},q=o.prototype={spin:function(a){this.stop();var b=this,c=b.el=l(g(),{position:"relative"}),d,e;a&&(a.insertBefore(c,a.firstChild||null),e=n(a),d=n(c),l(c,{left:(a.offsetWidth>>
1)-d.x+e.x+"px",top:(a.offsetHeight>>1)-d.y+e.y+"px"})),c.setAttribute("aria-role","progressbar"),b.lines(c,b.opts);if(!f){var h=b.opts,i=0,j=h.fps,k=j/h.speed,m=(1-h.opacity)/(k*h.trail/100),o=k/h.lines;(function p(){i++;for(var a=h.lines;a;a--){var d=Math.max(1-(i+a*o)%k*m,h.opacity);b.opacity(c,h.lines-a,d,h)}b.timeout=b.el&&setTimeout(p,~~(1E3/j))})()}return b},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c);return this}};q.lines=
function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&
h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},q.opacity=function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)},function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");q.lines=function(a,b){function k(a,d,i){h(f,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,
height:b.width,left:b.radius,top:-b.width>>1,filter:i}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+-c}),{width:d,height:d})}var c=b.length+b.width,d=2*c,f=e(),i=~(b.length+b.radius+b.width)+"px",j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(l(a,{margin:i+" 0 0 "+i,zoom:1}),f)},q.opacity=
function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}else f=k(a,"animation")}(),a.Spinner=o})(window,document);(function($){$.fn.spin=function(options){var width,height,left,top;return this.each(function(){var spinBlock=$("<div></div>"),hgt=$(this).height(),hgt_ok=parseInt(hgt)>40?hgt:40;spinBlock.removeAttr("id");spinBlock.removeAttr("class");spinBlock.height(hgt_ok);spinBlock.width($(this).width());
spinBlock.addClass("spin-block");spinBlock.css("padding-top",$(this).css("padding-top"));spinBlock.css("padding-right",$(this).css("padding-right"));spinBlock.css("padding-bottom",$(this).css("padding-bottom"));spinBlock.css("padding-left",$(this).css("padding-left"));spinBlock.css("margin-top",$(this).css("margin-top"));spinBlock.css("margin-right",$(this).css("margin-right"));spinBlock.css("margin-bottom",$(this).css("margin-bottom"));spinBlock.css("margin-left",$(this).css("margin-left"));$(this).hide();
var spRadius=10,spWidth=4,spLength=7,spLines=14,spSpeed=1.9,spColor="#464F57";if(options){if(typeof options.height!="undefined")spinBlock.height(options.height);if(typeof options.width!="undefined")spinBlock.css("width",options.width);if(typeof options.spRadius!="undefined")spRadius=options.spRadius;if(typeof options.spWidth!="undefined")spWidth=options.spWidth;if(typeof options.spLength!="undefined")spLength=options.spLength;if(typeof options.spLines!="undefined")spLines=options.spLines;if(typeof options.spSpeed!=
"undefined")spSpeed=options.spSpeed;if(typeof options.spColor!="undefined")spColor=options.spColor}var data=$(this).data();if(typeof data==="undefined"||data===null||!data)return false;data.spinBlock=spinBlock;var spinnerOpts={lines:spLines,length:spLength,width:spWidth,radius:spRadius,color:spColor,speed:spSpeed,trail:60,shadow:false,hwaccel:false};data.spinner=(new Spinner(spinnerOpts)).spin(spinBlock.get(0));data.$spinner=$(data.spinner.el);$(data.spinner.el).css("left",spinBlock.width()/2);$(data.spinner.el).css("top",
spinBlock.height()/2);$(this).after(spinBlock)})};$.fn.unspin=function(){return this.each(function(){var data=$(this).data();if(typeof data.spinBlock!="undefined"&&typeof data.spinBlock.processed==="undefined"){data.spinBlock.hide();$(this).fadeIn();data.spinBlock.processed=true}})}})(jQuery);return jQuery.fn.unspin});

/* -- end module lib/jquery/plugin/jquery.spin -- */
/* -- start module lmd/ui/auth/login -- */
define("lmd/ui/auth/login",["jquery","lib/jquery/plugin/jquery.spin","hogan","lmd/core/conf","lmd/core/auth","lmd/ui/lightbox","hoganpower!/templates/module/user/login.html.mu@www"],function($,jquerySpin,hogan,conf,auth,Lightbox,template){return{initialized:false,init:function(){if(this.initialized===true)return;var k=this;this.$box=$(template.render({conf:conf}));this.initialized=true},open:function(options){var k=this;this.lightbox=new Lightbox({width:770,height:288,button:".close-lightbox",wrapper:".lightbox_ext"});
this.init();if(this.$box.is(":visible"))return;this.lightbox.open(this.$box);this.$box.find("input").on("change",function(){$(this).removeClass("saisie_erreur")});this.$box.find(".trigger_password_recover").on("click",function(){k.showRecoverPasswordForm();return false});this.$box.find(".form_back").on("click",function(){k.showMainForm();return false});this.$box.find("#login_form").on("submit",$.proxy(this.onSubmitMainForm,this));this.$box.find("#rmdp_form_form").on("submit",$.proxy(this.onSubmitRecoverPasswordForm,
this));this.$box.find("#loginbox_email").focus();if(typeof options!=="undefined"&&typeof options.loginSuccessCallback==="function")this.loginSuccessCallback=options.loginSuccessCallback},setRedirectUrl:function(url){this.init();this.$box.find("[name=url]").val(url)},setRedirectUrlAbonne:function(url){this.init();this.$box.find("[name=url_zop]").val(url)},getRedirectUrl:function(url){this.init();return this.$box.find("[name=url]").val()},getRedirectUrlAbonne:function(url){this.init();return this.$box.find("[name=url_zop]").val()},
close:function(){this.lightbox.close()},showRecoverPasswordForm:function(){this.$box.find("#fenetre_1").hide();this.$box.find("#password_recover_box").show()},showMainForm:function(){this.$box.find("#password_recover_box").hide();this.$box.find("#fenetre_1").show()},showErrorMainForm:function(type,message){this.$box.find(".txt_erreur").hide();if(type==="not-filled")this.$box.find(".login_error_not_filled").css("display","block");else if(type==="auth")this.$box.find(".login_error_auth").css("display",
"block")},onSubmitMainForm:function(event){var $form=this.$box.find("#login_form"),$email=$form.find("[name=mail]"),$password=$form.find("[name=passe]"),$keepConnection=$form.find("[name=sauv_login]");if($password.val().length>3&&$email.val().length>0){this.$box.find("#login_form").spin();auth.login({login:$email.val(),password:$password.val(),remember:$keepConnection.is(":checked")},true).then($.proxy(this.loginSuccess,this),$.proxy(this.loginFail,this))}else{$email.addClass("saisie_erreur");$password.addClass("saisie_erreur");
this.showErrorMainForm("not-filled")}return false},loginSuccess:function(data){if(typeof this.loginSuccessCallback==="function")this.loginSuccessCallback.call(this,data);var k=this;auth.loadUser(true).done(function(){var urlName="url",abonne=false;if(auth.user&&typeof auth.user.abonne==="boolean"&&auth.user.abonne===true){urlName="url_zop";abonne=auth.user.abonne}var redirectUrl=k.$box.find("[name="+urlName+"]").val();if(redirectUrl=="")redirectUrl=window.location.href;k.$box.find(".erreur").hide();
k.$box.find("#login_form").unspin();k.lightbox.close();if(window.location.href===redirectUrl)window.location.reload();else window.location.href=redirectUrl})},loginFail:function(data){this.showErrorMainForm("auth");this.$box.find("#login_form").unspin()},onSubmitRecoverPasswordForm:function(event){var recoverPasswordUrl="http://"+conf.www.location.hostname+"/api/1/user/retrouver_mdp/",$form=this.$box.find("#rmdp_form_form"),$email=$form.find("[name=email]");if($email.val().length===0){$email.addClass("saisie_erreur");
return false}var data="params="+JSON.stringify({mode:"retrouver",email:$email.val()});$form.find("[type=submit]").attr("disabled","disabled");$.ajax({url:recoverPasswordUrl,type:"get",dataType:"jsonp",data:data}).then($.proxy(this.recoverPasswordSuccess,this),$.proxy(this.recoverPasswordFail,this));return false},recoverPasswordSuccess:function(data){if(typeof data==="object"&&typeof data.exception!=="undefined")return this.recoverPasswordFail(data);this.$box.find("#rmdp_ro_email").html(this.$box.find("#password_recover_box_email").val());
this.$box.find("#password_recover_box .rmdp_confirm").show();this.$box.find("#password_recover_box [type=submit]").removeAttr("disabled")},recoverPasswordFail:function(data){this.$box.find("#password_recover_box .alerte").show();this.$box.find("#password_recover_box [type=submit]").removeAttr("disabled")}}});

/* -- end module lmd/ui/auth/login -- */
/* -- module hoganpower!/partials/general/header/dropdown-inscrit.html.mu@www not found -- */