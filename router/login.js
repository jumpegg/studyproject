module.exports = function(app, mysqlClient, passport, bcrypt, salt)
{
	app.get('/', function(req, res){
		res.redirect('/login');
	});
	app.get('/login', function(req,res){
		res.render('login/login.html');
	});
	app.post('/login', function(req, res, next){
		req.flash("userID");
		if(req.body.userID.length === 0 || req.body.password.length === 0){
			res.redirect('/login');
		}else{
			next();
		}
	}, passport.authenticate('local-login', {
		successRedirect : '/userPage',
		failureRedirect : '/login',
		failureFlash : true
	}));
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});
	app.post('/sign-up', function(req, res){
		mysqlClient.query('insert into user(userID, password, email, available, create_date) values(?,?,?,true,now())', 
			[req.body.userID, bcrypt.hashSync(req.body.password, salt), req.body.email],
			function(error, result){
				if(error){
					console.log('insert.error : ', error.message);
				}else{
					res.redirect('/login');
				}
			});
	});
}