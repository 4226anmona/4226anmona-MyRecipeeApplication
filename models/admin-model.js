var db = require('./db');

module.exports = {

	validate: function (user, callback) {
		var sql = "SELECT * FROM admininfo where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function (results) {
			if (results.length > 0) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	getByUname: function (username, callback) {
		var sql = "select * from admininfo where username=?";
		db.getResults(sql, [username], function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	updateProfile: function (user, callback) {
		var sql = "update admininfo set name=?, username=?, password=?, email=?,phone=? where username=?";
		db.execute(sql, [user.name, user.username, user.password, user.email, user.phone, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	insert: function (user, callback) {
		console.log();
		var sql = "insert into recipeinfo values(?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [user.fname, user.lname, user.username, user.password, user.email, user.phone, null, null, user.fathersName, user.nid, 'unblock'], function (status) {
			if (status) {
				console.log(user);
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	getAllrecipe: function (callback) {
		var sql = "select * from recipeinfo";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllOwners: function (callback) {
		var sql = "select * from shopownerinfo";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllCustomers: function (callback) {
		var sql = "select * from customerinfo";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},

	getrecipeProfile: function (username, callback) {
		var sql = "select * from recipeinfo where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getCutomerProfile: function (username, callback) {
		var sql = "select * from customerinfo where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getOwnersProfile: function (username, callback) {
		var sql = "select * from shopownerinfo where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getAllPendingCustomer: function (callback) {
		var sql = "select * from customerinfo where type=?";
		db.getResults(sql, ['pending'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllPendingshopowner: function (callback) {
		var sql = "select * from shopownerinfo where type=?";
		db.getResults(sql, ['pending'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailableshopowner: function (callback) {
		var sql = "select * from shopownerinfo where type=?";
		db.getResults(sql, ['available'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailableCustomer: function (callback) {
		var sql = "select * from customerinfo where type=?";
		db.getResults(sql, ['available'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailableShop: function (callback) {
		var sql = "select * from shopinfo where status=?";
		db.getResults(sql, ['available'], function (results) {
			console.log("caught");
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllShop: function (callback) {
		var sql = "select * from shopinfo where status=?";
		db.getResults(sql, ['active'], function (results) {
			if (results.length > 0) {
				console.log(results);
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	shopownersStatus: function (user, callback) {
		var sql = "update shopownerinfo set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
        customerStatus: function (user, callback) {
		var sql = "update customerinfo set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	
	recipeStatus: function (user, callback) {
		var sql = "update recipeinfo set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	}
}