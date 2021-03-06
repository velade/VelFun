/********************
腳本名:VelFun
版本號:3.9.2
作　者:龍翔翎(Velade)

更新日期:2018/11/26
********************/
;(function($){
	var msgfun=function(e){return true;};
	var nowfocus=null;
	var openall=false;
	var isimethod=false;
	var vel_hasmenu=false;
	var vel_menufuns=new Object();
	var vel_hasback=0;

	$.extend({
		Msgbox:function (Message,Title,Type,Position,callback) {
			var msg=Message || "";
			var title=Title || "";
			var ty=Type || function(e){return true;};
			var pos=Position || ['calc(50% - 225px)','30%'];
			msgfun=callback || "";
			if (typeof title === "function") {
				msgfun=title;
				title="";
			}
			if (typeof ty === "function") {
				msgfun=ty;
				ty="";
			}
			if (typeof pos === "function") {
				msgfun=pos;
				pos=['calc(50% - 225px)','30%'];
			}

			var pwidth=$("html").width();
			if(pwidth*0.8<450){
				var offset=pwidth*0.8/2;
				pos=['calc(50% - '+offset+'px)','30%'];
			}

			$("body").css({"transition":"300ms"});

			var appstr="<div class='box-3d' id='_MessageBox_' style='width:100%;height:100%;display:block;left:0px;top:0px;z-index:1000;'><div class='card' style='transform:scale(0.8);opacity:0;max-width:80%;width:450px;height:200px;left:"+pos[0]+";top:"+pos[1]+";'>";
			if (title!="") {
				appstr+="<div class='cardtitle'>"+title+"</div>";
				appstr+="<div class='cardcontent'>"+msg;
			}else {
				appstr+="<div class='cardcontent' style='top:5px;height:calc(100% - 10px);'>"+msg;
			}

			if (ty=="" || ty==0 || ty=="MSG_OK") {
				appstr+="<div class='buttonarea'><span id='_MsgOK_' onclick='$.MsgRe(true)' class='cbutton'>确定</span></div>";
			}else if (ty==1 || ty=="MSG_YES_NO") {
				appstr+="<div class='buttonarea'><span id='_MsgYes_' onclick='$.MsgRe(true)' class='cbutton'>是</span><span id='_MsgNo_' onclick='$.MsgRe(false)' class='cbutton'>否</span></div>";
			}else if (ty==2 || ty=="MSG_OK_Cancel") {
				appstr+="<div class='buttonarea'><span id='_MsgOK_' onclick='$.MsgRe(true)' class='cbutton'>确定</span><span id='_MsgCancel_' onclick='$.MsgRe(false)' class='cbutton'>取消</span></div>";
			}
			appstr+="</div></div></div>";
			$("body").after(appstr);
			$("body").back(40);

			setTimeout(function () {
				$("#_MessageBox_ .card").css({"transform":"scale(1)","opacity":"1"});
			},10)
		},
		MsgRe:function (re) {
			$("#_MessageBox_ .card").css({"transform":"scale(0.8)","opacity":"0"});
			$("body").unback();
			setTimeout(function () {
				$("#_MessageBox_").remove();
			},300)
			msgfun(re);
		},
		Msgbox_lite:function(Message,Title,Type,Position,callback){
			var msg=Message || "";
			var title=Title || "";
			var ty=Type || function(e){return true;};
			var pos=Position || ['calc(50% - 225px)','30%'];
			msgfun=callback || "";
			if (typeof title === "function") {
				msgfun=title;
				title="";
			}
			if (typeof ty === "function") {
				msgfun=ty;
				ty="";
			}
			if (typeof pos === "function") {
				msgfun=pos;
				pos=['calc(50% - 225px)','30%'];
			}

			var pwidth=$("html").width();
			if(pwidth*0.8<450){
				var offset=pwidth*0.8/2;
				pos=['calc(50% - '+offset+'px)','30%'];
			}

			var appstr="<div class='box-3d' id='_MessageBox_' style='width:100%;height:100%;display:block;left:0px;top:0px;z-index:1000;background-color:rgba(0,0,0,0.5)'><div class='card_noani' style='transform:scale(0.8);opacity:0;max-width:80%;width:450px;height:200px;left:"+pos[0]+";top:"+pos[1]+";'>";
			if (title!="") {
				appstr+="<div class='cardtitle'>"+title+"</div>";
				appstr+="<div class='cardcontent'>"+msg;
			}else {
				appstr+="<div class='cardcontent' style='top:5px;height:calc(100% - 10px);'>"+msg;
			}

			if (ty=="" || ty==0 || ty=="MSG_OK") {
				appstr+="<div class='buttonarea'><span id='_MsgOK_' onclick='$.MsgRe(true)' class='cbutton'>确定</span></div>";
			}else if (ty==1 || ty=="MSG_YES_NO") {
				appstr+="<div class='buttonarea'><span id='_MsgYes_' onclick='$.MsgRe(true)' class='cbutton'>是</span><span id='_MsgNo_' onclick='$.MsgRe(false)' class='cbutton'>否</span></div>";
			}else if (ty==2 || ty=="MSG_OK_Cancel") {
				appstr+="<div class='buttonarea'><span id='_MsgOK_' onclick='$.MsgRe(true)' class='cbutton'>确定</span><span id='_MsgCancel_' onclick='$.MsgRe(false)' class='cbutton'>取消</span></div>";
			}
			appstr+="</div></div></div>";
			$("body").after(appstr);

			setTimeout(function () {
				$("#_MessageBox_ .card_noani").css({"transform":"scale(1)","opacity":"1"});
			},10)
		},
		Options:function (opt_arr,title) {
			var title = title || "";
			var tithtml = "";
			/*if(title!=""){
				tithtml = "<div class='_OPTITLE_'>"+title+"</div>";
			}*/
			var ulhtml = "<ul class='_OPTIONS_'>";
			var lihtml = "";
			if(title!=""){
				lihtml = "<li class='_OPTITLE_'>"+title+"</li>";
			}
			$.each(opt_arr,function (index,value){
				lihtml += "<li class='vel_option' style='transform:scale(0.8);opacity:0;'><span>" + index + "</span></li>";
			})
			var ophtml = ulhtml + lihtml + "</ul>";
			$("body").css({"transition":"300ms"});
			$("body").after(ophtml);
			$("body").back(20);
			$("._OPTIONS_ li").each(function(index,item){
				var _this=$(this);
				setTimeout(function(){
					_this.css({"transform":"scale(1)","opacity":"1"});
				},100*index);
			})

			$(document).on("click","._OPTIONS_ li.vel_option",function(){
				var _this=$(this);
				_this.css({"transform":"scale(0.95)"});
				setTimeout(function(){
					$("._OPTIONS_ li").css({"transform":"scale(0.95)","opacity":"0"});
					$("body").unback();
				},200);
				setTimeout(function(){
					$(document).off("click","._OPTIONS_ li.vel_option");
					$("._OPTIONS_").remove();
				},500);
				opt_arr[$(this).text()]();
			})
		}
	});
	$.fn.extend({
		CustomContextmenu:function (funarr) {
			var vel_funthis=$(this);
			vel_funthis.attr("data-contextmenuid",Math.floor(Math.random()*89999999+10000000));
			var vel_funthisid=vel_funthis.attr("data-contextmenuid");

			var menucontant='<ul class="uselect contextmenu" for="'+vel_funthisid+'" style="width:100px;transform:scale(0);transform-origin:0 0 0;">';
			vel_menufuns[vel_funthisid]=new Object();

			$.each(funarr,function (index,value) {
				var imgurl=index.match(/icon\((.*?)\)/);
				if (imgurl) {
					var lititle=index.replace(/icon\((.*?)\)/,'');
					vel_menufuns[vel_funthisid][lititle]=funarr[index];
					menucontant+='<li><img src="'+imgurl[1]+'">'+lititle+'</li>';
				}else {
					vel_menufuns[vel_funthisid][index]=funarr[index];
					menucontant+='<li>'+index+'</li>';
				}

			})

			menucontant+='</ul>';
			$("body").append(menucontant);

			$(document).bind("contextmenu",function (e) {
				e.preventDefault();
			})
			$(document).on("mousedown","[data-contextmenuid='"+vel_funthisid+"']",function (e) {
				if (e.button==2) {
					var X=e.pageX;
					var Y=e.pageY;
					$(".contextmenu[for='"+vel_funthisid+"']").css({"left":X,"top":Y,"transform":"scale(1)"});
					setTimeout(function () {
						vel_hasmenu=true;
					},100)
				}
			})

			$(document).on("click",".contextmenu[for='"+vel_funthisid+"'] li",function(){
				vel_menufuns[vel_funthisid][$(this).text()]();
			})

		},
		setSelect:function () {
			var vel_t=$(this);
			var vel_tname=vel_t.attr('name');
			var vel_tsizeW=vel_t.width();
			var vel_tsizeH=vel_t.height();
			var vel_tsize=vel_t.css('font-size');
			var vel_ulhtml=this[0].outerHTML;
			var vel_isEnable=($("ul[name='"+vel_tname+"'][disable],ul[name='"+vel_tname+"'][readonly]").length>0)?false:true;
			vel_t.before('<div style="display:inline-block;position:relative;width:'+vel_tsizeW+'px;height:'+vel_tsizeH+'px;"><div class="uselectarea" for="'+vel_tname+'" style="font-size:'+vel_tsize+';width:'+vel_tsizeW+'px;height:'+vel_tsizeH+'px;line-height:'+vel_tsizeH+'px;background:rgba(250,250,250,0.9);border-radius:3px;"><label></label><input type="hidden" name="'+vel_tname+'" /></div>'+vel_ulhtml+'</div>');
			vel_t.remove();
			vel_t=$("ul[name='"+vel_tname+"']");
			vel_t.addClass('uselect');
			vel_t.css({
				"top":$(".uselectarea[for='"+vel_tname+"']").height()+"px",
				"left":"0px",
				"height":"auto",
				"margin":"0",
				"transform":"scaleY(0)",
				"position":"absolute",
				"border-radius":"0px 0px 3px 3px"});
			var nowselected=$("ul[name='"+vel_tname+"'] li[selected]");
			var nowtext=nowselected.text();
			var nowval=nowselected.attr('value');
			var showtext=$(".uselectarea[for='"+vel_tname+"'] label");
			var realval=$("input[type='hidden'][name='"+vel_tname+"']");
			var realul=$("ul[name='"+vel_tname+"']");

			if (nowselected.length>0) {
				showtext.text(nowtext);
				realval.val(nowval);
			}else {
				var firstone=$("ul[name='"+vel_tname+"'] li").eq(0);
				firstone.attr("selected","");
				showtext.text(firstone.text());
				realval.val(firstone.attr("value"));
			}
			$(document).on("click",".uselectarea[for='"+vel_tname+"']",function () {
				if (!vel_hasmenu) {
					var vel_H=$(this).height();
					realul.css({"top":vel_H,"transform":"scaleY(1)"});
					setTimeout(function () {
						vel_hasmenu=true;
					},100)
				}
			})

			$(document).on("click","ul[name='"+vel_tname+"'] li",function () {
				var vel_this=$(this);
				realval.val(vel_this.attr('value'));
				showtext.text(vel_this.text());
				$("ul[name='"+vel_tname+"'] li[selected]").removeAttr('selected');
				$(this).attr('selected','');
				$("ul[name='"+vel_tname+"']").trigger('change');
			})

			$(document).on("change","ul[name='"+vel_tname+"'] li",function () {
				alert();
			})

			if (!vel_isEnable) {
				$(".uselectarea[for='"+vel_tname+"']").css("background","#EEE");
				$(document).off("click",".uselectarea[for='"+vel_tname+"']");
			}

		},
		hasAttr:function (at) {
			return (typeof $(this).attr(at)=="undefined")?false:true;
		},
		liselect:function (data) {
			var _ul=$(this);
			$(document).ready(function () {
				if (_ul.hasAttr('select')) {
					$("li[value='"+data+"']",_ul).click();
				}
			})
			return $("li[selected]",_ul).attr("value");
		},
		lidisable:function (status) {
			var vel_usd=$(".uselectarea[for='"+$(this).attr('name')+"']");
			if (status) {
				vel_usd.css("background","#EEE");
				$(document).off("click",".uselectarea[for='"+$(this).attr('name')+"']");
			}else {
				vel_usd.css("background","");
				var realul=$("ul[name='"+$(this).attr('name')+"']");
				$(document).on("click",".uselectarea[for='"+$(this).attr('name')+"']",function () {realul.css({"transform":"scaleY(1)"});});
			}
		},
		lihide:function (status) {
			var vel_usd=$(".uselectarea[for='"+$(this).attr('name')+"']").parent();
			if (status) {
				vel_usd.css("display","none");
			}else {
				vel_usd.css("display","inline-block");
			}
		},
		setColor:function (col) {
			if ($(this).hasAttr('coloricon')) {
				$(this).css({'filter':'drop-shadow('+$(this).width()+'px 0 0 '+col+')'});
			}else {
				console.error($(this)[0].tagName+"#"+$(this)[0].id+"."+$(this)[0].className+'元素不是coloricon元素');
			}
		},
		fourStatus:function(normal,hover,down,up,time,target){
			var time = time || 0;
			var clear;
			target = target || this;
			target = $(target);
			var _this=$(this);
			target.addClass(normal);
			target.css("transition",time+"ms");
			_this.hover(function(){
				target.addClass(hover);
			},function(){
				target.removeClass(hover);
			})

			if(typeof down == "function"){
				_this.on("mousedown touchstart",function(e){
					e.preventDefault();
					down();
				})
			}else{
				_this.on("mousedown touchstart",function(e){
					e.preventDefault();
					clearTimeout(clear);
					target.removeClass(up).addClass(down);
				})
			}

			if(typeof up == "function"){
				_this.on("mouseup touchend",function(){
					up();
				})
			}else{
				_this.on("mouseup touchend",function(){
					target.removeClass(down).addClass(up);
					clear=setTimeout(function(){
						target.removeClass(up);
					},time);
				})
			}

			if(typeof up == "function"){
				$(document).on("mouseup touchend",function(){
					up();
				})
			}else{
				$(document).on("mouseup touchend",function(){
					if(target.hasClass(down)){
						target.removeClass(down).addClass(up);
						clear=setTimeout(function(){
							target.removeClass(up);
						},time);
					}
				})
			}
		},
		back:function(size,nodark){
			if(!$(this).hasAttr("back")){
				vel_hasback++;
			}
			$(this).attr('back','');
			if(/rgba\(0\,(\s)?0\,(\s)?0\,(\s)?0\)/i.test($(this).css('background-color'))){
				$(this).css({"background-color":"white"});
			}
			var th=$(this).height();
			$($(this).parent()).css({"background-color":"black","height":th+"px"});
			nodark = nodark || false;
			var sx=1-size*2/$(this).width();
			var scrtop=$($(this).parent()).scrollTop();
			$(this).css({"transform-origin":"50% "+scrtop+"px 0px","transform":"scale("+sx+","+sx+") translate(0px,"+size+"px)"});
			if(!nodark){
				$(this).addClass("dark");
			}
			nowtops=$(document).scrollTop();
			$(document).scroll(function(){
				if(nowtops!=-1){
					$(document).scrollTop(nowtops);
				}
			})
		},
		unback:function(){
			vel_hasback--;
			var _this=$(this);
			_this.css({"transform":""});
			_this.removeClass("dark");
			var delayc=parseFloat(_this.css("transition-duration"))*1000;
			if(vel_hasback<=0){
				setTimeout(function(){
					if(/(white|rgba\(0\,(\s)?0\,(\s)?0\,(\s)?1\)|rgba\(0\,(\s)?0\,(\s)?0\))/i.test(_this.css('background-color'))){
						_this.css({"background-color":""});
					}
					$(_this.parent()).css({"background-color":"white"});
					nowtops=-1;
				},delayc)
			}
		},
		autoTile:function(isInlineBlock){
			var _items = $(this);
			/*初始化*/
			_items.css({"margin-left":"0px","margin-right":"0px"});
			/*END*/
			if(isInlineBlock){
				_items.css("float","left");
			}
			var parentW = $(_items.parent()).width();
			var itemsW = _items.outerWidth(true);
			var itemsInlineNum = parseInt(parentW / itemsW);
			if(isInlineBlock) itemsInlineNum --;
			var gapNum = itemsInlineNum * 2;
			var allGap = parentW - (itemsW * itemsInlineNum);
			var eachGapW =allGap / gapNum;
			_items.css({"margin-left":eachGapW+"px","margin-right":eachGapW+"px"})
		}
	})
	String.prototype.JsontoArray = function () {
		var json = this.toString();
		var real_json = JSON.parse(json);
		return real_json;
	}
	Date.prototype.getFullMonth=function (addone) {
		var addo = addone || false;
		var vel_date=this;
		var vel_month=vel_date.getMonth();
		if (addo) {
			vel_month=parseInt(vel_month)+1;
		}
		if (vel_month.toString().length==1) {
			return "0"+vel_month;
		}else {
			return vel_month;
		}
	}
	Date.prototype.getFullDate=function () {
		var vel_date=this;
		var vel_fdate=vel_date.getDate();
		if (vel_fdate.toString().length==1) {
			return "0"+vel_fdate;
		}else {
			return vel_fdate;
		}
	}
	Date.prototype.getFullHours=function () {
		var vel_date=this;
		var vel_hours=vel_date.getHours();
		if (vel_hours.toString().length==1) {
			return "0"+vel_hours;
		}else {
			return vel_hours;
		}
	}
	Date.prototype.getFullMinutes=function () {
		var vel_date=this;
		var vel_minutes=vel_date.getMinutes();
		if (vel_minutes.toString().length==1) {
			return "0"+vel_minutes;
		}else {
			return vel_minutes;
		}
	}
	Date.prototype.getFullSeconds=function () {
		var vel_date=this;
		var vel_seconds=vel_date.getSeconds();
		if (vel_seconds.toString().length==1) {
			return "0"+vel_seconds;
		}else {
			return vel_seconds;
		}
	}
	$(document).click(function () {
		if (vel_hasmenu) {
			$(".contextmenu").css("transform","scale(0)");
			$("ul[select]").css("transform","scaleY(0)");
			vel_hasmenu=false;
		}
	})
	$(document).on("click","[keychar]",function () {
		if($(nowfocus).hasAttr('readonly') || $(nowfocus).hasAttr('disable')){
			return false;
		}
		nowfocus.focus();
		var keychar=$(this).attr('keychar');
		var pos=nowfocus.selectionStart;
		if (keychar=="clear") {
			nowfocus.value="";
			nowfocus.selectionStart=0;
			nowfocus.selectionEnd=0;
		}else if (keychar=="backspace") {
			if (isimethod && ($("#keys").text()!="" || $("#keys").val()!="")) {
				$("#keys").val($("#keys").val().substr(0,$("#keys").val().length-1));
				$("#keys").text($("#keys").text().substr(0,$("#keys").text().length-1));
			}else {
				nowfocus.value=nowfocus.value.substr(0,pos-1)+nowfocus.value.substr(pos,nowfocus.value.length);
				nowfocus.selectionStart=pos-1;
				nowfocus.selectionEnd=pos-1;
			}
		}else if (keychar=="minus") {
			if (nowfocus.value.indexOf("-")==-1) {
				nowfocus.value="-"+nowfocus.value;
			}else {
				nowfocus.value=nowfocus.value.substr(1,nowfocus.value.length);
			}
			nowfocus.selectionStart=nowfocus.value.length;
			nowfocus.selectionEnd=nowfocus.value.length;
		}else if (keychar=="shift"){
			if ($(this).hasClass('shiftON')) {
				$(this).removeClass('shiftON');
				$("[keychar]").each(function () {
					var isEn = /^[a-zA-Z]$/i.test($(this).attr('keychar'));
					if (isEn) {
						var normal=$(this).attr('keychar_normal');
						$(this).removeAttr("keychar_normal");
						$(this).attr("keychar",normal);

						$(this).val(normal);
						$(this).text(normal);
					}
				})
			}else {
				$(this).addClass('shiftON');
				$("[keychar]").each(function () {
					var isEn = /^[a-zA-Z]$/i.test($(this).attr('keychar'));
					if (isEn) {
						var normal=$(this).attr('keychar');
						var upper=$(this).attr('keychar').toUpperCase();
						$(this).attr("keychar_normal",normal);
						$(this).attr("keychar",upper);

						$(this).val(upper);
						$(this).text(upper);
					}
				})
			}
		}else if(keychar=="zh/en"){
			if ($(".on").hasClass('zh')) {
				$(this).html('<span class="zh" style="color:gray;">zh</span>/<span class="en on" style="color:black;">EN</span>');
			}else {
				$(this).html('<span class="zh on" style="color:black;">ZH</span>/<span class="en" style="color:gray;">en</span>');
			}
		}else if(keychar=="space"){
			if (isimethod && $(".on").hasClass('zh') && !$(".shiftON").html()!='' && ($("#keys").text()!="" || $("#keys").val()!="")){
				$(".wordsli").eq(0).click();
			}else {
				nowfocus.value=nowfocus.value.substr(0,pos)+" "+nowfocus.value.substr(pos,nowfocus.value.length);
				nowfocus.selectionStart=pos+keychar.length;
				nowfocus.selectionEnd=pos+keychar.length;
			}
		}else {
			if (isimethod && $(".on").hasClass('zh') && !$(".shiftON").html()!='') {
				$("#keys").val($("#keys").val()+keychar);
				$("#keys").text($("#keys").text()+keychar);
			}else {
				nowfocus.value=nowfocus.value.substr(0,pos)+keychar+nowfocus.value.substr(pos,nowfocus.value.length);
				nowfocus.selectionStart=pos+keychar.length;
				nowfocus.selectionEnd=pos+keychar.length;
			}
		}
		$(nowfocus).change();
		if (isimethod) {
			$("#keys").change();
		}
	})
	$(document).on("focus","input[inputbox]",function () {
		nowfocus=this;
		isimethod=false;
	})
	$(document).on("focus","input[inputmethodbox]",function () {
		nowfocus=this;
		isimethod=true;
	})
	$(document).on("change","#keys",function () {
		$.post("temptest.php?act=getwords",{'keys':$("#keys").text()},function (data) {
			$("#words").html(data);
		})
	})
	$(document).on("click",".wordsli",function () {
		nowfocus.focus();
		var keychar=$(this).text();
		var pos=nowfocus.selectionStart;
		nowfocus.value=nowfocus.value.substr(0,pos)+keychar+nowfocus.value.substr(pos,nowfocus.value.length);
		$("#keys").val('');
		$("#keys").html('');
		$("#keys").change();
	})
	$(document).on("click",".allwords",function () {
		if(openall){
			$.post("temptest.php?act=getwords",{'keys':$("#keys").text()},function (data) {
				$("#words").html(data);
			})
			openall=false;
		}else {
			$.post("temptest.php?act=getallwords",{'keys':$("#keys").text()},function (data) {
				$("#words").html(data);
			})
			openall=true;
		}
	})
})(jQuery);

