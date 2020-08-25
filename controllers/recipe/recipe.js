var express = require('express');
var router = express.Router();
var recipeModel = require.main.require('./models/recipe-model');

router.get('*', function (req, res, next) {
	if (req.cookies['uname'] == null) {
		res.redirect('/login');
	} else {
		next();
	}
});
router.get('/', function (req, res) {
	recipeModel.getByUname(req.cookies['uname'], function (result) {
		res.render('recipe/index', {
			user: result
		});
	});
});

router.get('/profile', function (req, res) {
	recipeModel.getByUname(req.cookies['uname'], function (result) {
		res.render('recipe/profile', {
			user: result
		});
	});

});
router.post('/profile', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			username: req.body.uname,
			fathersName: req.body.fathersName,
			email: req.body.email,
			phone: req.body.phone,
			nid: req.body.nid,
			password: req.body.password,
			area: req.body.area
		};

		recipeModel.updateProfile(user, function (status) {
			if (status) {
				res.redirect('/recipe');
			} else {
				res.redirect('/recipe/profile');
			}
		});
	} else {
		res.send('password mismatch');
	}
});
module.exports = router;