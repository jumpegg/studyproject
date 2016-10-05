module.exports = function(app, mysqlClient, passport, session)
{
	app.get('/userPage', function(req, res){
		res.render('userPage/userPage.html', {
			session: req.session
		});
	});
	app.post('/userPage/edit', function(req,res){
		mysqlClient.query('update user set email = ?, phone = ?, address = ?, introduce = ? where id = ?',
			[req.body.email, req.body.phone, req.body.address, req.body.introduce, req.session.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					console.log('user update success');
					res.json({message : 'success'});
				}
			});
	});
	app.get('/getuser', function(req, res){
		mysqlClient.query('select * from user where userID = ?',[req.session.userID], function(error, result){
			if(error){
				console.log('server error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/getboard/:index', function(req,res){
		mysqlClient.query('select * from board where id = ?', [req.params.index], function(error, result){
			if(error){
				console.log('server error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/getboards', function(req, res){
		mysqlClient.query('select * from board where admin_id = ?', [req.session.index], function(error, result){
			if(error){
				console.log('server error');
			}else{
				console.log('session id = '+req.session.index);
				res.json(result);
			}
		});
	});
	app.get('/getjoinboards', function(req, res){
		mysqlClient.query('select * from board where id = (select board_id from guest where user_id = ?)',[req.session.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json(result);
				}
			});
	});
	app.post('/newStudy', function(req, res){
		mysqlClient.query('insert into board(admin_id, title, description, available, create_date) values(?,?,?,true,now())',
			[req.session.index, req.body.title, req.body.description],
			function(error, result){
				if(error){
					console.log('study insert error : ', error.message);
					res.json({result : 'false'});
				}else{
					res.json({result : 'success'});
				}
			});
	});
	app.post('/updateStudy', function(req, res){
		mysqlClient.query('update board set title = ?, description = ?, update_date = now() where id = ?',
			[req.body.title, req.body.description, req.body.id],
			function(error, result){
				if(error){
					res.json({result: 'false'});
				}else{
					res.json({result: 'success'});
				}
			});
	});
}
