module.exports = function(app, mysqlClient, passport, session, fs, formidable, util)
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
	app.post('/profilepicUpload', function(req, res){
		var form = new formidable.IncomingForm();
		var files = [],
		fields = [];

		form.keepExtensions = true;

		var dir = './userPic/profilePic/'+req.session.userID;
		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		form.uploadDir = dir;

		form.on('field', function(field, value){
			console.log('[field]'+field, value);
			fields.push([field, value]);
		})
		.on('file', function(field, file){
			console.log('file' + field, file);
			fs.rename(file.path, form.uploadDir + '/' + req.session.userID+'.jpg');
			files.push([field, file]);
		})
		.on('end', function(){
			res.end('success');
		})
		.on('error', function(error){
			console.log('[error] error : '+ error);
		});
		form.parse(req);
	});
	app.get('/profilePicList', function(req, res){
		fs.realpath("./", function(err, path){
			if(err){
				console.log(err);
				return;
			}
			console.log('Path is : ' +path);
		});
		fs.readdir("./userPic/profilePic/"+req.session.userID,function(err, files){
			if(err){
				console.log(err);
				return;
			}
			files.forEach(function(f){
				console.log('Files: ' + f);
			});
			res.end(files);

		});
	});
}
