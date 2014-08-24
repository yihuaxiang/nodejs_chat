exports.connect=function(connection){
	var mysql=require("mysql");
	connection=mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"123456"
	})

	connection.connect();

	connection.query("use chat",function(err){
		if(err){
			throw err;
		}
	});

	return connection;
}
