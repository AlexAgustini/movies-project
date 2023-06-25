"use strict";(self.webpackChunkmovies_project=self.webpackChunkmovies_project||[]).push([[544],{6544:(C,l,e)=>{e.r(l),e.d(l,{AccountModule:()=>F});var p=e(6895),g=e(1933),m=e(1779),d=e(5861),r=e(4006),v=e(3905),t=e(4650),f=e(4672),u=e(7009),s=e(9549),h=e(284),_=e(1572);function x(o,i){1&o&&(t.TgZ(0,"mat-error"),t._uU(1,"You must type a name"),t.qZA())}function A(o,i){1&o&&(t.TgZ(0,"mat-error"),t._uU(1,"Please type in a valid email"),t.qZA())}function M(o,i){1&o&&(t.TgZ(0,"mat-error"),t._uU(1,"Minimum password length is 6 characters."),t.qZA())}function y(o,i){1&o&&t._UZ(0,"mat-spinner")}function Z(o,i){if(1&o){const n=t.EpF();t.TgZ(0,"div",1)(1,"form",2)(2,"div",3)(3,"mat-form-field")(4,"mat-label"),t._uU(5,"Name"),t.qZA(),t.TgZ(6,"input",4),t.NdJ("input",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.userForm.controls.name)}),t.qZA(),t.YNc(7,x,2,0,"mat-error",5),t.qZA()(),t.TgZ(8,"div",3)(9,"mat-form-field")(10,"mat-label"),t._uU(11,"Email"),t.qZA(),t.TgZ(12,"input",6),t.NdJ("input",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.userForm.controls.email)}),t.qZA(),t.YNc(13,A,2,0,"mat-error",5),t.qZA()(),t.TgZ(14,"div",3)(15,"mat-form-field")(16,"mat-label"),t._uU(17,"Password"),t.qZA(),t.TgZ(18,"input",7),t.NdJ("input",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.userForm.controls.password)}),t.qZA(),t.YNc(19,M,2,0,"mat-error",5),t.qZA()(),t.TgZ(20,"div",8)(21,"button",9),t._uU(22," Cancel "),t.qZA(),t.TgZ(23,"button",10),t.NdJ("click",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.save())}),t.YNc(24,y,1,0,"mat-spinner",5),t._uU(25," Save "),t.qZA()()()()}if(2&o){const n=t.oxw();t.xp6(1),t.Q6J("formGroup",n.userForm),t.xp6(6),t.Q6J("ngIf",n.userForm.controls.name.touched&&n.userForm.controls.name.invalid),t.xp6(6),t.Q6J("ngIf",n.userForm.controls.email.touched&&n.userForm.controls.email.invalid),t.xp6(6),t.Q6J("ngIf",n.userForm.controls.password.touched&&n.userForm.controls.password.invalid),t.xp6(4),t.Q6J("disabled",n.isSaving),t.xp6(1),t.Q6J("ngIf",n.isSaving)}}const b=[{path:"",component:(()=>{class o{constructor(n,a,c){this.fb=n,this.authService=a,this.matSnackBarController=c}ngOnInit(){this.getFormData()}getFormData(){var n=this;return(0,d.Z)(function*(){n.isLoading=!0;const a=yield(0,v.z)(n.authService.currentUser$);console.log(a),n.userForm=n.fb.group({name:[a?.displayName,r.kI.required],email:[a?.email,r.kI.email],password:["",r.kI.minLength(6)]}),n.isLoading=!1})()}save(){var n=this;return(0,d.Z)(function*(){if(n.userForm.invalid)return void n.userForm.markAllAsTouched();const a={name:n.userForm.get("name")?.value,email:n.userForm.get("email")?.value,password:n.userForm.get("password")?.value};n.isSaving=!0;try{yield n.authService.updateUserData(a).then(()=>{n.isSaving=!1,n.matSnackBarController.open("User saved","",{duration:1500,horizontalPosition:"center",panelClass:"custom-snackbar"})})}catch{n.isSaving=!1,n.matSnackBarController.open("Something went wrong, please try again later.","",{panelClass:"custom-snackbar"})}})()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(r.qu),t.Y36(f.e),t.Y36(u.ux))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-account"]],decls:1,vars:1,consts:[["class","max-w-full mt-4 rounded-[10px] bg-[#0F2027] p-4 container",4,"ngIf"],[1,"max-w-full","mt-4","rounded-[10px]","bg-[#0F2027]","p-4","container"],[1,"w-5/12",3,"formGroup"],[1,"field-wrapper"],["type","text","matInput","","formControlName","name",3,"input"],[4,"ngIf"],["type","email","matInput","","formControlName","email",3,"input"],["type","password","matInput","","formControlName","password",3,"input"],[1,"mt-6","flex","justify-between","items-center"],["routerLink","/home",1,"bg-[#c6c6c6]","transition-all","hover:bg-gray-100","text-gray-800","font-semibold","py-2","px-4","border","border-gray-400","rounded","shadow"],[1,"bg-white","gap-3","d-flex","hover:bg-gray-100","text-gray-800","font-semibold","py-2","px-4","border","border-gray-400","rounded","shadow",3,"disabled","click"]],template:function(n,a){1&n&&t.YNc(0,Z,26,6,"div",0),2&n&&t.Q6J("ngIf",!a.isLoading)},dependencies:[p.O5,s.KE,s.hX,s.TO,h.Nt,_.Ou,m.rH,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:[".field-wrapper[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column}.field-wrapper[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:red!important;padding:0}[_nghost-%COMP%]     mat-form-field .mdc-text-field--filled{background-color:#203a43!important}mat-form-field[_ngcontent-%COMP%]{background-color:transparent;box-shadow:#0000000d 0 6px 24px,#00000014 0 0 0 1px!important;width:100%;color:#fff!important}mat-form-field[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%], mat-form-field[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], mat-form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{color:#fff!important}mat-spinner[_ngcontent-%COMP%]{width:20px!important;height:20px!important}mat-spinner[_ngcontent-%COMP%]  circle{stroke:#203a43!important}@media (max-width: 500px){.container[_ngcontent-%COMP%]{padding:1rem!important}.container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:auto!important}}"]}),o})()}];let w=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[m.Bz.forChild(b),m.Bz]}),o})(),F=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[p.ez,g.q,w,s.lN,r.UX,u.ZX]}),o})()},3905:(C,l,e)=>{e.d(l,{z:()=>m});var p=e(6805),g=e(930);function m(d,r){const v="object"==typeof r;return new Promise((t,f)=>{const u=new g.Hp({next:s=>{t(s),u.unsubscribe()},error:f,complete:()=>{v?t(r.defaultValue):f(new p.K)}});d.subscribe(u)})}}}]);