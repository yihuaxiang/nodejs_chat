(function($){

	$.fn.moveAble=function(options){//options={divId:"alert_div"}  $("#move_handle").moveAble({divId:"alert_div"})
		var settings={
			"divId":"divClass"
		}

		if(options){
			$.extend(settings,options);
		}
		var down=false;
		var startX;
		var startY;
		var mouseX;
		var mouseY;
		$(this).on("mousedown",function(event){
			 startX=$("#"+settings.divId).css("left");
			 startY=$("#"+settings.divId).css("top");
			 mouseX=event.pageX;
			 mouseY=event.pageY;
			 console.log("mouseY"+mouseY);
			down=true;
			startX=startX.substr(0,startX.length-2);
			startY=startY.substr(0,startY.length-2);
			console.log("starX:"+startX+"startY"+startY+"mouseX:"+mouseX+"mouseY"+mouseY);
		})
		$("body").on("mousemove",function(event){
			if(down){
				//console.log(event.pageX+"__________"+event.pageY);
				//console.log(event.pageY);
				var lengthX=event.pageX-mouseX;
				var lengthY=event.pageY-mouseY;
				//console.log(lengthX+"##########"+lengthY);
				//console.log(lengthX+startX+"^^^^^^^^^^^^^^^^^^^"+lengthY+startY);
				//console.log(settings.divId);
				$("#"+settings.divId).css({
					"left":(Number(startX)+Number(lengthX))+"px",
					"top":(Number(startY)+Number(lengthY))+"px"
				})
				//console.log()
				console.log("lengthX:"+lengthX+"lengthY"+lengthY);
			}
		})
		$("body").on("mouseup",function(){
			down=false;
		})
	}


})(jQuery);