$(".reply").click(function(){
	if($(this).parent().find("div").length){
		$(this).parent().find("div").remove();
		//alert("hide");
	}else{
		//alert("show");
		$div=$('<div id="form"><form method="post" action=""><fieldset><input id="name" type="text" name="name" class="form-control" placeholder="your name" /><br /><textarea name="content" id="content" class="form-control" placeholder="your context"></textarea><br /><input id="submit" type="submit" value="submit" class="form-control" /></fieldset></form></div>');
		$(".reply").parent().find("div").remove();
		var $input=$("<input name='tName' type='hidden' value='"+$(this).parent().parent().find(".name").text()+"' />")
		$div.find("form").append($input);
		$input=$("<input type='hidden' name='tContent' value='"+$(this).parent().parent().find(".content").text()+"' />")
		$div.find("form").append($input);
		$(this).parent().append($div);

		$("#form").on("keydown",function(event){
			if(event.ctrlKey&&event.keyCode==13){
				var content=$("#content").val().trim();
				var name=$("#name").val().trim();
				if(content==""||name==""){
					//alert("name or content is empty!");
					$("body").myAlert({
						title:"抱歉",
						content:'亲，你什么也没有输入...'
					})
					 $("#move_handle").moveAble({divId:"alert_div"})
					return false;
				}else{
					$("#submit").click();
				}
			}
		})

		$("#submit").on("click",function(e){
			var content=$("#content").val().trim();
			var name=$("#name").val().trim();
			if(content==""||name==""){
					$("body").myAlert({
						title:"抱歉",
						content:'亲，你什么也没有输入...'
					})
					 $("#move_handle").moveAble({divId:"alert_div"})
				e.preventDefault();
				return false;
			}else{

			}
		})	
	}


})

$("#add_submit").click(function(e){
	var name=$("#add_name").val().trim();
	var content=$("#add_content").val().trim();
	if(name==""||content==""){
		e.preventDefault();
					$("body").myAlert({
						title:"抱歉",
						content:'亲，你什么也没有输入...'
					})
					 $("#move_handle").moveAble({divId:"alert_div"})
		return false;
	}
})
$("#cancel").click(function(){
	$("#add_form").addClass("width_height_0");
})

$("#pen").click(function(){
	$("#add_form").removeClass("width_height_0");
})

$("#add_form").on("keydown",function(event){
			if(event.ctrlKey&&event.keyCode==13){
				var content=$("#add_content").val().trim();
				var name=$("#add_name").val().trim();
				if(content==""||name==""){
					$("body").myAlert({
						title:"抱歉",
						content:'亲，你什么也没有输入...'
					})
					 $("#move_handle").moveAble({divId:"alert_div"})
					return false;
				}else{
					$("#add_submit").click();
				}
			}
})