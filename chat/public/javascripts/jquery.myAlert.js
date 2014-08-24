(function($){

	$.fn.myAlert=function(options){
		var settings={
			"title":"this is title",
			"content":"this is content"
		}

		if(options){
			$.extend(settings,options);
		}

		var $mask=$("<div id='mask'>");
		$mask.css({
			position:"fixed",
			top:"0px",
			left:"0px",
			right:"0px",
			bottom:"0px",
			background:"rgba(0,0,0,0.4)"
		})
		$("body").append($mask);
		$alertDiv=$('<div id="alert" style="width:300px;height:auto;position:fixed;top:35%;left:50%;">\
		 		 <div id="alert_div" class="shadow_box" style="position:relative;left:-50%;top:0px;width:100%;height:100%;z-index:1000;">\
		 		 	<h3 id="move_handle" class="move" style="cursor:pointer;">'+settings.title+'</h3>\
					  <p style="word-break:break-all">'+settings.content+'</p> \
					  <button id="hide_alert" type="button" class="form-control btn btn-danger">确定</button>\
		   		</div>\
			   </div>');
		$("body").append($alertDiv);

		$("#hide_alert").on("click",function(){
			$("#mask").remove();
			$("#alert").remove();
		})
	}


})(jQuery);

//myAlert('alert!','this is not ok !!!');