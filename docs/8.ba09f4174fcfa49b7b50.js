(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{qWfu:function(t,e,c){"use strict";c.r(e);var n=c("Valr"),a=c("TYT/"),i=c("NA4g"),o=c("3S9H"),r=c("IYfF"),l=c("9nlD"),m=c("0+Fs"),s=c("UG3F"),d=["class","example-container mat-elevation-z8",4,"ngIf"],f=[1,"example-container","mat-elevation-z8"],u=["mat-table","",3,"dataSource"],p=["matColumnDef","displayName"],h=["mat-header-cell","",4,"matHeaderCellDef"],g=["mat-cell","",4,"matCellDef"],b=["matColumnDef","email"],v=[3,"matColumnDef",4,"ngFor","ngForOf"],C=["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],P=["mat-row","",4,"matRowDef","matRowDefColumns"],w=["mat-header-cell",""];function O(t,e){1&t&&(a.ec(0,"th",w),a.Rc(1," Name"),a.cc())}var D=["mat-cell",""],R=["alt","",1,"example-header-image",3,"src"];function _(t,e){if(1&t&&(a.ec(0,"td",D),a.Yb(1,"img",R),a.ec(2,"span"),a.Rc(3),a.cc(),a.cc()),2&t){var c=e.$implicit;a.Hc(1),a.vc("src",c.photoURL,a.Gc),a.Hc(3),a.Sc(c.displayName)}}function y(t,e){1&t&&(a.ec(0,"th",w),a.Rc(1," Email"),a.cc())}function M(t,e){if(1&t&&(a.ec(0,"td",D),a.Rc(1),a.cc()),2&t){var c=e.$implicit;a.Hc(1),a.Tc(" ",c.email," ")}}var k=[3,"matColumnDef"];function x(t,e){if(1&t&&(a.ec(0,"th",w),a.Rc(1),a.cc()),2&t){var c=a.pc().$implicit;a.Hc(1),a.Tc(" ",c.replace("ROLE_","")," ")}}var S=[3,"checked","disabled","change"];function H(t,e){if(1&t){var c=a.fc();a.ec(0,"td",D),a.ec(1,"mat-checkbox",S),a.kc("change",function(t){a.Dc(c);var n=e.$implicit,i=a.pc().$implicit,o=a.pc().ngIf;return a.pc().changeRole(i,n,o,t)}),a.cc(),a.cc()}if(2&t){var n=e.$implicit,i=a.pc().$implicit,o=a.pc().ngIf,r=a.pc();a.Hc(1),a.vc("checked",n.roles[i])("disabled",!r.authService.checkAuthorization(o,r.Roles.ROLE_UPDATE_ACCOUNTS))}}function A(t,e){1&t&&(a.bc(0,k),a.Pc(1,x,2,1,"th",h),a.Pc(2,H,2,2,"td",g),a.ac()),2&t&&a.wc("matColumnDef",e.$implicit)}var N=["mat-header-row",""];function U(t,e){1&t&&a.Yb(0,"tr",N)}var $=["mat-row",""];function z(t,e){1&t&&a.Yb(0,"tr",$)}function I(t,e){if(1&t&&(a.ec(0,"div",f),a.ec(1,"table",u),a.bc(2,p),a.Pc(3,O,2,0,"th",h),a.Pc(4,_,4,2,"td",g),a.ac(),a.bc(5,b),a.Pc(6,y,2,0,"th",h),a.Pc(7,M,2,1,"td",g),a.ac(),a.Pc(8,A,3,1,"ng-container",v),a.Pc(9,U,1,0,"tr",C),a.Pc(10,z,1,0,"tr",P),a.cc(),a.cc()),2&t){var c=a.pc();a.Hc(1),a.vc("dataSource",c.accounts),a.Hc(8),a.vc("ngForOf",c.roles),a.Hc(9),a.vc("matHeaderRowDef",c.displayedColumns)("matHeaderRowDefSticky",!0),a.Hc(10),a.vc("matRowDefColumns",c.displayedColumns)}}var T=function(){function t(t,e){this.authService=t,this.notificationService=e,this.Roles=o.a,this.roles=Object.values(o.a),this.displayedColumns=["displayName","email"].concat(this.roles),this.accounts=[]}return t.prototype.ngOnInit=function(){var t=this;this.authService.getAccounts().subscribe(function(e){t.accounts=e})},t.prototype.changeRole=function(t,e,c,n){var a=this;this.authService.checkAuthorization(c,o.a.ROLE_UPDATE_ACCOUNTS)&&this.authService.updateRole(t,e,n.checked).subscribe(function(){a.notificationService.openSuccessNotification("Role updated")},function(t){return a.notificationService.openErrorNotification(t)})},t.ngComponentDef=a.Rb({type:t,selectors:[["app-account-list"]],factory:function(e){return new(e||t)(a.Xb(r.a),a.Xb(l.a))},consts:2,vars:3,template:function(t,e){1&t&&(a.Pc(0,I,11,5,"div",d),a.qc(1,"async")),2&t&&a.vc("ngIf",a.rc(1,1,e.authService.user$))},directives:[n.k,m.j,m.c,m.e,m.b,n.j,m.g,m.i,m.d,m.a,s.a,m.f,m.h],pipes:[n.b],styles:["table[_ngcontent-%COMP%]{width:100%}.example-header-image[_ngcontent-%COMP%]{background-size:cover;width:40px;height:40px;display:inline-block;border-radius:50%}@media screen and (max-width:960px){.mat-table22[_ngcontent-%COMP%]{border:0;vertical-align:middle}.mat-table22[_ngcontent-%COMP%]   caption[_ngcontent-%COMP%]{font-size:1em}.mat-table22[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%]{border:10px solid;clip:rect(0 0 0 0);height:1px;margin:-1px;padding:0;position:absolute;width:1px}.mat-table22[_ngcontent-%COMP%]   .mat-row[_ngcontent-%COMP%]{border-bottom:5px solid #ddd;display:block}.mat-table22[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]{border-bottom:1px solid #ddd;display:block;font-size:1em;text-align:right;font-weight:700;height:30px;margin-bottom:4%}.mat-table22[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:before{content:attr(data-label);float:left;text-transform:uppercase;font-weight:400;font-size:.85em}.mat-table22[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:last-child{border-bottom:0}.mat-table22[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:first-child{margin-top:4%}}"]}),t}(),E=c("DUip"),F=[{path:"",children:[{path:"",pathMatch:"full",component:T}]}],j=function(){function t(){}return t.ngModuleDef=a.Vb({type:t}),t.ngInjectorDef=a.Ub({factory:function(e){return new(e||t)},imports:[[E.k.forChild(F)],E.k]}),t}();E.k.forChild(F),c.d(e,"AccountsModule",function(){return Y});var Y=function(){function t(){}return t.ngModuleDef=a.Vb({type:t}),t.ngInjectorDef=a.Ub({factory:function(e){return new(e||t)},imports:[[i.a,j,n.c]]}),t}()}}]);