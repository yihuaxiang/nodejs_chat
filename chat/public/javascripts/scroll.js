function scrollToTop(){
	$toTop=$("<div id='toTop'><span id='' class='glyphicon glyphicon-chevron-up'> </span></div>");
	$toTop.css({
		position:"fixed",
		right:"40px",
		bottom:"40px",
		width:"40px",
		height:"40px",
		textAlign:"center",
		cursor:"pointer"
	})
	$toTop.on("click",function(){
		$("body").animate({scrollTop:0},500);
	})
	$("body").append($toTop);
	var height=$("body").height();
	$(window).scroll(function(){
		if($("body").scrollTop()>height-900){
			$toTop.addClass("show");
			//console.log($("body").scrollTop());
		}else{
			$toTop.removeClass("show");
			//console.log($("body").scrollTop());
		}
	})

};

scrollToTop();

