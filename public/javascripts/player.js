$(function(){

	$("#songsList").niceScroll({cursorborder:"",cursorcolor:"#00F",boxzoom:true}); // First scrollable DIV


	//console.log(mySongs);
	/*
	var songs=new Array();
	for(var i=1;i<19;i++){
		var obj={};
		obj.src=i+".mp3";
		obj.song="null";
		obj.by="null";
		obj.album="null";

		//songs.push(i+".mp3");
		songs.push(obj);
	}
	*/
	var cu=0;
	cu=Math.floor(Math.random()*songs.length);
	//alert(cu);

	var playing=false;
	var audio=document.getElementById("audio");
	$("#play-pause").click(function(){
		//alert("go");
		if(!playing){
			audio.play();
			playing=true;
			$("#play-pause").removeClass("icon-play").addClass("icon-pause");
			var string=audio.duration;
			var index=String(string).indexOf(".");
			if(index==-1){

			}else{
				string=String(string).substr(0,index);
			}
			string=toTime(Number(string));
			$("#allTime").text(string);
		}else{
			audio.pause();
			playing=false;
			$("#play-pause").removeClass("icon-pause").addClass("icon-play");
		}
	})
	$("#stop").click(function(){
		audio.pause();
		playing=false;
		$("#play-pause").removeClass("icon-pause").addClass("icon-play");
		$("#process_forward").css("width","10px");
		$("#nowTime").text("00:00");
		audio.src=songs[cu].src;
			$("#song").text(songs[cu].song);
			$("#by").text(songs[cu].by);
			$("#album").text(songs[cu].album);
		audio.load();
	})
	$("#left").click(function(){
			audio.pause();
			cu++;
			if(cu==songs.length){
				cu=0;
			}
			//alert(cu);
			audio.src=songs[cu].src;
			$("#download").attr("href","/download/"+parseInt(songs[cu].src));
			$("#song").text(songs[cu].song);
			$("#by").text(songs[cu].by);
			$("#album").text(songs[cu].album);
			audio.load();
			playing=true;
			$("#play-pause").removeClass("icon-play").addClass("icon-pause");
			$("#process_forward").css("width","10px");
			$("#nowTime").text("00:00");
			$("#allTime").text("00:00");
			audio.play();

	})
	$("#right").click(function(){
			audio.pause();
			cu--;
			if(cu==-1){
				cu=Number(songs.length)-1;
			}
			//alert(cu);
			audio.src=songs[cu].src;
			$("#download").attr("href","/download/"+parseInt(songs[cu].src));
			$("#song").text(songs[cu].song);
			$("#by").text(songs[cu].by);
			$("#album").text(songs[cu].album);
			//alert(audio.src);
			audio.load();
			playing=true;
			$("#play-pause").removeClass("icon-play").addClass("icon-pause");
			$("#process_forward").css("width","10px");
			$("#nowTime").text("00:00");
			$("#allTime").text("00:00");
			audio.play();
	})
	$("#process_back").click(function(event){
		var width=event.pageX-$("#process_back").offset().left;
		console.log(width);
		audio.currentTime=audio.duration*width/$("#process_back").width();
		$("#process_forward").css("width",width+"px");

	})
	$(".icon-volume-high").click(function(){
		var song=$(this).attr("id");
		song=song.substr(4);
		//alert(song);
			audio.pause();
			//cu--;
			//if(cu==-1){
				//cu=Number(songs.length)-1;
			//}
			for(var i=0;i<songs.length;i++){
				if(i == song){
					cu=i;
				}
			}
			console.log(cu);
			console.log(songs);


			//cu=Number(song)-1;
			//alert(cu);
			//alert(songs[cu].src);
			audio.src=songs[cu].src;
			$("#download").attr("href","/download/"+parseInt(songs[cu].src));
			$("#song").text(songs[cu].song);
			$("#by").text(songs[cu].by);
			$("#album").text(songs[cu].album);
			//alert(audio.src);
			audio.load();
			playing=true;
			$("#play-pause").removeClass("icon-play").addClass("icon-pause");
			$("#process_forward").css("width","10px");
			$("#nowTime").text("00:00");
			$("#allTime").text("00:00");
			audio.play();
	})
	audio.ontimeupdate=function(){
		var string=audio.currentTime;
		var index=String(string).indexOf(".");
		if(index==-1){

		}else{
			string=String(string).substr(0,index);
		}
		string=toTime(Number(string));
		$("#nowTime").text(string);
		var string=audio.duration;
		var index=String(string).indexOf(".");
		if(index==-1){

		}else{
			string=String(string).substr(0,index);
		}
		string=toTime(Number(string));
		$("#allTime").text(string);
		var $width=Number(audio.currentTime)/Number(audio.duration)*Number($("#process_back").width());
		$("#process_forward").css("width",$width+"px");
	}
	audio.onended=function(){
			if($("#shuffle").hasClass("active")){
				var cu=Math.floor(Math.random()*songs.length);
				//alert(cu);
				audio.src=songs[cu].src;
			$("#download").attr("href","/download/"+parseInt(songs[cu].src));
			$("#song").text(songs[cu].song);
			$("#by").text(songs[cu].by);
			$("#album").text(songs[cu].album);
				audio.load();
				audio.play();

			}else if($('#loop').hasClass("active")){
				//audio.src="./"+songs[cu].src;
			//$("#song").text(songs[cu].song);
			//$("#by").text(songs[cu].by);
			//$("#album").text(songs[cu].album);
				audio.load();
				audio.play();
			}else{

			}
	}

	$("#loop").click(function(){
		if($("#loop").hasClass("active")){
			$("#loop").removeClass("active");
		}else{
			$("#shuffle").removeClass("active");
			$("#loop").addClass("active");
		}
	})

	$("#shuffle").click(function(){
		if($("#shuffle").hasClass("active")){
			$("#shuffle").removeClass("active");
		}else{
			$("#shuffle").addClass("active");
			$("#loop").removeClass("active");
		}
	})
	$(".icon-volume-decrease").click(function(){
		$(".icon-volume-increase").removeClass("disable");
		var vol=audio.volume;
		if(vol>0.1){
			vol=vol-0.1;
		}else{
			vol=0;
			$(".icon-volume-decrease").addClass("disable");
		}
		audio.volume=vol;
	})
	$(".icon-volume-increase").click(function(){
		$(".icon-volume-decrease").removeClass("disable");
		var vol=audio.volume;
		if(vol<0.9){
			vol=vol+0.1;
		}else{
			vol=1;
			$(".icon-volume-increase").addClass("disable");
		}
		audio.volume=vol;
	})

	function changeSong(typestring){
		//alert(typestring);
		if(typestring=="left"){

		}else if(typestring=="right"){

		}else if(typestring=="random"){

		}
	}

	function toTime(num){
		var min=num/60;
		min=Math.floor(min);
		if(min<10){
			min="0"+String(min);
		}
		var sec=num%60;
		if(sec<10){
			sec="0"+String(sec);
		}
		var timeString=min+":"+sec;
		return timeString;
	}
})
