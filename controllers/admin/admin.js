var express = require('express');
var router = express.Router();
var adminModel = require.main.require('./models/admin-model');
router.get('*', function (req, res, next) {
	if (req.cookies['uname'] == null) {
		res.redirect('/login');
	} else {
		next();
	}
});
router.get('/', function (req, res) {
	adminModel.getByUname(req.cookies['uname'], function (result) {
		res.render('admin/index', {
			user: result
		});
	});
});
router.get('/addNewrecipe', function (req, res) {
	var user = {
		fname: '',
		lname: '',
		username: '',
		email: '',
		phone: '',
		password: '',
		fathersName: '',
		nid: ''
	};
	res.render('admin/addNewrecipe', {
		user: user
	});

});
router.post('/addNewrecipe', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			username: req.body.uname,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
			fathersName: req.body.fathersName,
			nid: req.body.nid
		};
		adminModel.insert(user, function (status) {
			if (status) {
				//res.redirect('/admin/view_recipes');
				res.send('submitted');
			} else {
				res.render('admin/addNewrecipe', {
					user: user
				});
			}
		});
	} else {
		res.send('password mismatch');
	}
});
router.get('/view_recipes', function (req, res) {
	adminModel.getAllrecipe(function (results) {
		if (results.length > 0) {
			res.render('admin/view_recipes', {
				userlist: results
			});
		} else {
			res.render('admin/view_recipes', {
				userlist: results
			});
		}
	});

});
router.get('/view_recipes/:username', function (req, res) {
	adminModel.getrecipeProfile(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'recipeinfo'
		});
	});

});

router.get('/changerecipe', function (req, res) {
	res.render('admin/changerecipe');

});

module.exports = router;