var velfun=new Object();
(function (V) {
	V.random=function (min,max) {
		var vel_minval,vel_maxval,vel_randomval;
		if (min&max) {
			vel_minval=min;
			vel_maxval=max-min;
			vel_randomval=Math.floor(Math.random()*vel_maxval+vel_minval);
		}else if (min&!max) {
			vel_minval=0;
			vel_maxval=min;
			vel_randomval=Math.floor(Math.random()*vel_maxval);
		}else {
			vel_randomval=-1;
		}
		return vel_randomval;
	};
})(velfun);

velfun.test=new Object();
(function(T){
	T.password=function (password) {
		var vel_t0=/[A-Z]+/.test(password);
		var vel_t1=/[a-z]+/.test(password);
		var vel_t2=/\d+/.test(password);
		var vel_t3=/[^A-z\d]+/.test(password);
		var vel_t4=password.length;
		var vel_t5=/(12|23|34|45|56|67|78|89|90|01|11|22|33|44|55|66|77|88|99|00)+/.test(password);
		var vel_t6=/(ab|ac|cd|de|ef|fg|gh|hi|ij|jk|kl|lm|mn|no|op|pq|qr|rs|st|tu|uv|vw|wx|xy|yz|aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz)+/i.test(password);

		var vel_safe=0.00;

		vel_safe+=(vel_t0)?12.5:0;
		vel_safe+=(vel_t1)?12.5:0;
		vel_safe+=(vel_t2)?12.5:0;
		vel_safe+=(vel_t3)?12.5:0;
		vel_safe+=(vel_t4>=8)?12.5:0;
		vel_safe+=(vel_t4>=15)?12.5:0;
		vel_safe+=(!vel_t5&&vel_t2)?12.5:0;
		vel_safe+=(!vel_t6&&(vel_t0||vel_t1))?12.5:0;

		console.log(vel_t0);
		console.log(vel_t1);
		console.log(vel_t2);
		console.log(vel_t3);
		console.log(vel_t4);
		console.log(vel_t5);
		console.log(vel_t6);

		return vel_safe;
	};
	T.cellphone=function (cellphone) {
		var vel_t0=/^1[345678]\d{9}$/.test(cellphone);
		return vel_t0;
	}
	T.email=function (email) {
		var vel_t0=/(^[A-z]+[\d_]*)\@(\w+\.?)(\.\w+)$/.test(email.trim());
		return vel_t0;
	}
})(velfun.test);

