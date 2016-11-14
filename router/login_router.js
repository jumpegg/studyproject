module.exports = function(app, mysqlClient, passport, bcrypt, salt)
{
	app.get('/', function(req, res){
		res.redirect('/login');
	});
	app.get('/login', function(req,res){
		res.render('login/login.html');
	});

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
	app.get('/usercheck/:userID', function(req, res){
		mysqlClient.query('select count(*) AS cnt from user where userID = ?',
		[req.params.userID],
		function(error, result){
			if(error){
				console.log(error);
			}else if(result[0].cnt != 0){
				res.json({message : true});
			}else{
				res.json({message : false});
			}
		});
	});
}