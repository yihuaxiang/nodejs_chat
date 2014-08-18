
$("#select_face").change(function(){
	//alert($("#select_face").val());
	$("#input_emit_box").val($("#input_emit_box").val()+"<--"+$("#select_face option:selected").text()+"-->");
	$("#select_face").find("option").eq(0).attr("selected",true)
})

$("#enter").click(function(){
	sendMessage();
})

$('*').popover();



window.onbeforeunload = function() {   

   return "Are you sure to leave now ?";

} 


var first_time=true;
var time_out;
var time_out1;
var title_time_out;
var myName="";
var socket=io("http://localhost");

//on
socket.on("welcome",function(data){
	var numUsers=data.numUsers;
	var usernames=data.usernames;
	var username=data.username;
	myName=data.username;

	changeTitle("There are",numUsers,"user(s)");

	$("#your_name").text(username);
	updateOnline(usernames);
})
socket.on("welcome_new",function(data){
	var numUsers=data.numUsers;
	var usernames=data.usernames;
	var username=data.username;

	changeTitle("welcome",username,"come here");

	updateOnline(usernames);
})


socket.on("all",function(data){
	titleNotice("news coming......");
	console.log(data);

	var $div;
	if(data.to=="all"){
		$div=dataToDiv(data,false,"left");
	}else{
		$div=dataToDiv(data,true,"left");
	}
	//alert("done");

	$("#chat_show").append($div);
	$("#chat_show").scrollTop(111111);

})

socket.on("all_done",function(data){
	
	$("#enter").text("Enter");

	var $div;

	$div=dataToDiv(data,false,"right");

	$("#chat_show").append($div);
	$("#chat_show").scrollTop(111111);
		
})

socket.on("private",function(data){
	console.log(data);
})

socket.on("typing",function(data){
	var name=data.username;
	console.log(name);
	console.log("typing");
	$("#chat_online dd").each(function(){
		console.log("****");
		console.log($(this));
		console.log($(this).text());
		console.log("*****");
		if($(this).text()==name){
			console.log($(this));
			clearTimeout(time_out1);
			$(this).addClass("typing");
			
			time_out1=setTimeout(function(name){
				//$(this).removeClass("typing");
				socket.emit("stop typing",{});
			},1000)
			//time_out1=setTimeout('$("'+this+'"").removeClass("typing")',1000);
		}
	})
})

socket.on("stop typing",function(data){
	var name=data.username;
	$("#chat_online dd").each(function(){
		if($(this).text()==name){
			$(this).removeClass("typing");
		}
	})
})

socket.on("leave",function(data){
	updateOnline(data.usernames);
	clearTimeout(time_out);

	changeTitle("",data.username,"is gone!");
})

//emit
$("#input_emit_box").on("keydown",function(e){
	if(e.keyCode==13){
		sendMessage();
	}else{
		socket.emit("typing",{})
	}
})

//functions
function updateOnline(usernames){
	var $users_dl=$("<dl>");
	var $select_users=$('<select  id="selelct_users" class="form-control" >');
	$select_users.append("<option>all</optioin>");
	$users_dl.append($("<dt>online users</dt>"));
	var i=0;
	if(first_time){
		for(var key in usernames){
			$users_dl.append($("<dd class='btn btn-success user_oneline' style='left:"+((97)*i)+"px"+";'>"+key+"</dd>"));
			i++;
			if(key==myName){

			}else{	
				$select_users.append($("<option>"+key+"</options>"));
			}
		}
	}else{
		for(var key in usernames){
			$users_dl.append($("<dd class='btn btn-success user_oneline' >"+key+"</dd>"));
			i++;
			if(key==myName){

			}else{	
				$select_users.append($("<option>"+key+"</options>"));
			}
		}	
	}

	$("#chat_online").html($users_dl);
	//$("#chat_online dd").css("top","0px");
	setTimeout(function(){
		$(".user_oneline").css("left","0px")
	},0);
	$("#select_div").html($select_users);

}