velfun.trans=new Object();
(function(TR){
	function _toChar(num,numlang,levellang){
		var num = num.split("");
		var showNum = "";
		var hasZero = false;
		for (var i = 0; i < num.length; i++) {
			var level = levellang[num.length - i - 1];
			if(num.length == 2 && num[0] == '1' && i == 0){
				showNum = level;
			}else{
				if(num[i] != 0){
					if (hasZero) {
						showNum = showNum + "零" + numlang[num[i]] + level;
						hasZero = false;
					}else{
						showNum = showNum + numlang[num[i]] + level;
					}
				}else{
					hasZero = true;
				}
			}
		}
		return showNum;
	}
	TR.NumToChar = function(number,upperCase){
		upperCase = upperCase || false;
		if(upperCase){
			var numlang = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖","拾");
			var levellang = new Array("","拾","佰","仟");
		}else{
			var numlang = new Array("零","一","二","三","四","五","六","七","八","九","十");
			var levellang = new Array("","十","百","千");
		}
		var biglevellang = new Array("","万","亿");
		num = new Array();
		if(number.length > 4 && number.length <= 8){
			num[0] = number.substring(0,number.length - 4);
			num[1] = number.substring(number.length - 4,number.length);
		}else if(number.length > 8){
			num[0] = number.substring(0,number.length - 8);
			num[1] = number.substring(number.length - 8,number.length-4);
			num[2] = number.substring(number.length - 4,number.length);
		}else{
			num[0] = number;
		}
		var showNum = "";
		for (var i = 0; i < num.length; i++) {
			showNum += _toChar(num[i],numlang,levellang) + biglevellang[num.length - i - 1];
		}
		return showNum;
	}
})(velfun.trans);

