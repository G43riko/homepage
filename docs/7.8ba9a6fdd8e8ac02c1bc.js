(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{QNcV:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n("TYT/"),c=n("aR35"),i=function(){function e(){this._loggedIn=!1,this._checkIfIsLoggedIn()}return Object.defineProperty(e.prototype,"loggedIn",{get:function(){return this._loggedIn},enumerable:!0,configurable:!0}),e.prototype.logOut=function(){window.sessionStorage.removeItem(c.a.AUTH_COOKIE_KEY),this._loggedIn=!1},e.prototype.logIn=function(e){if(this._token=e.token,!this._token)throw new Error("Login options without token: "+JSON.stringify(e));return window.sessionStorage.setItem(c.a.AUTH_COOKIE_KEY,this._token),this._loggedIn=!0,e},e.prototype.getToken=function(){return this._token||""},e.prototype._checkIfIsLoggedIn=function(){this._token=sessionStorage.getItem(c.a.AUTH_COOKIE_KEY),this._loggedIn=Boolean(this._token)},e.prototype.updateRole=function(e,t,n){},e.ngInjectableDef=r.Tb({token:e,factory:function(t){return new(t||e)},providedIn:"root"}),e}()},WLQ1:function(e,t,n){"use strict";n.r(t);var r=n("TYT/"),c=n("krJt"),i=n("PCNd"),o=function(){function e(e,t,n){void 0===n&&(n=""),this.type=e,this.link=n,this.userName=t}return e.getLink=function(e){return function(e){switch(e){case"FACEBOOK":return"https://www.facebook.com/";case"LINKEDIN":return"https://www.linkedin.com/in/";case"TWITTER":return"https://twitter.com/";case"INSTAGRAM":return"https://www.instagram.com/";case"GITHUB":return"https://github.com/";case"YOUTUBE":return"https://www.youtube.com/channel/";case"GOOGLEPLUS":return"https://plus.google.com/u/0/";case"SKYPE":return""}return""}(e.type)+(e.link||e.userName)},e.getIcon=function(t){var n=e.types.find(function(e){return e.value===t.type});return n?n.icon:""},e.parse=function(t){var n=new e(t.type,t.userName,t.link);return n.active=t.active,n.account_id=t.account_id,n},e.types=[{label:"Facebook",value:"FACEBOOK",icon:"facebook"},{label:"Google+",value:"GOOGLEPLUS",icon:"google plus"},{label:"Github",value:"GITHUB",icon:"github"},{label:"Instagram",value:"INSTAGRAM",icon:"instagram"},{label:"LinkedIn",value:"LINKEDIN",icon:"linkedin square"},{label:"Skype",value:"SKYPE",icon:"skype"},{label:"Twitter",value:"TWITTER",icon:"twitter"},{label:"Youtube",value:"YOUTUBE",icon:"youtube"},{label:"Bitbucket",value:"BITBUCKET",icon:"bitbucket"}],e}(),a=n("Valr"),s=n("FgbW"),u=n("M+/Y"),l=n("QJY3"),p=n("WlZ6"),d=function(){function e(e,t){void 0===e&&(e="@"),void 0===t&&(t=!0),this.email=e,this.active=t}return e.parse=function(t){if(!t)return null;var n=new e;return n.email_id=t.email_id,n.email=t.email,n.active=t.active,n},e}(),m=n("p6iS"),f=n("utYi"),h=n("xtoW"),b=n("Ut/T"),v=[1,"email-list",3,"ngClass"],g=[3,"disabled"],w=["chipList",""],y=["class","person-email",3,"removable","selectable","removed",4,"ngFor","ngForOf"],I=["placeholder","Emaily:",3,"matChipInputAddOnBlur","matChipInputFor","formControl","matChipInputSeparatorKeyCodes","matChipInputTokenEnd"],O=["class","email-error-message",4,"ngIf"],C=["class","show-all-emails",3,"formControl",4,"ngIf"],k=[1,"person-email",3,"removable","selectable","removed"],_=["matChipRemove","",4,"ngIf"],N=["matChipRemove",""];function S(e,t){1&e&&(r.ec(0,"mat-icon",N),r.Qc(1,"cancel"),r.cc())}function E(e,t){if(1&e){var n=r.fc();r.ec(0,"mat-chip",k),r.kc("removed",function(e){r.Dc(n);var c=t.index;return r.pc().remove(c)}),r.Qc(1),r.Oc(2,S,2,0,"mat-icon",_),r.cc()}if(2&e){var c=t.$implicit,i=r.pc();r.vc("removable",!i.disabled)("selectable",!1),r.Gc(1),r.Sc(" ",c.email," "),r.Gc(2),r.vc("ngIf",!i.disabled)}}var G=[1,"email-error-message"];function P(e,t){1&e&&(r.ec(0,"mat-error",G),r.Qc(1," Please enter a valid email address "),r.cc())}var F=[1,"show-all-emails",3,"formControl"];function D(e,t){if(1&e&&(r.ec(0,"mat-slide-toggle",F),r.Qc(1,"Aj neakt\xedvne"),r.cc()),2&e){var n=r.pc();r.vc("formControl",n.showInactive)}}var L=function(e){return{"full-width":e}},M=function(){function e(){this.disabled=!0,this.emailList=[],this.showInactive=new l.e(!1),this.values=new l.e("",l.w.email),this.visible=!0,this.addOnBlur=!0,this.separatorKeysCodes=[p.g,p.c]}return e.prototype.ngOnInit=function(){},e.prototype.add=function(e){if(!this.values.errors){var t=e.input,n=e.value;(n||"").trim()&&this.emailList.push(new d(n.trim())),t&&(t.value="")}},e.prototype.remove=function(e){e>=0&&this.emailList.splice(e,1)},e.ngComponentDef=r.Rb({type:e,selectors:[["app-email"]],factory:function(t){return new(t||e)},inputs:{disabled:"disabled",emailList:"emailList",isNew:"isNew"},consts:8,vars:14,template:function(e,t){if(1&e&&(r.ec(0,"mat-form-field",v),r.ec(1,"mat-chip-list",g,w),r.Oc(3,E,3,4,"mat-chip",y),r.qc(4,"activePipe"),r.ec(5,"input",I),r.kc("matChipInputTokenEnd",function(e){return t.add(e)}),r.cc(),r.Oc(6,P,2,0,"mat-error",O),r.cc(),r.cc(),r.Oc(7,D,2,1,"mat-slide-toggle",C)),2&e){var n=r.Bc(2);r.vc("ngClass",r.yc(12,L,t.isNew)),r.Gc(1),r.vc("disabled",t.disabled),r.Gc(3),r.vc("ngForOf",r.sc(4,9,t.emailList,t.showInactive.value&&!t.isNew)),r.Gc(5),r.vc("matChipInputAddOnBlur",t.addOnBlur)("matChipInputFor",n)("formControl",t.values)("matChipInputSeparatorKeyCodes",t.separatorKeysCodes),r.Gc(6),r.vc("ngIf",t.values.hasError("email")),r.Gc(7),r.vc("ngIf",!t.isNew)}},directives:[s.b,a.i,m.c,a.j,m.b,l.c,l.n,l.f,a.k,m.a,f.a,m.d,s.a,h.a],pipes:[b.a],styles:[".email-list[_ngcontent-%COMP%]{width:80%}.show-all-emails[_ngcontent-%COMP%]{width:20%;min-width:120px}"]}),e}(),j=function(){function e(e,t){void 0===e&&(e=""),void 0===t&&(t=!0),this.number=e,this.active=t}return e.parse=function(t){if(!t)return null;var n=new e;return n.number_id=t.number_id,n.number=t.number,n.active=t.active,n},e}(),A=[1,"number-list",3,"ngClass"],T=[3,"disabled"],B=["chipList",""],Y=[3,"removable","selectable","removed",4,"ngFor","ngForOf"],Q=["placeholder","Tel \u010d\xedsla:",3,"matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","matChipInputTokenEnd"],U=["class","show-all-numbers",3,"formControl",4,"ngIf"],x=[3,"removable","selectable","removed"],R=["matChipRemove","",4,"ngIf"],K=["matChipRemove",""];function X(e,t){1&e&&(r.ec(0,"mat-icon",K),r.Qc(1,"cancel"),r.cc())}function q(e,t){if(1&e){var n=r.fc();r.ec(0,"mat-chip",x),r.kc("removed",function(e){r.Dc(n);var c=t.index;return r.pc().remove(c)}),r.Qc(1),r.Oc(2,X,2,0,"mat-icon",R),r.cc()}if(2&e){var c=t.$implicit,i=r.pc();r.vc("removable",!i.disabled)("selectable",!1),r.Gc(1),r.Sc(" ",c.number," "),r.Gc(2),r.vc("ngIf",!i.disabled)}}var H=[1,"show-all-numbers",3,"formControl"];function J(e,t){if(1&e&&(r.ec(0,"mat-slide-toggle",H),r.Qc(1,"Aj neakt\xedvne"),r.cc()),2&e){var n=r.pc();r.vc("formControl",n.showInactive)}}var V=function(e){return{"full-width":e}},z=function(){function e(){this.disabled=!0,this.numberList=[],this.showInactive=new l.e(!1),this.visible=!0,this.addOnBlur=!0,this.separatorKeysCodes=[p.g,p.c]}return e.prototype.ngOnInit=function(){},e.prototype.add=function(e){var t=e.input,n=e.value;(n||"").trim()&&this.numberList.push(new j(n.trim())),t&&(t.value="")},e.prototype.remove=function(e){e>=0&&this.numberList.splice(e,1)},e.ngComponentDef=r.Rb({type:e,selectors:[["app-numbers"]],factory:function(t){return new(t||e)},inputs:{disabled:"disabled",numberList:"numberList",isNew:"isNew"},consts:7,vars:12,template:function(e,t){if(1&e&&(r.ec(0,"mat-form-field",A),r.ec(1,"mat-chip-list",T,B),r.Oc(3,q,3,4,"mat-chip",Y),r.qc(4,"activePipe"),r.ec(5,"input",Q),r.kc("matChipInputTokenEnd",function(e){return t.add(e)}),r.cc(),r.cc(),r.cc(),r.Oc(6,J,2,1,"mat-slide-toggle",U)),2&e){var n=r.Bc(2);r.vc("ngClass",r.yc(10,V,t.isNew)),r.Gc(1),r.vc("disabled",t.disabled),r.Gc(3),r.vc("ngForOf",r.sc(4,7,t.numberList,t.showInactive.value&&!t.isNew)),r.Gc(5),r.vc("matChipInputFor",n)("matChipInputSeparatorKeyCodes",t.separatorKeysCodes)("matChipInputAddOnBlur",t.addOnBlur),r.Gc(6),r.vc("ngIf",!t.isNew)}},directives:[s.b,a.i,m.c,a.j,m.b,a.k,m.a,f.a,m.d,h.a,l.n,l.f],pipes:[b.a],styles:[".number-list[_ngcontent-%COMP%]{width:80%}.show-all-numbers[_ngcontent-%COMP%]{width:20%;min-width:120px}"]}),e}(),W=n("mrSG"),$=n("p0Sj"),Z=n("67Y/"),ee=n("O+os"),te=n("GlzI"),ne=function(){function e(e,t,n,r){void 0===e&&(e="SK"),void 0===t&&(t=""),void 0===n&&(n=""),void 0===r&&(r=""),this.streetNumber=r,this.country=e,this.street=n,this.city=t}return e.parse=function(t){var n=new e;return t?(n.streetNumber=t.streetNumber,n.street=t.street,n.country=t.country,n.city=t.city,n):n},e.prototype.toModel=function(){return{country:this.country||"",city:this.city||"",street:this.street||"",streetNumber:this.streetNumber||""}},e}(),re=function(){function e(){this.emails=[new d],this.numbers=[new j],this.address=new ne,this.accounts=[]}return e.parse=function(t){var n=new e;return n.person_id=t.person_id,n.name=t.name,n.surName=t.surName,n.gender=t.gender,n.birthday=t.birthday,n.nick=t.nick,n.address=t.address?ne.parse(t.address):new ne,n.emails=Array.isArray(t.emails)?t.emails.map(d.parse):[],n.numbers=Array.isArray(t.numbers)?t.numbers.map(j.parse):[],n.accounts=Array.isArray(t.accounts)?t.accounts.map(o.parse):[],n},e.prototype.toModel=function(){return{name:this.name||"",surName:this.surName||"",nick:this.nick||"",gender:this.gender||"",birthday:this.birthday||"",address:this.address.toModel()}},e}(),ce=n("9Z1F"),ie=n("aR35"),oe=n("QNcV"),ae=n("o0vB"),se=n("9nlD"),ue=n("cUzu"),le=function(e){function t(t,n,r){return e.call(this,t,n,r)||this}return Object(W.__extends)(t,e),t.prototype.getLocationEmbedUrl=function(e){var t=ie.a.GOOGLE_MAPS_API_EMBED_URL+"?";return(t+="key="+ie.a.GOOGLE_MAPS_API_EMBED_KEY)+"&q="+e},t.prototype.getPlacesAround=function(e){return e.radius=e.radius||500,e.location=e.latitude+","+e.longitude,e.key=e.key||ie.a.GOOGLE_MAPS_API_KEY,this.http.post("http://g43.clanweb.eu/API/maps.php",e).pipe(Object(ce.a)(this.handleError("getPlacesAround")))},t.ngInjectableDef=r.Tb({token:t,factory:function(e){return new(e||t)(r.ic(ue.c),r.ic(oe.a),r.ic(se.a))},providedIn:"root"}),t}(ae.a),pe=ie.a.BASE_URL+"/persons",de=function(e){function t(t,n,r){return e.call(this,t,n,r)||this}return Object(W.__extends)(t,e),t.prototype.getPersons=function(){return this.http.get(pe+"/list").pipe(Object(ce.a)(this.handleError("getPersons")))},t.prototype.getDetail=function(e){return this.http.get(pe+"/"+e).pipe(Object(Z.a)(re.parse),Object(ce.a)(this.handleError("cannot get person with id "+e)))},t.prototype.update=function(e){return this.http.put(pe+"/"+e.person_id,e,{headers:this.getHeaders()}).pipe(Object(Z.a)(re.parse),Object(ce.a)(this.handleError("update person with id"+e.person_id)))},t.prototype.delete=function(e){return this.http.delete(pe+"/"+e).pipe(Object(ce.a)(this.handleError("delete person with id"+e)))},t.prototype.add=function(e){return this.http.post(pe,JSON.stringify(e),{headers:this.getHeaders()}).pipe(Object(Z.a)(re.parse),Object(ce.a)(this.handleError("add person")))},t.prototype.addAll=function(e){return this.http.post(pe+"/all",JSON.stringify(e),{headers:this.getHeaders()}).pipe(Object(Z.a)(function(e){return e.map(re.parse)}),Object(ce.a)(this.handleError("addAll persons")))},t.ngInjectableDef=r.Tb({token:t,factory:function(e){return new(e||t)(r.ic(ue.c),r.ic(oe.a),r.ic(se.a))},providedIn:"root"}),t}(ae.a),me=function(e){function t(t,n,r){return e.call(this,t,n,r)||this}return Object(W.__extends)(t,e),t.prototype.getCountries=function(){return this.http.get(ie.a.BASE_URL+"/utils/countries/list",{headers:this.getHeaders()}).pipe(Object(ce.a)(this.handleError("getCountries")))},t.ngInjectableDef=r.Tb({token:t,factory:function(e){return new(e||t)(r.ic(ue.c),r.ic(oe.a),r.ic(se.a))},providedIn:"root"}),t}(ae.a),fe=n("DUip"),he=n("QrbZ"),be=n("YfVx"),ve=n("2mMm"),ge=n("uxoL"),we=n("pENn"),ye=n("L7w6"),Ie=n("S8bm"),Oe=["class","full-width","style","align-content: center",3,"formGroup",4,"ngIf"],Ce=["color","primary","mat-raised-button","",3,"disabled","click",4,"ngIf"],ke=["mat-raised-button","",3,"click"],_e=[1,"full-width",2,"align-content","center",3,"formGroup"],Ne=[1,"flex-row"],Se=[1,"full-width"],Ee=["matInput","","formControlName","name","placeholder","Meno"],Ge=[4,"ngIf"],Pe=["matInput","","formControlName","surName","placeholder","Priezvisko"],Fe=["matInput","","formControlName","nick","placeholder","Prez\xedvka"],De=["matInput","","formControlName","birthday","placeholder","D\xe1tum narodenia"],Le=["formControlName","gender","aria-label","Font Style"],Me=["value","MALE"],je=["value","FEMALE"],Ae=["formGroupName","address",1,"flex-row"],Te=["matInput","","type","text","placeholder","\u0160t\xe1t","formControlName","country",3,"matAutocomplete"],Be=["auto","matAutocomplete"],Ye=[3,"value",4,"ngFor","ngForOf"],Qe=["matInput","","formControlName","city","placeholder","Mesto"],Ue=["matInput","","formControlName","street","placeholder","Ulica"],xe=["matInput","","formControlName","streetNumber","placeholder","\u010c\xedslo domu"],Re=["mat-icon-button","","matTooltip","Show address on map",3,"click"],Ke=[3,"disabled","numberList","isNew"],Xe=[3,"disabled","emailList","isNew"];function qe(e,t){1&e&&(r.ec(0,"mat-error"),r.Qc(1," Name is "),r.ec(2,"strong"),r.Qc(3,"required"),r.cc(),r.cc())}function He(e,t){1&e&&(r.ec(0,"mat-error"),r.Qc(1," Surname is "),r.ec(2,"strong"),r.Qc(3,"required"),r.cc(),r.cc())}var Je=[3,"value"];function Ve(e,t){if(1&e&&(r.ec(0,"mat-option",Je),r.Qc(1),r.cc()),2&e){var n=t.$implicit;r.vc("value",n),r.Gc(1),r.Sc(" ",n," ")}}function ze(e,t){if(1&e){var n=r.fc();r.ec(0,"form",_e),r.ec(1,"div",Ne),r.ec(2,"div"),r.ec(3,"mat-form-field",Se),r.Yb(4,"input",Ee),r.Oc(5,qe,4,0,"mat-error",Ge),r.cc(),r.cc(),r.ec(6,"div"),r.ec(7,"mat-form-field",Se),r.Yb(8,"input",Pe),r.Oc(9,He,4,0,"mat-error",Ge),r.cc(),r.cc(),r.ec(10,"div"),r.ec(11,"mat-form-field",Se),r.Yb(12,"input",Fe),r.cc(),r.cc(),r.cc(),r.ec(13,"div",Ne),r.ec(14,"div"),r.ec(15,"mat-form-field",Se),r.Yb(16,"input",De),r.cc(),r.cc(),r.ec(17,"div"),r.Qc(18," Pohlavie: "),r.ec(19,"mat-button-toggle-group",Le),r.ec(20,"mat-button-toggle",Me),r.Qc(21,"Mu\u017e"),r.cc(),r.ec(22,"mat-button-toggle",je),r.Qc(23,"\u017dena"),r.cc(),r.cc(),r.cc(),r.cc(),r.ec(24,"div",Ae),r.ec(25,"div"),r.ec(26,"mat-form-field",Se),r.Yb(27,"input",Te),r.ec(28,"mat-autocomplete",null,Be),r.Oc(30,Ve,2,2,"mat-option",Ye),r.qc(31,"async"),r.cc(),r.cc(),r.cc(),r.ec(32,"div"),r.ec(33,"mat-form-field",Se),r.Yb(34,"input",Qe),r.cc(),r.cc(),r.ec(35,"div"),r.ec(36,"mat-form-field",Se),r.Yb(37,"input",Ue),r.cc(),r.cc(),r.ec(38,"div"),r.ec(39,"mat-form-field",Se),r.Yb(40,"input",xe),r.cc(),r.cc(),r.ec(41,"div"),r.ec(42,"button",Re),r.kc("click",function(e){return r.Dc(n),r.pc().showMap()}),r.ec(43,"mat-icon"),r.Qc(44,"map"),r.cc(),r.cc(),r.cc(),r.cc(),r.Yb(45,"app-numbers",Ke),r.Yb(46,"app-email",Xe),r.cc()}if(2&e){var c=r.Bc(29),i=r.pc();r.vc("formGroup",i.personForm),r.Gc(5),r.vc("ngIf",i.personForm.get("name").hasError("required")),r.Gc(9),r.vc("ngIf",i.personForm.get("surName").hasError("required")),r.Gc(27),r.vc("matAutocomplete",c),r.Gc(30),r.vc("ngForOf",r.rc(31,11,i.filteredCountries)),r.Gc(45),r.vc("disabled",i.personForm.disabled)("numberList",i.selectedPerson.numbers)("isNew",i.isNew),r.Gc(46),r.vc("disabled",i.personForm.disabled)("emailList",i.selectedPerson.emails)("isNew",i.isNew)}}var We=["color","primary","mat-raised-button","",3,"disabled","click"];function $e(e,t){if(1&e){var n=r.fc();r.ec(0,"button",We),r.kc("click",function(e){return r.Dc(n),r.pc().save()}),r.Qc(1,"Ulo\u017ei\u0165"),r.cc()}if(2&e){var c=r.pc();r.vc("disabled",c.personForm.invalid)}}function Ze(e,t){if(1&e){var n=r.fc();r.ec(0,"button",We),r.kc("click",function(e){return r.Dc(n),r.pc().edit()}),r.Qc(1,"Upravi\u0165"),r.cc()}if(2&e){var c=r.pc();r.vc("disabled",c.personForm.invalid)}}var et=function(e){function t(t,n,r,c,i,o,a){var s=e.call(this)||this;return s.route=t,s.mapService=n,s.router=r,s.dialog=c,s.utilService=i,s.formBuilder=o,s.personService=a,s.countries=[],s}return Object(W.__extends)(t,e),t.prototype.ngOnInit=function(){var e=this;this.personForm=this.createForm(),this.utilService.getCountries().subscribe(function(t){var n;(n=e.countries).push.apply(n,t),e.filteredCountries=e.personForm.controls.address.controls.country.valueChanges.pipe(Object($.a)(""),Object(Z.a)(function(t){return e._filter(t)}))}),this.route.params.subscribe(function(t){var n=t.id;e.isNew="new"===n,e.isNew?e.processChangedData(new re,{disabled:!1}):e.personService.getDetail(n).subscribe(function(t){e.processChangedData(t)})})},t.prototype.createForm=function(){return this.formBuilder.group({name:["",{validators:l.w.required}],surName:["",{validators:l.w.required}],nick:"",birthday:["",{validators:l.w.pattern(/(\d|\?){2}\.(\d|\?){2}.(\d|\?){4}/)}],gender:["",{validators:l.w.required}],address:this.formBuilder.group({country:"",city:"",street:"",streetNumber:""})})},t.prototype.save=function(){var e=this;(this.isNew?this.personService.add:this.personService.update).call(this.personService,this.selectedPerson).subscribe(function(t){return e.processChangedData(t)})},t.prototype.showMap=function(){var e=this.personForm.value.address.city+" ";e+=this.personForm.value.address.street+" ",e+=this.personForm.value.address.streetNumber,this.dialog.open(te.a,{width:"95%",height:"95%",data:this.mapService.getLocationEmbedUrl(encodeURI(e))})},t.prototype.edit=function(){this.disabled=!1,this.personForm.enable()},t.prototype.back=function(){var e=this;this.isNew||this.disabled?this.router.navigate(["persons"]):this.personService.getDetail(this.selectedPerson.person_id).subscribe(function(t){return e.processChangedData(t)})},t.prototype._filter=function(e){var t=e.toLowerCase();return this.countries.filter(function(e){return e.toLowerCase().includes(t)})},t.prototype.processChangedData=function(e,t){this.selectedPerson=e,this.personForm.setValue(this.selectedPerson.toModel(),{onlySelf:!0}),this.disabled=!t||"boolean"!=typeof t.disabled||t.disabled,this.disabled?this.personForm.disable():this.personForm.enable()},t.ngComponentDef=r.Rb({type:t,selectors:[["app-person-detail"]],factory:function(e){return new(e||t)(r.Xb(fe.a),r.Xb(le),r.Xb(fe.g),r.Xb(he.b),r.Xb(me),r.Xb(l.d),r.Xb(de))},features:[r.Gb],consts:6,vars:3,template:function(e,t){1&e&&(r.ec(0,"mat-card"),r.Oc(1,ze,47,13,"form",Oe),r.Oc(2,$e,2,1,"button",Ce),r.Oc(3,Ze,2,1,"button",Ce),r.ec(4,"button",ke),r.kc("click",function(e){return t.back()}),r.Qc(5,"Nasp\xe4\u0165"),r.cc(),r.cc()),2&e&&(r.Gc(1),r.vc("ngIf",t.selectedPerson),r.Gc(2),r.vc("ngIf",!t.disabled),r.Gc(3),r.vc("ngIf",t.disabled))},directives:[be.a,a.k,ve.a,l.y,l.o,l.h,s.b,u.b,l.c,l.n,l.g,ge.b,ge.a,l.i,we.c,we.a,a.j,ye.a,f.a,z,M,s.a,Ie.o],pipes:[a.b],styles:[".flex-row[_ngcontent-%COMP%]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.flex-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding-right:1em}@media only screen and (max-width:408px){.flex-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}}a[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{margin-right:1em}"]}),t}(ee.a);n("aNQE");var tt=n("JkJP"),nt=n("jjfr"),rt=[3,"ngIf"],ct=["mat-icon-button","","aria-label","Example icon-button with a menu",3,"disabled","matMenuTriggerFor"],it=[3,"matBadge"],ot=["menuEmails","matMenu"],at=["mat-menu-item","",4,"ngFor","ngForOf"],st=["menuNumber","matMenu"],ut=["mat-menu-item",""],lt=[3,"href"];function pt(e,t){if(1&e&&(r.ec(0,"button",ut),r.ec(1,"a",lt),r.ec(2,"span"),r.Qc(3),r.cc(),r.cc(),r.cc()),2&e){var n=t.$implicit;r.Gc(1),r.xc("href","mailto:",n,"",r.Fc),r.Gc(3),r.Rc(n)}}function dt(e,t){if(1&e&&(r.ec(0,"button",ut),r.ec(1,"a",lt),r.ec(2,"span"),r.Qc(3),r.cc(),r.cc(),r.cc()),2&e){var n=t.$implicit;r.Gc(1),r.xc("href","tel:",n,"",r.Fc),r.Gc(3),r.Rc(n)}}function mt(e,t){if(1&e&&(r.ec(0,"button",ct),r.ec(1,"mat-icon",it),r.Qc(2,"email"),r.cc(),r.cc(),r.ec(3,"mat-menu",null,ot),r.Oc(5,pt,4,2,"button",at),r.cc(),r.ec(6,"button",ct),r.ec(7,"mat-icon",it),r.Qc(8,"call"),r.cc(),r.cc(),r.ec(9,"mat-menu",null,st),r.Oc(11,dt,4,2,"button",at),r.cc()),2&e){var n=r.Bc(4),c=r.Bc(10),i=r.pc();r.vc("disabled",!i.person||!(null!=i.person.emails&&i.person.emails.length))("matMenuTriggerFor",n),r.Gc(1),r.vc("matBadge",null==i.person.emails?null:i.person.emails.length),r.Gc(5),r.vc("ngForOf",i.person.emails),r.Gc(6),r.vc("disabled",!i.person||!(null!=i.person.numbers&&i.person.numbers.length))("matMenuTriggerFor",c),r.Gc(7),r.vc("matBadge",null==i.person.numbers?null:i.person.numbers.length),r.Gc(11),r.vc("ngForOf",i.person.numbers)}}var ft=function(){function e(){}return e.prototype.ngOnInit=function(){},e.ngComponentDef=r.Rb({type:e,selectors:[["app-person-list-row-cell-select"]],factory:function(t){return new(t||e)},inputs:{person:"person"},consts:1,vars:1,template:function(e,t){1&e&&r.Oc(0,mt,12,8,"ng-template",rt),2&e&&r.vc("ngIf",t.person)},directives:[a.k,ve.a,tt.c,f.a,nt.a,tt.d,a.j,tt.a],styles:[""]}),e}(),ht=(n("t35G"),n("n1jX"),n("3S9H")),bt=n("IYfF"),vt=n("VNr4"),gt=n("c4N/"),wt=["class","person-wrapper",4,"ngIf"],yt=[1,"person-wrapper"],It=["cellSelect",""],Ot=["cellOptions",""],Ct=[3,"tableConfig","templates","data",4,"ngIf"],kt=["mat-fab","",1,"floating-add",3,"click"],_t=[3,"person"];function Nt(e,t){1&e&&r.Yb(0,"app-person-list-row-cell-select",_t),2&e&&r.vc("person",t.row)}var St=[1,"circular","ui","icon","button","hiddenable",3,"click"],Et=[1,"icon","angle","right"],Gt=["class","circular ui icon button hiddenable",3,"click",4,"ngIf"],Pt=[1,"icon","remove"];function Ft(e,t){if(1&e){var n=r.fc();r.ec(0,"button",St),r.kc("click",function(e){r.Dc(n);var t=r.pc().row;return r.pc(2).remove([t])}),r.Yb(1,"i",Pt),r.cc()}}var Dt=function(e){return[e]};function Lt(e,t){if(1&e){var n=r.fc();r.ec(0,"button",St),r.kc("click",function(e){r.Dc(n);var c=t.row;return r.pc(2).showDetail(c.person_id)}),r.Yb(1,"i",Et),r.cc(),r.Oc(2,Ft,2,0,"button",Gt)}if(2&e){var c=r.pc().ngIf,i=r.pc();r.Gc(2),r.vc("ngIf",i.authService.checkAuthorization(c,r.yc(1,Dt,i.Roles.ROLE_UPDATE_PERSONS)))}}var Mt=[3,"tableConfig","templates","data"],jt=function(e,t){return{options:e,contacts:t}};function At(e,t){if(1&e&&r.Yb(0,"app-abstract-table",Mt),2&e){r.pc();var n=r.Bc(4),c=r.Bc(2),i=r.pc();r.vc("tableConfig",i.personConfig)("templates",r.zc(3,jt,n,c))("data",i.personData)}}function Tt(e,t){if(1&e){var n=r.fc();r.ec(0,"div",yt),r.Oc(1,Nt,1,1,"ng-template",null,It,r.Pc),r.Oc(3,Lt,3,3,"ng-template",null,Ot,r.Pc),r.Oc(5,At,1,6,"app-abstract-table",Ct),r.ec(6,"button",kt),r.kc("click",function(e){return r.Dc(n),r.pc().createNew()}),r.ec(7,"mat-icon"),r.Qc(8,"add"),r.cc(),r.cc(),r.cc()}if(2&e){var c=r.pc();r.Gc(5),r.vc("ngIf",c.personData)}}var Bt=[{path:"",children:[{path:"",pathMatch:"full",component:function(){function e(e,t,n,r,c){this.route=e,this.router=t,this.authService=n,this.personService=r,this.notificationService=c,this.Roles=ht.a}return e.prototype.ngOnInit=function(){this.personData=this.personService.getPersons(),this.personConfig={columns:[{name:"contacts"},{name:"name",customContent:function(e){return(e.name||"")+" "+(e.surName||"")}},{name:"nick",label:"Nick",sort:!0},{name:"birthday",label:"Birthday",sort:!0},{name:"account",label:"Account",visible:!1},{name:"options",width:"9em"}],selectOptions:[{action:console.log,icon:"delete",label:"Delete"}],stickyHeader:!0,selection:"multi",paginateOptions:[5,10,20,50,100],pageSize:10,paginator:!0}},e.prototype.remove=function(e){var t=this,n=e.map(function(e){return t.personService.delete(e.person_id)});Object(vt.a)(n).subscribe(function(){t.notificationService.openSuccessNotification("Person successfully removed")},function(e){return t.notificationService.openErrorNotification(e)})},e.prototype.createNew=function(){this.router.navigateByUrl("/persons/new")},e.prototype.showDetail=function(e){this.router.navigateByUrl("/persons/"+e)},e.ngComponentDef=r.Rb({type:e,selectors:[["app-person-list"]],factory:function(t){return new(t||e)(r.Xb(fe.a),r.Xb(fe.g),r.Xb(bt.a),r.Xb(de),r.Xb(se.a))},consts:2,vars:3,template:function(e,t){1&e&&(r.Oc(0,Tt,9,1,"div",wt),r.qc(1,"async")),2&e&&r.vc("ngIf",r.rc(1,1,t.authService.user$))},directives:[a.k,ve.a,f.a,ft,gt.a],pipes:[a.b],styles:[".person-wrapper[_ngcontent-%COMP%]{padding-bottom:10em}.person-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.person-wrapper[_ngcontent-%COMP%]   .floating-add[_ngcontent-%COMP%]{position:fixed;right:3em;bottom:3em}"]}),e}()},{path:":id",component:et}]}],Yt=function(){function e(){}return e.ngModuleDef=r.Vb({type:e}),e.ngInjectorDef=r.Ub({factory:function(t){return new(t||e)},imports:[[fe.j.forChild(Bt)],fe.j]}),e}();fe.j.forChild(Bt),n.d(t,"PersonModule",function(){return Qt});var Qt=function(){function e(){}return e.ngModuleDef=r.Vb({type:e}),e.ngInjectorDef=r.Ub({factory:function(t){return new(t||e)},imports:[[c.a,Yt,i.a]]}),e}()},o0vB:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var r=n("cUzu"),c=n("TYT/"),i=n("F/XL"),o=n("QNcV"),a=n("9nlD"),s=function(){function e(e,t,n){this.http=e,this._authService=t,this._notificationService=n}return e.prototype.handleError=function(e,t){var n=this;return void 0===e&&(e="operation"),function(r){return n._notificationService.openErrorNotification(r),console.log(e+" failed: "+(r.message||r)),Object(i.a)(t)}},e.prototype.getHeaders=function(){var e=new r.h;return(e=(e=e.append("Content-type","application/json")).append("x-access-token",this._authService.getToken())).append("__auth_token__","3KJNUIHZobnkN3ZIa66ddsnsmvslDDD88d")},e.ngInjectableDef=c.Tb({token:e,factory:function(t){return new(t||e)(c.ic(r.c),c.ic(o.a),c.ic(a.a))},providedIn:null}),e}()}}]);