function sendMessage(){
		//if($("#selelct_users").val()=="all"){
			var string=$("#input_emit_box").val();
			string=string.trim();
			if(string!=""){
				for(var i=0;i<27;i++){
					//$("image").attr("src").replace("size=60", "size=200");
					//console.log("<--"+$("#select_face").find("option").eq(i).text()+"-->");
					//console.log("<span class='"+$("#select_face").find("option").eq(i).text()+"'></span>")
					string=string.replace("<--"+$("#select_face").find("option").eq(i).text()+"-->","<span class='icon-"+$("#select_face").find("option").eq(i).text()+"'></span>");
					//$("#select_face").find("option").eq(1).text()
				}
				//alert(string);
				$("#enter").text("Send.");
				//alert("done");
				socket.emit("all",{
					to:$("#selelct_users").val(),
					msg:string,
					color:$("#color").val()
				})
				$("#input_emit_box").val("");
				//alert($("#input_emit_box").val());
		//}	
			}else{
				//alert("Nothing Input,Sorry!");
				//myAlert('alert!','I am sorry ,but you input nothing to the input box ......<span class="icon-sad"></span>...');
				$("body").myAlert({
					title:"alert",
					content:'I am sorry ,but you input nothing to the input box ......<span class="icon-sad"></span>...'
				})
				 $("#move_handle").moveAble({divId:"alert_div"})
			}
}

function changeTitle(stringOne,message,stringTwo,time){
	if(!time){
		time=2000;
	}
	clearTimeout(time_out);
	$("#title").text(stringOne+" "+message+" "+stringTwo);
	time_out=setTimeout(function(){
		$("#title").text("chat for us");
	},time);
}

function titleNotice(string){
	var mode=false;
	clearInterval(title_time_out);
	title_time_out=setInterval(function(){
		if(mode){
			$("title").text(".."+string+"..");
			mode=false;
		}else{
			$("title").text("...."+string+".....");
			mode=true;
		}
	},300)

	setTimeout(function(){
		clearInterval(title_time_out);
		$("title").text("char for us");
	},3000);



}

function dataToDiv(data,isToMe,direction){
	var $div=$("<div class='clear_after'></div>");
	console.log($div);
	var $one=$("<div class='float-"+direction+"' style='width:22%' >");
	if(isToMe){
		var $h2=$("<h2 style='margin:0px;color:red'>");
		$h2.text(data.from+">I");
	}else{
		//var $h2=$("<h2 style='margin:0px;'>");
		if(direction=="right"){
			var $h2=$("<h2 style='margin:0px;float:right'>");
			$h2.text("I>"+data.to);
		}else{
			var $h2=$("<h2 style='margin:0px;'>");
			$h2.text(data.from);
		}
	}
	

	$one.append($h2);
	$div.append($one);

	var $two=$("<div class='float-"+direction+"' style='width:74%'>");
	$p=$("<p style='word-break:break-all;line-height:40px;float:"+direction+";'></p>");

	var tmp=0;
	var faceArray=new Array();

	while(data.msg.indexOf("<span ",tmp)!=-1){
		var obj=new Object();
		obj.start=data.msg.indexOf("<span ",tmp);
		obj.end=data.msg.indexOf("</span>",tmp)+7;
		tmp=obj.end;

		faceArray.push(obj);
	}

	var obj=new Object();
	obj.end=0;
	//faceArray[-1].push(obj);
	faceArray[-1]=obj;

	for(var i=0;i<faceArray.length;i++){
		  $p.append($("<span>").text(data.msg.substring((faceArray[i-1].end),faceArray[i].start)));
		  $p.append($(data.msg.substring(faceArray[i].start,faceArray[i].end)));
	}

	$p.append($("<span>").text(data.msg.substring(faceArray[faceArray.length-1].end)));

	$p.css("color",data.color);
	$two.append($p);
	$div.append($two);
	return $div;
}
