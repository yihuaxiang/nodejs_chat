exports.connect=function(connection){
	var mysql=require("mysql");
	connection=mysql.createConnection({
		host:"rm-xxxx.mysql.rds.aliyuncs.com",
		user:"node_chart",
		password:"xxxxx",
		database: 'node_chart'
	})

	connection.connect();

	connection.query("use node_chart",function(err){
		if(err){
			throw err;
		}
	});

	return connection;
}