velfun.info=new Object();
(function(IF){
	IF.mobileType = function(){
		var u = navigator.userAgent;
		if(u.match(/Android/i)){
			Mobile = 'android';
		}else if(u.match(/BlackBerry/i)){
			Mobile = 'blackberry';
		}else if(u.match(/iPhone|iPad|iPod/i)){
			Mobile = 'ios';
		}else if(u.match(/IEMobile/i)){
			Mobile = 'windows';
		}else{
			Mobile = 'NOT';
		}
		return Mobile;
	}
	IF.isMobile = function(){
		return (IF.mobileType() != 'NOT')?true:false;
	}
})(velfun.info);

var _ = velfun;

/*Auto*/
$(document).ready(function () {
	$("ul[select]").each(function () {
			$(this).setSelect();
	})

	$("[coloricon]").each(function (i,t) {
		var _this=$(this);
		var _thishtml=_this[0].outerHTML;

		_this.after("<label id='ob"+i+"'>"+_thishtml+"</label>");
		_this.remove();

		var newob=$("#ob"+i);
		var newhtml=$("#ob"+i+" [coloricon]");

		newob.css({'width':newhtml.width(),'height':newhtml.height(),'display':newhtml.css('display'),'overflow':'hidden'});
		newhtml.css({'position':'relative','left':'-'+newhtml.width()+'px','border-right':newhtml.width()+'px solid transparent','filter':'drop-shadow('+newhtml.width()+'px 0 0 black)'})					;
	})

})
/*END*/
