(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{ORKo:function(t,e,n){"use strict";n.r(e);var i=n("TYT/"),o=n("PCNd"),c=n("toez"),r=function(){function t(){}return t.prototype.previous=function(){},t.prototype.next=function(){},t.prototype.minimalize=function(){},t.prototype.fullscreen=function(){},t.prototype.play=function(t){if(!this._actualPreview){if(!t)throw new Error("Nieje mo\u017en\xe9 vytvori\u0165 pesni\u010dku bez URL");this._actualPreview=new Audio(t)}return t&&this._actualPreview.currentSrc!==t&&(this._actualPreview.src=t),this._actualPreview.play(),Promise.resolve(null)},t.prototype.pause=function(){this._actualPreview&&this._actualPreview.pause()},t.prototype.stop=function(){this._actualPreview&&this._actualPreview.pause(),this._actualPreview=null},t.prototype.getDuration=function(){return Number(this._actualPreview&&this._actualPreview.duration)},t.prototype.getCurrentTime=function(){return Number(this._actualPreview&&this._actualPreview.currentTime)},t.prototype.setCurrentTime=function(t){this._actualPreview&&(this._actualPreview.currentTime=t)},t}(),a=function(){function t(){}return t.prototype.previous=function(){},t.prototype.next=function(){},t.prototype.minimalize=function(){},t.prototype.fullscreen=function(){},t.prototype.play=function(t){return Promise.resolve()},t.prototype.pause=function(){},t.prototype.stop=function(){},t.prototype.getDuration=function(){return 0},t.prototype.getCurrentTime=function(){return 0},t.prototype.setCurrentTime=function(t){},t}(),s=n("Valr"),l=["id","footer",3,"ngClass"],p=["id","controls"],u=["id","back",1,"fa","fa-step-backward",3,"click"],d=["id","pause",1,"fa","fa-pause",3,"hidden","click"],g=["id","play",1,"fa","fa-play",3,"hidden","click"],f=["id","stop",1,"fa","fa-stop",3,"click"],h=["id","next",1,"fa","fa-step-forward",3,"click"],y=["id","minimalize",1,"fa","fa-window-minimize",3,"click"],m=["id","fullscreen",1,"fa","fa-arrows-alt",3,"click"],v=["id","button"],_=["id","slider"],b=["step","0.1","type","range",3,"max","value","change"],P=["d",""],w=["id","timeHolder"],k=["id","actTime"],x=["id","duration"],C=function(t){return{isPlaying:t}},O=function(){function t(){this.isPlaying=!1,this.isPaused=!1,this.duration="00:00",this.numberDuration=0,this.elapsedValue=0,this.actDuration="00:00",this.previewPlayer=new r,this.youtubePlayer=new a}return t.prototype.ngOnInit=function(){},t.prototype.playPreview=function(t){var e=this;this.player=this.previewPlayer,this.youtubePlayer.stop(),this.previewPlayer.play(t).then(function(){e.duration=c.TimeUtils.getStringFromSeconds(parseInt(e.previewPlayer.getDuration().toString(),10)),e._startPlaying()})},t.prototype.playFrom=function(t){this.player.setCurrentTime(t),this.elapsedValue=this.player.getCurrentTime(),this.actDuration=c.TimeUtils.getStringFromSeconds(parseInt(this.elapsedValue.toString(),10)),this.player.play()},t.prototype.pausePreview=function(){this.previewPlayer.pause(),this._changeState("pause")},t.prototype.play=function(){var t=this;this.player.play().then(function(){return t._startPlaying()})},t.prototype.pause=function(){var t=document.getElementsByClassName("playing")[0];t&&(t.classList.remove("playing"),t.innerText="Play"),this.player.pause(),this._changeState("pause")},t.prototype.stop=function(){this.player.stop(),this._changeState("stop")},t.prototype._startPlaying=function(){var t=this;this._changeState("play"),this.actDuration="00:00",this.numberDuration=this.player.getDuration(),this._interval=setInterval(function(){t.elapsedValue=t.player.getCurrentTime(),t.actDuration=c.TimeUtils.getStringFromSeconds(parseInt(t.elapsedValue.toString(),10))},1e3)},t.prototype._changeState=function(t){switch(t){case"play":this.isPaused=!1,this.isPlaying=!0;break;case"pause":this.isPaused=!0,this.isPlaying=!1;break;case"stop":this.isPaused=!1,this.isPlaying=!1}},t.ngComponentDef=i.Rb({type:t,selectors:[["songs-nav-bar"]],factory:function(e){return new(e||t)},consts:19,vars:9,template:function(t,e){if(1&t){var n=i.fc();i.ec(0,"div",l),i.ec(1,"div",p),i.ec(2,"i",u),i.kc("click",function(t){return e.player.previous()}),i.cc(),i.ec(3,"i",d),i.kc("click",function(t){return e.pause()}),i.cc(),i.ec(4,"i",g),i.kc("click",function(t){return e.play()}),i.cc(),i.ec(5,"i",f),i.kc("click",function(t){return e.stop()}),i.cc(),i.ec(6,"i",h),i.kc("click",function(t){return e.player.next()}),i.cc(),i.ec(7,"i",y),i.kc("click",function(t){return e.player.minimalize()}),i.cc(),i.ec(8,"i",m),i.kc("click",function(t){return e.player.fullscreen()}),i.cc(),i.cc(),i.ec(9,"div",v),i.ec(10,"span",_),i.ec(11,"input",b,P),i.kc("change",function(t){i.Dc(n);var o=i.Bc(12);return e.playFrom(o.value)}),i.cc(),i.cc(),i.ec(13,"div",w),i.ec(14,"span",k),i.Qc(15),i.cc(),i.Qc(16,"/ "),i.ec(17,"span",x),i.Qc(18),i.cc(),i.cc(),i.cc(),i.cc()}2&t&&(i.vc("ngClass",i.yc(7,C,e.isPlaying||e.isPaused)),i.Gc(3),i.vc("hidden",!e.isPlaying),i.Gc(4),i.vc("hidden",e.isPlaying),i.Gc(11),i.wc("max",e.numberDuration),i.wc("value",e.elapsedValue),i.Gc(15),i.Rc(e.actDuration),i.Gc(18),i.Rc(e.duration))},directives:[s.i],styles:["#footer[_ngcontent-%COMP%]{position:fixed;width:100%;height:60px;background-color:#e6fdfd;transition:all .5s;bottom:-60px}#footer.isPlaying[_ngcontent-%COMP%]{bottom:0}#controls[_ngcontent-%COMP%]{position:relative;width:250px;float:right;line-height:60px;text-align:center;height:100%}#controls[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:21px;background-color:#89e399;width:30px;cursor:pointer;border-radius:59px;height:30px;text-align:center;line-height:30px}#controls[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{background-color:#6fbb7c}#button[_ngcontent-%COMP%]{width:calc(70% - 50px);float:right;line-height:72px;height:100%}#slider[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:calc(100% - 120px)}#timeHolder[_ngcontent-%COMP%]{display:inline-block;font-size:19px}#fileName[_ngcontent-%COMP%]{width:calc(30% - 200px);float:right;height:100%}"]}),t}(),M=n("mrSG"),S=n("9Z1F"),L=n("aR35"),I=n("QNcV"),B=n("o0vB"),T=n("9nlD"),D=n("cUzu"),Q=L.a.BASE_URL+"/songs",R=function(t){function e(e,n,i){return t.call(this,e,n,i)||this}return Object(M.__extends)(e,t),e.prototype.getSongs=function(){return this.http.get(Q+"/list").pipe(Object(S.a)(this.handleError("getSongs")))},e.ngInjectableDef=i.Tb({token:e,factory:function(t){return new(t||e)(i.ic(D.c),i.ic(I.a),i.ic(T.a))},providedIn:"root"}),e}(B.a),V=n("2mMm"),z=[1,"controller-wrapper"],N=[1,"time"],E=[1,"controlls"],F=["mat-icon-button","",3,"click"],j=[1,"pause","material-icons"],G=[1,"play","material-icons"],A=function(){function t(){this.audio=new Audio,this.time=0}return Object.defineProperty(t.prototype,"url",{set:function(t){this.audio.src=t},enumerable:!0,configurable:!0}),t.prototype.ngOnInit=function(){},t.prototype.pause=function(){this.audio.pause(),this.audio.ontimeupdate=null},t.prototype.play=function(){var t=this;this.audio.play(),this.audio.ontimeupdate=function(){return t.time=t.audio.currentTime}},t.ngComponentDef=i.Rb({type:t,selectors:[["app-song-controller"]],factory:function(e){return new(e||t)},inputs:{url:"url"},consts:12,vars:1,template:function(t,e){1&t&&(i.ec(0,"p"),i.Qc(1,"song-controller works!"),i.cc(),i.ec(2,"div",z),i.ec(3,"div",N),i.Qc(4),i.cc(),i.ec(5,"div",E),i.ec(6,"button",F),i.kc("click",function(t){return e.pause()}),i.ec(7,"i",j),i.Qc(8," pause_circle_filled "),i.cc(),i.cc(),i.ec(9,"button",F),i.kc("click",function(t){return e.play()}),i.ec(10,"i",G),i.Qc(11," play_arrow "),i.cc(),i.cc(),i.cc(),i.cc()),2&t&&(i.Gc(4),i.Sc(" ",e.time+"/"+e.audio.duration," "))},directives:[V.a],styles:[".controller-wrapper[_ngcontent-%COMP%]{background:red;width:100%;max-height:50px;min-height:25px}"]}),t}(),U=[3,"url"],Y=["id","sideBar"],q=["boder","1","id","songList",1,"ui","selectable","celled","table","compact","striped"],H=[4,"ngFor","ngForOf"],J=["id","modal",2,"display","none",3,"click"],X=["id","modalContent"],K=["id","player"];function Z(t,e){if(1&t&&(i.ec(0,"th"),i.Qc(1),i.cc()),2&t){var n=e.$implicit;i.Gc(1),i.Rc(n)}}var W=[3,"href"],tt=[1,"ui","green","mini","button",3,"disabled","click"],et=["b",""];function nt(t,e){if(1&t){var n=i.fc();i.ec(0,"tr"),i.ec(1,"td"),i.Qc(2),i.cc(),i.ec(3,"td"),i.Qc(4),i.cc(),i.ec(5,"td"),i.ec(6,"a",W),i.Qc(7),i.cc(),i.cc(),i.ec(8,"td"),i.Qc(9),i.cc(),i.ec(10,"td"),i.Qc(11),i.cc(),i.ec(12,"td"),i.ec(13,"button",tt,et),i.kc("click",function(t){i.Dc(n);var o=e.$implicit,c=i.Bc(14);return i.pc().play(o.preview,c)}),i.Qc(15," Play "),i.cc(),i.cc(),i.ec(16,"td"),i.ec(17,"button",tt,et),i.kc("click",function(t){i.Dc(n);var o=e.index;return i.pc().playByIndex(o)}),i.Qc(19," Youtube "),i.cc(),i.cc(),i.cc()}if(2&t){var o=e.$implicit,c=e.index;i.Gc(2),i.Rc(c+1),i.Gc(4),i.Rc(o.artists),i.Gc(6),i.wc("href",o.spotifi_link,i.Fc),i.Gc(7),i.Rc(o.title),i.Gc(9),i.Rc(o.duration),i.Gc(11),i.Rc(o.popularity),i.Gc(13),i.vc("disabled",!o.preview),i.Gc(17),i.vc("disabled",!o.preview)}}var it=function(){function t(t){this.songsService=t,this.titles=["#","Autory","N\xe1zov","D\u013a\u017eka (ms)","Popularita","Uk\xe1\u017eka","Video"],this.songs=[]}return t.prototype.ngOnInit=function(){var t=this;this.songsService.getSongs().subscribe(function(e){t.songs=e})},t.prototype.play=function(t,e){if(e.classList.contains("playing"))this._navComponent.pausePreview(),e.classList.remove("playing"),e.innerText="Play";else{var n=document.getElementsByClassName("playing")[0];n&&(n.classList.remove("playing"),n.innerText="Play"),e.classList.add("playing"),this._navComponent.playPreview(t),e.innerText="Pause"}},t.prototype.clickOnModal=function(t){var e=t.target;e.matches("#modalContent")||e.classList.add("hidden")},t.prototype.playByIndex=function(t){},t.ngComponentDef=i.Rb({type:t,selectors:[["app-songs"]],factory:function(e){return new(e||t)(i.Xb(R))},viewQuery:function(t,e){var n;1&t&&i.Vc(O,!0),2&t&&i.Ac(n=i.mc())&&(e._navComponent=n.first)},consts:12,vars:3,template:function(t,e){1&t&&(i.Yb(0,"app-song-controller",U),i.Yb(1,"div",Y),i.ec(2,"table",q),i.ec(3,"thead"),i.ec(4,"tr"),i.Oc(5,Z,2,1,"th",H),i.cc(),i.cc(),i.ec(6,"tbody"),i.Oc(7,nt,20,8,"tr",H),i.cc(),i.cc(),i.ec(8,"div",J),i.kc("click",function(t){return e.clickOnModal(t)}),i.ec(9,"div",X),i.Yb(10,"div",K),i.cc(),i.cc(),i.Yb(11,"songs-nav-bar")),2&t&&(i.vc("url","http://www.rockyvotolato.com/mp3/01_Red_River.mp3"),i.Gc(5),i.vc("ngForOf",e.titles),i.Gc(7),i.vc("ngForOf",e.songs))},directives:[A,s.j,O],styles:["#modal[_ngcontent-%COMP%]{position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.1)}#modalContent[_ngcontent-%COMP%]{position:fixed;top:100px;left:100px;bottom:100px;right:100px}#modalContent[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{height:100%;width:100%}#sideBar[_ngcontent-%COMP%]{position:fixed;width:400px;height:600px;top:60px;left:-400px;transition:1s all;background-color:#ffebcd}#sideBar.visible[_ngcontent-%COMP%]{left:0}"]}),t}(),ot=function(){function t(t){var e=this;void 0===t&&(t="gplayer"),this._id=t,this._initButtons(),this._player=new YT.Player(t,{events:{onStateChange:function(t){return e.onStateChange()}},playerVars:{disablekb:1,controls:0,fs:0,showinfo:0}})}return Object.defineProperty(t.prototype,"playingSong",{set:function(t){var e=document.getElementById("duration"),n=document.getElementById("fileName");if(e){var i=parseInt(t.duration/1e3+"",10);e.innerText=this._getStringFromS(i),this.inputSlider.max=i}if(n){var o=t.artists.map(function(t){return t.name}).join(" AND ");n.innerHTML=o+"<br/>"+t.title}this._playingSong=t},enumerable:!0,configurable:!0}),t.prototype._initButtons=function(){var t=this;this.inputSlider=document.querySelector("#slider input"),this.inputSlider&&(this.inputSlider.onchange=function(e){t.playFrom(e.target.value)})},t.prototype.fullscreen=function(){var t;void 0===(t=document.getElementById(this._id))&&(t=document.documentElement),(t.requestFullscreen||t.webkitRequestFullScreen||t.mozRequestFullScreen||t.msRequestFullscreen).call(t)},t.prototype.onStateChange=function(){var t=document.getElementById("play"),e=document.getElementById("pause");switch(this.getState()){case-1:break;case 0:clearInterval(this._interval);break;case 1:t&&t.classList.add("hidden"),e&&e.classList.remove("hidden");break;case 2:e&&e.classList.add("hidden"),t&&t.classList.remove("hidden")}console.log()},t.prototype._setPlaying=function(t){var e=document.getElementById("songList"),n=document.getElementById("footer");e&&e.classList.toggle("isPlaying",t),n&&n.classList.toggle("isPlaying",t)},t.prototype.isPlaying=function(){this._player.getPlayerState()},t.prototype.getState=function(){return this._player.getPlayerState()},t.prototype.minimalize=function(){var t=document.getElementById("minimalize"),e=document.getElementById("modal");if(e&&t){var n=e.classList.toggle("hidden");t&&(t.classList.toggle("fa-window-maximize",n),t.classList.toggle("fa-window-minimize",!n))}},t.prototype.getTime=function(){return this._player&&parseInt(this._player.getCurrentTime(),10)},t.prototype.pause=function(){this._player&&this._player.pauseVideo()},t.prototype.play=function(){this._player&&this._player.playVideo()},t.prototype.stop=function(){this._player&&this._player.stopVideo()},t.prototype.next=function(){this._player&&this._player.nextVideo()},t.prototype.previous=function(){this._player&&this._player.previousVideo()},t.prototype.mute=function(){this._player&&this._player.mute()},t.prototype.unmute=function(){this._player&&this._player.unmute()},t.prototype.setVolume=function(t){this._player&&this._player.setVolume(t)},t.prototype.getVolume=function(){return this._player&&this._player.getVolume()},t.prototype.playFrom=function(t){this._player&&this._player.seekTo(t,!0)},t.prototype.playByName=function(t){var e=this;this._setPlaying(!0),$("#modal").show(),console.log("teraz hladam: ",t),$.get("http://localhost:3000/songs/search/"+encodeURI(t),function(t){t.items.length&&e._player&&e._player.loadVideoById(t.items[0].id.videoId)},"json")},t.prototype._getStringFromS=function(t){var e=parseInt(t/60+"",10),n=t%60;return c.MathUtils.pad(e,2)+":"+c.MathUtils.pad(n,2)},t.prototype.getFullName=function(t){var e=t||this._playingSong;return e?e.artists.map(function(t){return t.name}).join(" AND ")+" - "+e.title:""},t.prototype.playByIndex=function(e){var n=this;if(t.songList&&t.songList[e]){this.playingSong=t.songList[e],this.playByName(this._playingSong.artists.map(function(t){return t.name}).join(" ")+" "+this._playingSong.title);var i=document.getElementById("actTime");i&&(this._interval=setInterval(function(){var t=n.getTime();n.inputSlider.value=t,i.innerText=n._getStringFromS(t)},1e3))}},t.prototype.addToQueebyName=function(t){var e=this;$.get("/songs/search/"+encodeURI(t),function(t){t.items.length&&e._player&&e._player.cueVideoById(t.items[0].id.videoId)},"json")},t}(),ct=["id","navBar"],rt=["onclick","document.getElementById('sideBar').classList.toggle('visible')"],at=["id","search",3,"keyup"],st=["query",""],lt=["id","sideBar"],pt=["boder","1","id","songList"],ut=["id","modal",3,"click"],dt=["id","modalContent"],gt=["id","player"],ft=["id","footer"],ht=["id","controls"],yt=["id","back",1,"fa","fa-step-backward",3,"click"],mt=["id","pause",1,"fa","fa-pause","hidden",3,"click"],vt=["id","play",1,"fa","fa-play",3,"click"],_t=["id","stop",1,"fa","fa-stop",3,"click"],bt=["id","next",1,"fa","fa-step-forward",3,"click"],Pt=["id","minimalize",1,"fa","fa-window-minimize",3,"click"],wt=["id","fullscreen",1,"fa","fa-arrows-alt",3,"click"],kt=["id","button"],xt=["id","slider"],Ct=["type","range","value","0"],Ot=["id","timeHolder"],Mt=["id","actTime"],St=["id","duration"],Lt=["id","fileName"],It=function(){function t(t,e){this.songService=t,this.notificationService=e,this._playing=null}return t.prototype.clickOnModal=function(t){var e=t.target;e.matches("#modalContent")||e.classList.add("hidden")},t.prototype.ngOnInit=function(){var t=this;$("#modal").hide(),this._loadAllSongs();var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var n=document.getElementsByTagName("script")[0];n&&n.parentNode&&(n.parentNode.insertBefore(e,n),window.onYouTubeIframeAPIReady=function(){t.gplayer=new ot("player"),window.gplayer=t.gplayer})},t.prototype.search=function(t){var e=t.toLowerCase();document.querySelector("#songList tbody tr"),$("#songList tbody tr").each(function(){$(this).text().toLowerCase().indexOf(e)<0?this.classList.add("hidden"):this.classList.remove("hidden")})},t.prototype._play=function(t,e){var n="";if(this._playing&&(n=this._playing.currentSrc,this._playing.pause(),this._playing=null,$(".playing").text("play").removeClass("playing")),n===t)return e.classList.remove("playing"),void(e.innerText="play");this._playing=new Audio(t),this._playing.play(),e.classList.add("playing"),e.innerText="stop"},t.prototype._loadAllSongs=function(){var t=this;this.songService.getSongs().subscribe(function(t){ot.songList=t;var e="",n=1;t.forEach(function(t,i){e+="<tr>",e+="<td>"+n+++"</td>",e+="<td>"+t.artists.map(function(t){return t.name}).join(" And ")+"</td>",e+="<td><a href='"+t.spotifi_link+"'>"+t.title+"<a></td>",e+="<td>"+t.duration+"</td>",e+="<td>"+t.popularity+"</td>",e+=t.preview?"<td><button onclick=\"play(' + item.preview + ', this)\">play</button>":"<td><button disabled>play</button>",e+="<button onclick=\"gplayer.playByIndex('"+i+"')\">youtube</button></td>",e+="</tr>"}),$("table tbody").append(e)},function(e){return t.notificationService.openErrorNotification(e)})},t.ngComponentDef=i.Rb({type:t,selectors:[["app-songs"]],factory:function(e){return new(e||t)(i.Xb(R),i.Xb(T.a))},consts:44,vars:0,template:function(t,e){if(1&t){var n=i.fc();i.ec(0,"div",ct),i.ec(1,"button",rt),i.Qc(2,"Sidebar"),i.cc(),i.ec(3,"input",at,st),i.kc("keyup",function(t){i.Dc(n);var o=i.Bc(4);return e.search(o.value)}),i.cc(),i.cc(),i.Yb(5,"div",lt),i.ec(6,"table",pt),i.ec(7,"thead"),i.ec(8,"tr"),i.ec(9,"th"),i.Qc(10,"#"),i.cc(),i.ec(11,"th"),i.Qc(12,"Autory"),i.cc(),i.ec(13,"th"),i.Qc(14,"N\xe1zov"),i.cc(),i.ec(15,"th"),i.Qc(16,"D\u013a\u017eka (ms)"),i.cc(),i.ec(17,"th"),i.Qc(18,"Popularita"),i.cc(),i.ec(19,"th"),i.Qc(20,"Hodnotenie"),i.cc(),i.cc(),i.cc(),i.Yb(21,"tbody"),i.cc(),i.ec(22,"div",ut),i.kc("click",function(t){return e.clickOnModal(t)}),i.ec(23,"div",dt),i.Yb(24,"div",gt),i.cc(),i.cc(),i.ec(25,"div",ft),i.ec(26,"div",ht),i.ec(27,"i",yt),i.kc("click",function(t){return e.gplayer.previous()}),i.cc(),i.ec(28,"i",mt),i.kc("click",function(t){return e.gplayer.pause()}),i.cc(),i.ec(29,"i",vt),i.kc("click",function(t){return e.gplayer.play()}),i.cc(),i.ec(30,"i",_t),i.kc("click",function(t){return e.gplayer.stop()}),i.cc(),i.ec(31,"i",bt),i.kc("click",function(t){return e.gplayer.next()}),i.cc(),i.ec(32,"i",Pt),i.kc("click",function(t){return e.gplayer.minimalize()}),i.cc(),i.ec(33,"i",wt),i.kc("click",function(t){return e.gplayer.fullscreen()}),i.cc(),i.cc(),i.ec(34,"div",kt),i.ec(35,"span",xt),i.Yb(36,"input",Ct),i.cc(),i.ec(37,"div",Ot),i.ec(38,"span",Mt),i.Qc(39,"00:00"),i.cc(),i.Qc(40,"/ "),i.ec(41,"span",St),i.Qc(42,"00:00"),i.cc(),i.cc(),i.cc(),i.Yb(43,"div",Lt),i.cc()}},styles:['*[_ngcontent-%COMP%]{padding:0;margin:0}#modal[_ngcontent-%COMP%]{position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.1)}#modalContent[_ngcontent-%COMP%]{position:fixed;top:100px;left:100px;bottom:100px;right:100px}#modalContent[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{height:100%;width:100%}#footer[_ngcontent-%COMP%]{position:fixed;width:100%;height:60px;background-color:#e6fdfd;transition:all .5s;bottom:-60px}#footer.isPlaying[_ngcontent-%COMP%]{bottom:0}#button[_ngcontent-%COMP%]{width:calc(70% - 50px);float:right;line-height:72px;height:100%}#slider[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:calc(100% - 110px)}#fileName[_ngcontent-%COMP%]{width:calc(30% - 200px);float:right;height:100%}#controls[_ngcontent-%COMP%]{position:relative;width:250px;float:right;line-height:60px;text-align:center;height:100%}#controls[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:21px;background-color:#89e399;width:30px;cursor:pointer;border-radius:59px;height:30px;text-align:center;line-height:30px}#controls[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{background-color:#6fbb7c}#timeHolder[_ngcontent-%COMP%]{display:inline-block;font-size:19px}#songList[_ngcontent-%COMP%]{width:100%;transition:all .5s;margin-top:60px}#songList[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{font-family:"Trebuchet MS",Arial,Helvetica,sans-serif;border-collapse:collapse}#songList[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], #songList[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border:1px solid #ddd;padding:8px}#songList[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f2f2f2}#songList[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#ddd}#songList[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-top:12px;padding-bottom:12px;text-align:left;background-color:#4caf50;color:#fff}#songList.isPlaying[_ngcontent-%COMP%]{margin-bottom:60px}#navBar[_ngcontent-%COMP%]{position:fixed;width:100%;height:60px;top:0;left:0;background:#e6fdfd}#sideBar[_ngcontent-%COMP%]{position:fixed;width:400px;height:600px;top:60px;left:-400px;transition:1s all;background-color:#ffebcd}#sideBar.visible[_ngcontent-%COMP%]{left:0}']}),t}(),Bt=n("krJt"),Tt=n("DUip"),Dt=[{path:"",children:[{path:"",pathMatch:"full",component:it},{path:":id",component:It}]}],Qt=function(){function t(){}return t.ngModuleDef=i.Vb({type:t}),t.ngInjectorDef=i.Ub({factory:function(e){return new(e||t)},imports:[[Tt.j.forChild(Dt)],Tt.j]}),t}();Tt.j.forChild(Dt),n.d(e,"SongsModule",function(){return Rt});var Rt=function(){function t(){}return t.ngModuleDef=i.Vb({type:t}),t.ngInjectorDef=i.Ub({factory:function(e){return new(e||t)},imports:[[Bt.a,o.a,Qt]]}),t}()}}]);