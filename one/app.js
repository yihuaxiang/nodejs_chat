/*
var app=require("http").createServer(handler);
var io=require("socket.io")(app);
var fs=require("fs");

app.listen(8888);

function handler(req,res){
	fs.readFile(__dirname+"/index.html",function(err,data){
		if(err){
			res.write(500);
			return res.end("sorry");
		}else{
			res.writeHead(200);
			res.end(data);
		}
	});
}

io.on("connection",function(socket){
	socket.emit("news",{hello:"world"});
	socket.on("my other event",function(data){
		console.log(data);
	})
})
*/
//var sta=require("./static");
var mime=require("./mime").types;
var express=require("express");
var app=express();
var fs=require("fs");
var path=require("path");

var connect_mysql=require("./connect_mysql");

var server=require("http").createServer(app);
var io=require("socket.io")(server);
var port=8801;

var connection;

connection=connect_mysql.connect(connection);
/*
connection.query("insert into history values(null,'user1234',null,'I love you')",function(err,rows,fields){
	if(err){
		throw err;
	}
})*/

app.engine(".html",require("ejs").__express);
app.set("views",__dirname+"/views");
app.set("view engine","html");
//app.use(sta("./"));
app.use(express.static(__dirname ));

app.get("/",function(req,res){
	res.sendfile(__dirname+"/index.html");
})

app.get("/history",function(req,res){
	var page=req.query.page;
	page=Number(page);
	if(page<=0){
		page=1;
	}
	if(!page){
		page=1;
	}
	//console.log(page);
	var sql="select * from history limit "+((page-1)*10)+",10";
	console.log(sql);

	var sql1="select * from history";
	var pages=new Array();
	connection.query(sql1,function(err,rows,fields){
		if(err) throw err;

		for(var i=0;i<=(rows.length/10);i++){
			pages.push(i);
		}
	})

	connection.query(sql,function(err,rows,fields){
		if(err) throw err;
		//res.json(rows);
	
		res.render("history",{
			rows:rows,
			pages:pages
		});
	})
})


app.get("/fonts/:file",function(req,res){
	//res.end(req.params.file);
	var file=req.params.file;
	file="./fonts/"+file;
	var ext=req.params.file;
	var i=ext.indexOf(".");
	ext=ext.slice(i);
	console.log(ext);
	ext=ext?ext.slice(1):"unknown";
	console.log(ext);
	var contentType=mime[ext]||"text/plain";
	console.log(contentType);
	res.writeHead(200,{
		"content-type":contentType
	})
	res.write(file,"binary");
	res.end();
})
app.get("/icomoon.ttf",function(req,res){
	res.writeHead(200,{
		"content-type":"application/octet-stream"
	})
	res.write(file,"binary");
	res.end();
})



var usernames={};
var numUsers=0;
var sockets={};



io.on("connection",function(socket){
	var name="";
	name=getName();
	while(checkName(name)){
		name=getName();
	}

	usernames[name]=true;
	sockets[name]=socket;
	socket.username=name;
	numUsers++;

	socket.emit("welcome",{
		numUsers:numUsers,
		usernames:usernames,
		username:socket.username
	})

	socket.broadcast.emit("welcome_new",{
		numUsers:numUsers,
		usernames:usernames,
		username:socket.username
	})

	socket.on("all",function(data){

		var sql='insert into history values(null,"'+socket.username.replace('"','&apos;')+'","'+data.to.replace('"','&apos;')+'","'+data.msg.replace('"','&apos;')+'","'+(new Date())+'")';
		connection.query(sql,function(err,rows,fields){
			if(err) throw err;

		})

		socket.broadcast.emit("all",{
			from:socket.username,
			to:data.to,
			msg:data.msg,
			color:data.color
		})
		socket.emit("all_done",{
			status:"success",
			msg:data.msg,
			to:data.to,
			color:data.color
		});
		console.log(data.msg);
	})

	socket.on("private",function(data){
		var to=data.to;
		var from=socket.username;
		var msg=data.msg;
		console.log(usernames);
		console.log(to);
		console.log(checkName(to));
		if(checkName(to)){
			sockets[to].emit("private",{
				from:from,
				msg:msg
			})
			socket.emit("private_done",{
				status:"success",
				msg:msg
			})
		}else{

		}
	})

	socket.on("typing",function(){
		socket.emit("typing",{
			username:socket.username
		})
		socket.broadcast.emit("typing",{
			username:socket.username
		})
	})

	socket.on("stop typing",function(){
		socket.emit("stop typing",{
			username:socket.username
		})
		socket.broadcast.emit("stop typing",{
			username:socket.username
		})
	})

	socket.on("disconnect",function(){
		delete usernames[socket.username];
		numUsers--;
		socket.broadcast.emit("leave",{
			usernames:usernames,
			username:socket.username
		})
		delete sockets[socket.username];

	})
})


server.listen(port,function(){
	console.log(port);
})

///functions
function checkName(name){
	var flag=false;
	for(var key in usernames){
		if(name==key){
			flag=true;
		}
	}

	return flag;
}

function getName(){
	var name=Math.floor(Math.random()*10000);
	name="user"+name;
	return name;
}