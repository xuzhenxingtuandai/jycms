function Marquee(){if(this.ID=document.getElementById(arguments[0])){this.Direction=this.Width=this.Height=this.DelayTime=this.WaitTime=this.CTL=this.StartID=this.Stop=this.MouseOver=0;this.Step=1;this.Timer=30;this.DirectionArray={top:0,up:0,bottom:1,down:1,left:2,right:3};if("number"==typeof arguments[1]||"string"==typeof arguments[1])this.Direction=arguments[1];"number"==typeof arguments[2]&&(this.Step=arguments[2]);"number"==typeof arguments[3]&&(this.Width=arguments[3]);"number"==typeof arguments[4]&&
(this.Height=arguments[4]);"number"==typeof arguments[5]&&(this.Timer=arguments[5]);"number"==typeof arguments[6]&&(this.DelayTime=arguments[6]);"number"==typeof arguments[7]&&(this.WaitTime=arguments[7]);"number"==typeof arguments[8]&&(this.ScrollStep=arguments[8]);this.ID.style.overflow=this.ID.style.overflowX=this.ID.style.overflowY="hidden";this.ID.noWrap=!0;this.IsNotOpera=-1==navigator.userAgent.toLowerCase().indexOf("opera");7<=arguments.length&&this.Start()}else alert('\u60a8\u8981\u8bbe\u7f6e\u7684"'+
arguments[0]+'"\u521d\u59cb\u5316\u9519\u8bef\r\n\u8bf7\u68c0\u67e5\u6807\u7b7eID\u8bbe\u7f6e\u662f\u5426\u6b63\u786e!'),this.ID=-1}
Marquee.prototype.Start=function(){if(-1!=this.ID){800>this.WaitTime&&(this.WaitTime=800);20>this.Timer&&(this.Timer=20);0==this.Width&&(this.Width=parseInt(this.ID.style.width));0==this.Height&&(this.Height=parseInt(this.ID.style.height));"string"==typeof this.Direction&&(this.Direction=this.DirectionArray[this.Direction.toString().toLowerCase()]);this.HalfWidth=Math.round(this.Width/2);this.HalfHeight=Math.round(this.Height/2);this.BakStep=this.Step;this.ID.style.width=this.Width+"px";this.ID.style.height=
this.Height+"px";"number"!=typeof this.ScrollStep&&(this.ScrollStep=1<this.Direction?this.Width:this.Height);var a=this;a.tempHTML=a.ID.innerHTML;a.ID.innerHTML=1>=a.Direction?"<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;'><tr><td>MSCLASS_TEMP_HTML</td></tr><tr><td>MSCLASS_TEMP_HTML</td></tr></table>".replace(/MSCLASS_TEMP_HTML/g,a.ID.innerHTML):0==a.ScrollStep&&0==a.DelayTime?a.ID.innerHTML+a.ID.innerHTML:"<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;display:inline;'><tr><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td></tr></table>".replace(/MSCLASS_TEMP_HTML/g,
a.ID.innerHTML);var c=this.Timer,d=this.DelayTime,e=this.WaitTime;a.StartID=function(){a.Scroll()};a.Continue=function(){1==a.MouseOver?setTimeout(a.Continue,d):(clearInterval(a.TimerID),a.CTL=a.Stop=0,a.TimerID=setInterval(a.StartID,c))};a.Pause=function(){a.Stop=1;clearInterval(a.TimerID);setTimeout(a.Continue,d)};a.Begin=function(){a.ClientScroll=1<a.Direction?a.ID.scrollWidth/2:a.ID.scrollHeight/2;1>=a.Direction&&a.ClientScroll<=a.Height+a.Step||1<a.Direction&&a.ClientScroll<=a.Width+a.Step?(a.ID.innerHTML=
a.tempHTML,delete a.tempHTML):(delete a.tempHTML,a.TimerID=setInterval(a.StartID,c),0>a.ScrollStep||(a.ID.onmousemove=function(b){if(0==a.ScrollStep&&1<a.Direction){b=b||window.event;if(window.event)if(a.IsNotOpera)a.EventLeft=b.srcElement.id==a.ID.id?b.offsetX-a.ID.scrollLeft:b.srcElement.offsetLeft-a.ID.scrollLeft+b.offsetX;else{a.ScrollStep=null;return}else a.EventLeft=b.layerX-a.ID.scrollLeft;a.Direction=a.EventLeft>a.HalfWidth?3:2;a.AbsCenter=Math.abs(a.HalfWidth-a.EventLeft);a.Step=Math.round(2*
a.AbsCenter*a.BakStep/a.HalfWidth)}},a.ID.onmouseover=function(){0!=a.ScrollStep&&(a.MouseOver=1,clearInterval(a.TimerID))},a.ID.onmouseout=function(){0==a.ScrollStep?0==a.Step&&(a.Step=1):(a.MouseOver=0,0==a.Stop&&(clearInterval(a.TimerID),a.TimerID=setInterval(a.StartID,c)))}))};setTimeout(a.Begin,e)}};
Marquee.prototype.Scroll=function(){switch(this.Direction){case 0:this.CTL+=this.Step;if(this.CTL>=this.ScrollStep&&0<this.DelayTime){this.ID.scrollTop+=this.ScrollStep+this.Step-this.CTL;this.Pause();break}else this.ID.scrollTop>=this.ClientScroll&&(this.ID.scrollTop-=this.ClientScroll),this.ID.scrollTop+=this.Step;break;case 1:this.CTL+=this.Step;if(this.CTL>=this.ScrollStep&&0<this.DelayTime){this.ID.scrollTop-=this.ScrollStep+this.Step-this.CTL;this.Pause();break}else 0>=this.ID.scrollTop&&(this.ID.scrollTop+=
this.ClientScroll),this.ID.scrollTop-=this.Step;break;case 2:this.CTL+=this.Step;if(this.CTL>=this.ScrollStep&&0<this.DelayTime){this.ID.scrollLeft+=this.ScrollStep+this.Step-this.CTL;this.Pause();break}else this.ID.scrollLeft>=this.ClientScroll&&(this.ID.scrollLeft-=this.ClientScroll),this.ID.scrollLeft+=this.Step;break;case 3:this.CTL+=this.Step,this.CTL>=this.ScrollStep&&0<this.DelayTime?(this.ID.scrollLeft-=this.ScrollStep+this.Step-this.CTL,this.Pause()):(0>=this.ID.scrollLeft&&(this.ID.scrollLeft+=
this.ClientScroll),this.ID.scrollLeft-=this.Step)}};