function myAlert(h3,p){
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
	 		 <div class="shadow_box" style="position:relative;left:-50%;top:-50%;width:100%;height:100%;z-index:1000;">\
	 		 	<h3>'+h3+'</h3>\
				  <p style="word-break:break-all">'+p+'</p> \
				  <button id="hide_alert" type="button" class="form-control btn btn-danger">sure</button>\
	   		</div>\
		   </div>');
	$("body").append($alertDiv);

	$("#hide_alert").on("click",function(){
		$("#mask").remove();
		$("#alert").remove();
	})

}



//myAlert('alert!','this is not ok !!!');