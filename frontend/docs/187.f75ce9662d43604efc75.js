"use strict";(self.webpackChunkenspect=self.webpackChunkenspect||[]).push([[187],{6187:(y,g,e)=>{e.r(g),e.d(g,{RegionsModule:()=>h});var c=e(8583),p=e(3256),u=e(9247),t=e(8720),r=e(8239),f=e(5319),m=e(8629),b=e(9522),C=e(3557),M=e(9598);const O=["buttonRegion"];let P=(()=>{class o extends b.p{constructor(n){super(),this.dataState=n,this.timeperiods={initRegionActive:1.69,initRegionInactive:4.1,regionActive:2,regionInactive:2.4,finishTimeRegionActive:1.25,finishTimeRegionInactive:3.3},this.initDelay=0,this.subs=new f.w,this.animationInProgress=!0}ngOnInit(){this.region="region_"+this.regionIndex,this.options=this.createOptions(C.W[this.region],!1),super.ngOnInit(),this.setSubscriptionSelectedRegions()}ngAfterViewInit(){var n=this;return(0,r.Z)(function*(){yield n.handleIntro(),n.animationInProgress=!1})()}setSubscriptionSelectedRegions(){this.subscriptionSelectedRegions=this.dataState.selectedRegions$.subscribe(n=>{this.selectedRegions=n})}handleIntro(){var n=this;return(0,r.Z)(function*(){const a=n.selectedRegions[n.region];let[i,l]=a?[1e3*n.timeperiods.initRegionActive,n.timeperiods.finishTimeRegionActive]:[1e3*n.timeperiods.initRegionInactive,n.timeperiods.finishTimeRegionInactive];yield n.playAnimation(i,n.initDelay),n.currentTime=l})()}onClick(){var n=this;return(0,r.Z)(function*(){if(!n.animationInProgress){n.animationInProgress=!0;const a=n.selectedRegions[n.region];let[i,l]=a?[1e3*n.timeperiods.regionActive,n.timeperiods.finishTimeRegionInactive]:[1e3*n.timeperiods.regionInactive,n.timeperiods.finishTimeRegionActive];return yield n.playAnimation(i),n.currentTime=l,n.selectedRegions[n.region]=!n.selectedRegions[n.region],n.dataState.setGenericRegions(n.selectedRegions),n.animationInProgress=!1,Promise.resolve()}})()}playAnimation(n,a=0){var i=this;return(0,r.Z)(function*(){yield(0,m.Vs)(a),i.play(),yield(0,m.Vs)(n),i.pause()})()}loadedMetaData(){this.duration=this.player.duration()}ngOnDestroy(){this.subs.unsubscribe()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(M.W))},o.\u0275cmp=t.Xpm({type:o,selectors:[["button-region"]],viewQuery:function(n,a){if(1&n&&t.Gf(O,7),2&n){let i;t.iGM(i=t.CRH())&&(a.videoElement=i.first)}},inputs:{regionIndex:"regionIndex"},features:[t.qOj],decls:3,vars:0,consts:[[1,"button-region",3,"click"],["muted","",3,"loadedmetadata"],["buttonRegion",""]],template:function(n,a){1&n&&(t.TgZ(0,"div",0),t.NdJ("click",function(){return a.onClick()}),t.TgZ(1,"video",1,2),t.NdJ("loadedmetadata",function(){return a.loadedMetaData()}),t.qZA(),t.qZA())},styles:[".button-region[_ngcontent-%COMP%]{opacity:1}.sepia-flicker[_ngcontent-%COMP%]{animation-name:sepia-flicker;animation-duration:1s;animation-iteration-count:1;animation-direction:normal;animation-fill-mode:forwards;animation-timing-function:ease-in-out}@keyframes sepia-flicker{0%{filter:sepia(1);opacity:1}10%{filter:sepia(.9);opacity:0}22%{filter:sepia(1);opacity:1}33%{filter:sepia(.9);opacity:0}44%{filter:sepia(1);opacity:1}55%{filter:sepia(.9);opacity:0}66%{filter:sepia(1);opacity:1}77%{filter:sepia(.9);opacity:0}88%{filter:sepia(.5);opacity:1}99%{filter:sepia(0);opacity:1}}"]}),o})();function _(o,s){if(1&o&&(t.TgZ(0,"div"),t.TgZ(1,"div"),t._UZ(2,"button-region",2),t.qZA(),t.qZA()),2&o){const n=s.index;t.xp6(1),t.Gre("button-",n,""),t.xp6(1),t.Q6J("regionIndex",n)}}const d=[{path:"",component:(()=>{class o{constructor(){this.regions=u.UA}ngOnInit(){}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-regions"]],decls:2,vars:1,consts:[[1,"regions"],[4,"ngFor","ngForOf"],[3,"regionIndex"]],template:function(n,a){1&n&&(t.TgZ(0,"div",0),t.YNc(1,_,3,4,"div",1),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngForOf",a.regions))},directives:[c.sg,P],styles:[".regions[_ngcontent-%COMP%]{position:absolute;height:0px;width:0px;z-index:2}@media (max-width: 568px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-34%,-30%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:82px;transform:translate(-34%,-30%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:164px;transform:translate(-34%,-30%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:246px;transform:translate(-34%,-30%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:328px;transform:translate(-34%,-30%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:410px;transform:translate(-193.5%,4%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:492px;transform:translate(-193.5%,4%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:574px;transform:translate(-193.5%,4%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:656px;transform:translate(-193.5%,4%) scale(.32)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:738px;transform:translate(-193.5%,4%) scale(.32)}}@media (min-width: 569px) and (max-width: 667px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-31%,-28%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:92px;transform:translate(-31%,-28%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:184px;transform:translate(-31%,-28%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:276px;transform:translate(-31%,-28%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:368px;transform:translate(-31%,-28%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:460px;transform:translate(-210%,12%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:552px;transform:translate(-210%,12%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:644px;transform:translate(-210%,12%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:736px;transform:translate(-210%,12%) scale(.38)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:828px;transform:translate(-210%,12%) scale(.38)}}@media (min-width: 668px) and (max-width: 736px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-28%,-26%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:106px;transform:translate(-28%,-26%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:212px;transform:translate(-28%,-26%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:318px;transform:translate(-28%,-26%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:424px;transform:translate(-28%,-26%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:530px;transform:translate(-234%,16%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:636px;transform:translate(-234%,16%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:742px;transform:translate(-234%,16%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:848px;transform:translate(-234%,16%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:954px;transform:translate(-234%,16%) scale(.44)}}@media (min-width: 737px) and (max-width: 740px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-28%,-28%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:106px;transform:translate(-28%,-28%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:212px;transform:translate(-28%,-28%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:318px;transform:translate(-28%,-28%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:424px;transform:translate(-28%,-28%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:530px;transform:translate(-234%,14%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:636px;transform:translate(-234%,14%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:742px;transform:translate(-234%,14%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:848px;transform:translate(-234%,14%) scale(.44)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:954px;transform:translate(-234%,14%) scale(.44)}}@media (min-width: 741px) and (max-width: 812px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-26%,-28%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:116px;transform:translate(-26%,-28%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:232px;transform:translate(-26%,-28%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:348px;transform:translate(-26%,-28%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:464px;transform:translate(-26%,-28%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:580px;transform:translate(-252%,16%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:696px;transform:translate(-252%,16%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:812px;transform:translate(-252%,16%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:928px;transform:translate(-252%,16%) scale(.48)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1044px;transform:translate(-252%,16%) scale(.48)}}@media (min-width: 813px) and (max-width: 844px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-26%,-28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:124px;transform:translate(-26%,-28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:248px;transform:translate(-26%,-28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:372px;transform:translate(-26%,-28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:496px;transform:translate(-26%,-28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:620px;transform:translate(-268%,19%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:744px;transform:translate(-268%,19%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:868px;transform:translate(-268%,19%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:992px;transform:translate(-268%,19%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1116px;transform:translate(-268%,19%) scale(.5)}}@media (min-width: 845px) and (max-width: 848px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-26%,-24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:124px;transform:translate(-26%,-24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:248px;transform:translate(-26%,-24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:372px;transform:translate(-26%,-24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:496px;transform:translate(-26%,-24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:620px;transform:translate(-268%,24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:744px;transform:translate(-268%,24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:868px;transform:translate(-268%,24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:992px;transform:translate(-268%,24%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1116px;transform:translate(-268%,24%) scale(.5)}}@media (min-width: 849px) and (max-width: 854px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-26%,-22%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:124px;transform:translate(-26%,-22%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:248px;transform:translate(-26%,-22%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:372px;transform:translate(-26%,-22%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:496px;transform:translate(-26%,-22%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:620px;transform:translate(-268%,28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:744px;transform:translate(-268%,28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:868px;transform:translate(-268%,28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:992px;transform:translate(-268%,28%) scale(.5)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1116px;transform:translate(-268%,28%) scale(.5)}}@media (min-width: 855px) and (max-width: 897px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-23%,-26%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:128px;transform:translate(-23%,-26%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:256px;transform:translate(-23%,-26%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:384px;transform:translate(-23%,-26%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:512px;transform:translate(-23%,-26%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:640px;transform:translate(-272%,24%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:768px;transform:translate(-272%,24%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:896px;transform:translate(-272%,24%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:1024px;transform:translate(-272%,24%) scale(.52)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1152px;transform:translate(-272%,24%) scale(.52)}}@media (min-width: 898px) and (max-width: 927px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-23%,-25%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:134px;transform:translate(-23%,-25%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:268px;transform:translate(-23%,-25%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:402px;transform:translate(-23%,-25%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:536px;transform:translate(-23%,-25%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:670px;transform:translate(-284%,26%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:804px;transform:translate(-284%,26%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:938px;transform:translate(-284%,26%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:1072px;transform:translate(-284%,26%) scale(.54)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1206px;transform:translate(-284%,26%) scale(.54)}}@media (min-width: 928px) and (max-width: 960px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-21%,-22%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:138px;transform:translate(-21%,-22%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:276px;transform:translate(-21%,-22%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:414px;transform:translate(-21%,-22%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:552px;transform:translate(-21%,-22%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:690px;transform:translate(-290%,33%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:828px;transform:translate(-290%,33%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:966px;transform:translate(-290%,33%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:1104px;transform:translate(-290%,33%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1242px;transform:translate(-290%,33%) scale(.56)}}@media (min-width: 961px) and (max-width: 1024px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-21%,-20%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:138px;transform:translate(-21%,-20%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:276px;transform:translate(-21%,-20%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:414px;transform:translate(-21%,-20%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:552px;transform:translate(-21%,-20%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:690px;transform:translate(-290%,35%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:828px;transform:translate(-290%,35%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:966px;transform:translate(-290%,35%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:1104px;transform:translate(-290%,35%) scale(.56)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1242px;transform:translate(-290%,35%) scale(.56)}}@media (min-width: 1025px) and (max-width: 1281px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-14%,-15%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:174px;transform:translate(-14%,-15%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:348px;transform:translate(-14%,-15%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:522px;transform:translate(-14%,-15%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:696px;transform:translate(-14%,-15%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:870px;transform:translate(-353%,54%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:1044px;transform:translate(-353%,54%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:1218px;transform:translate(-353%,54%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:1392px;transform:translate(-353%,54%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1566px;transform:translate(-353%,54%) scale(.7)}}@media (min-width: 1282px) and (max-width: 1367px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(72%,142%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:174px;transform:translate(72%,142%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:348px;transform:translate(72%,142%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:522px;transform:translate(72%,142%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:696px;transform:translate(72%,142%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:870px;transform:translate(-267%,212%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:1044px;transform:translate(-267%,212%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:1218px;transform:translate(-267%,212%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:1392px;transform:translate(-267%,212%) scale(.7)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1566px;transform:translate(-267%,212%) scale(.7)}}@media (min-width: 1368px) and (max-width: 1600px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-12%,-14%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:172px;transform:translate(-12%,-14%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:344px;transform:translate(-12%,-14%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:516px;transform:translate(-12%,-14%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:688px;transform:translate(-12%,-14%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:860px;transform:translate(-347%,56%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:1032px;transform:translate(-347%,56%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:1204px;transform:translate(-347%,56%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:1376px;transform:translate(-347%,56%) scale(.72)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:1548px;transform:translate(-347%,56%) scale(.72)}}@media (min-width: 1601px) and (orientation: landscape){.regions[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:pink}.regions[_ngcontent-%COMP%]   .button-0[_ngcontent-%COMP%]{position:absolute;margin-left:0;transform:translate(-2%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-1[_ngcontent-%COMP%]{position:absolute;margin-left:232px;transform:translate(-2%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-2[_ngcontent-%COMP%]{position:absolute;margin-left:464px;transform:translate(-2%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-3[_ngcontent-%COMP%]{position:absolute;margin-left:696px;transform:translate(-2%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-4[_ngcontent-%COMP%]{position:absolute;margin-left:928px;transform:translate(-2%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-5[_ngcontent-%COMP%]{position:absolute;margin-left:1160px;transform:translate(-454%,90%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-6[_ngcontent-%COMP%]{position:absolute;margin-left:1392px;transform:translate(-454%,90%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-7[_ngcontent-%COMP%]{position:absolute;margin-left:1624px;transform:translate(-454%,90%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-8[_ngcontent-%COMP%]{position:absolute;margin-left:1856px;transform:translate(-454%,90%) scale(.95)}.regions[_ngcontent-%COMP%]   .button-9[_ngcontent-%COMP%]{position:absolute;margin-left:2088px;transform:translate(-454%,90%) scale(.95)}}"]}),o})()}];let x=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[p.Bz.forChild(d)],p.Bz]}),o})(),h=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[c.ez,x]]}),o})()}}]);