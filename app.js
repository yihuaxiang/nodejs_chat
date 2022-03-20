//var sta=require("./static");
var mime = require("./config/mime").types;
var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var connect_mysql = require("./mysql/connect_mysql");

var server = require("http").createServer(app);
var io = require("socket.io")(server);
var routes = require('./routes');
var port = 8801;

var connection;

connection = connect_mysql.connect(connection);


app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
//app.use(sta("./"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", routes.index);
app.get("/history", routes.history);
app.post("/history", routes.postHistory);
app.get("/comments", routes.comments);
app.post("/comments", routes.postComments);
app.get("/player", routes.player);
app.get("/download/:file(*)", routes.download);


var usernames = {};
var numUsers = 0;
var sockets = {};


io.on("connection", function (socket) {
  var name = "";
  name = getName();
  while (checkName(name)) {
    name = getName();
  }

  usernames[name] = true;
  sockets[name] = socket;
  socket.username = name;
  numUsers++;

  socket.emit("welcome", {
    numUsers: numUsers,
    usernames: usernames,
    username: socket.username
  })

  socket.broadcast.emit("welcome_new", {
    numUsers: numUsers,
    usernames: usernames,
    username: socket.username
  })

  socket.on("all", function (data) {

    var sql = 'insert into history values(null,"' + socket.username.replace('"', '&apos;') + '","' + data.to.replace('"', '&apos;') + '","' + data.msg.replace('"', '&apos;') + '","' + (new Date()) + '")';
    connection.query(sql, function (err, rows, fields) {
      if (err) throw err;

    })

    socket.broadcast.emit("all", {
      from: socket.username,
      to: data.to,
      msg: data.msg,
      color: data.color
    })
    socket.emit("all_done", {
      status: "success",
      msg: data.msg,
      to: data.to,
      color: data.color
    });
    console.log(data.msg);
  })

  socket.on("private", function (data) {
    var to = data.to;
    var from = socket.username;
    var msg = data.msg;
    console.log(usernames);
    console.log(to);
    console.log(checkName(to));
    if (checkName(to)) {
      sockets[to].emit("private", {
        from: from,
        msg: msg
      })
      socket.emit("private_done", {
        status: "success",
        msg: msg
      })
    } else {

    }
  })

  socket.on("typing", function () {
    socket.emit("typing", {
      username: socket.username
    })
    socket.broadcast.emit("typing", {
      username: socket.username
    })
  })

  socket.on("stop typing", function () {
    socket.emit("stop typing", {
      username: socket.username
    })
    socket.broadcast.emit("stop typing", {
      username: socket.username
    })
  })

  socket.on("disconnect", function () {
    delete usernames[socket.username];
    numUsers--;
    socket.broadcast.emit("leave", {
      usernames: usernames,
      username: socket.username
    })
    delete sockets[socket.username];

  })
})


server.listen(port, function () {
  console.log(port);
})

///functions
function checkName(name) {
  var flag = false;
  for (var key in usernames) {
    if (name == key) {
      flag = true;
    }
  }

  return flag;
}

function getName() {
  var name = Math.floor(Math.random() * 10000);
  name = "user" + name;
  return name;
}
