var db = require('./db');

module.exports = {
	validate: function (user, callback) {
		var sql = "SELECT * FROM recipeinfo where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function (results) {
			if (results.length > 0) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	passrecovery: function (user, callback) {

		console.log(user)
		var sql = "update recipeinfo set password=?  where username=? ";
		db.getResults(sql, [user.password, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	getByUname: function (username, callback) {
		var sql = "select * from recipeinfo where username=?";
		db.getResults(sql, [username], function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	updateProfile: function (user, callback) {
		var sql = "update recipeinfo set fname=?,lname=?, username=?, password=?, email=?,phone=?,area=?,fathersName=?,nid=? where username=?";
		db.execute(sql, [user.fname, user.lname, user.username, user.password, user.email, user.phone, user.area, user.fathersName, user.nid, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	recover: function (user, callback) {
		var sql = "select * from recipeinfo where username=? and fathersName=?";
		db.getResults(sql, [user.username, user.fathersName], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback(null);
			}
		});
	},
}