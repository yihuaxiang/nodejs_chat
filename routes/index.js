var connect_mysql = require("../mysql/connect_mysql");
const dayjs = require('dayjs');
const lodash = require('lodash');
var connection;
connection = connect_mysql.connect(connection);
/*
 * GET home page.
 */


exports.index = function (req, res) {
  res.render('index', {title: "敖武的聊天室"});
};

exports.history = function (req, res) {
  if (req.query.f) {
    var f = req.query.f.replace('"', "&quot;");
    var page = req.query.page;
    page = Math.max(Number(page) || 1, 1);
    if (f != "") {
      var sql = 'select * from history order by id desc where f like "%' + f + '%" limit ' + ((page - 1) * 100) + ",100";
    } else {
      var sql = "select * from history order by id desc limit " + ((page - 1) * 100) + ",100";
    }

    console.log(sql);

    var sql1 = "select * from history order by id desc";

  } else if (req.query.t) {
    var t = req.query.t.replace('"', "&quot;");
    var page = req.query.page;
    page = Math.max(Number(page) || 1, 1);
    //console.log(page);
    if (t != "") {
      var sql = 'select * from history  order by id desc where t like "%' + t + '%" limit ' + ((page - 1) * 100) + ',100';
    } else {
      var sql = "select * from history order by id desc limit " + ((page - 1) * 100) + ",100";
    }

    console.log(sql);

    var sql1 = "select * from history order by id desc ";
  } else if (req.query.message) {
    var message = req.query.message.replace('"', "&quot;");
    var page = req.query.page;
    page = Math.max(Number(page) || 1, 1);
    //console.log(page);
    if (message != "") {
      var sql = 'select * from history order by id desc where message like "%' + message + '%" limit ' + ((page - 1) * 100) + ',100';
    } else {
      var sql = "select * from history order by id desc limit " + ((page - 1) * 100) + ",100";
    }

    console.log(sql);

    var sql1 = "select * from history order by id desc";
  } else if (req.query.d) {
    var d = req.query.d.replace('"', "&quot;");
    var page = req.query.page;
    page = Math.max(Number(page) || 1, 1);
    //console.log(page);
    if (d != "") {
      var sql = 'select * from history order by id desc where d like "%' + d + '%" limit ' + ((page - 1) * 100) + ',100';
    } else {
      var sql = "select * from history order by id desc limit " + ((page - 1) * 100) + ",100";
    }

    console.log(sql);

    var sql1 = "select * from history order by id desc";
  } else {
    var page = req.query.page;
    page = Math.max(Number(page) || 1, 1);
    var sql = "select * from history order by id desc limit " + ((page - 1) * 100) + ",100";
    console.log(sql);

    var sql1 = "select * from history order by id desc";
  }

  var pages = new Array();
  connection.query(sql1, function (err, rows, fields) {
    if (err) throw err;

    for (var i = 0; i <= (rows.length / 100); i++) {
      pages.push(i);
    }
  })

  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;

    res.render("history", {
      rows: rows,
      pages: pages,
      pageNow: page,
      title: "历史记录"
    });
  })
}

exports.comments = function (req, res) {
  var page = req.query.page;
  page = Number(page);
  if (!page) {
    page = 1;
  }
  if (page < 1) {
    page = 1;
  }
  page = Math.floor(page);

  var sql = 'select * from comments order by id desc limit ' + (page - 1) * 10 + ',10';
  console.log(sql);

  var pages = new Array();
  connection.query("select * from comments", function (err, rows, field) {
    if (err) {
      res.end(err);
    } else {

      for (var i = 0; i <= rows.length / 10; i++) {
        pages.push(i);
      }

    }
  })
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.end("sorry");
      return;
    } else {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].content.length > 80) {
          rows[i].content = rows[i].content.substr(0, 80) + "...";
        }
        if (rows[i].about.length > 30) {
          rows[i].about = rows[i].about.substr(0, 30) + "...";
        }
      }
      res.render("comments", {
        comments: rows,
        pages: pages,
        pageNow: page,
        title: "留言"
      })
    }
  })
}


exports.postHistory = function (req, res) {

}

exports.postComments = function (req, res) {
  console.log(req.body);
  var comment = {
    id: null,
    name: "No Name",
    content: "No Content",
    tName: null,
    tContent: null,
    d: null
  }

  for (var key in comment) {
    if (req.body[key]) {
      comment[key] = req.body[key];
    }
  }


  console.log(comment);

  var sql = 'insert into comments values (null,"' + comment.name + '","' + comment.content + '","' + comment.tName + '","' + comment.tContent + '",now())';
  connection.query(sql, function (err) {
    if (err) {
      res.end("sorry");
    } else {
      res.redirect("back");
    }
  })
}

exports.player = function (req, res) {
  connection.query("use node_chart", function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.end("500,sorry");
    }
  });
  connection.query("select * from songs", function (err, rows, field) {
    if (err) {
      res.end("sorry");
    } else {
      //songs=rows;
      res.render("player", {
        songs: rows,
        title: "音乐"
      })
    }
  });
}

exports.download = function (req, res) {
  console.log(file);
  var file = req.params.file;
  res.download("./public/songs/" + file + ".mp3", function (err) {
    if (err) {
      res.send("404 Not Found");
    } else {
      return;
    }
  })
}
