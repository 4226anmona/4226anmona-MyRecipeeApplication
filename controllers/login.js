var express = require('express');
var router = express.Router();
var recipeModel = require.main.require('./models/recipe-model');
var adminModel = require.main.require('./models/admin-model');
router.get('/', function (req, res) {
	res.render('login/index');
});
router.get('/passrecover', function (req, res) {
	res.render('login/passrecovery');
});
router.post('/', function (req, res) {
	if (req.body.usertype == "Admin") {
		var user = {
			username: req.body.uname,
			password: req.body.password
		};
		adminModel.validate(user, function (status) {
			if (status) {
				res.cookie('usertype', req.body.usertype);
				res.cookie('uname', req.body.uname);
				res.redirect('/admin');
			} else {
				res.render('login/error');
			}
		});
	} else if (req.body.usertype == "User") {
		var user = {
			username: req.body.uname,
			password: req.body.password
		};
		recipeModel.validate(user, function (status) {
			if (status) {
				res.cookie('usertype', req.body.usertype);
				res.cookie('uname', req.body.uname);
				res.redirect('/recipe');
			} else {
				res.render('login/error');
			}
		});
	}  else {
		res.send('invalid username/password');
	}
});
router.post('/passrecover', function (req, res) {
	if (req.body.usertype == "User") {
		var user = {
			username: req.body.uname,
			password: req.body.password,
			fathersName: req.body.fathersName
		};
		recipeModel.recover(user, function (results) {
			if (results.length > 0) {
				recipeModel.passrecovery(user, function (status) {
					if (status) {
						res.redirect('/login');
					} else {
						res.send("error");
					}
				});
			} else {
				res.send('enter valid username');
			}
		});

	}
});

module.exports = router;