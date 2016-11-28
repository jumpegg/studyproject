module.exports = function(app, mysqlClient, passport, session, fs, formidable, util)
{
	/////////////////////////
	//board
	//////////////////////////
	app.get('/getboard/:index', function(req,res){
		mysqlClient.query('select * from board where id = ?', [req.params.index], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result[0]);
			}
		});
	});
	app.get('/getboard', function(req, res){
		mysqlClient.query('select board.*, guest.nickname from board inner join guest on board.admin_id = guest.user_id where board.id = guest.board_id order by create_date desc',function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
	app.get('/getboards', function(req, res){
		mysqlClient.query('select board.*, count(guest.id) AS guestcnt from board left join guest on board.id = guest.board_id where board.admin_id = ? group by board.id;', [req.session.index], function(error, result){
			if(error){
				console.log(error);
			}else{
				console.log('session id = '+req.session.index);
				res.json(result);
			}
		});
	});
	app.get('/delboard/:index', function(req, res){
		mysqlClient.query('delete from board where id = ?',[req.params.index],
		function(error, result){
			if(error){
				console.log(error);
			}else{
				console.log('board deleted!');
			}
		});
	});
	app.get('/getjoinboards', function(req, res){
		mysqlClient.query('select board.* from guest inner join board on board.id = guest.board_id where user_id = ? and not admin_id = ?',[req.session.index, req.session.index],
			function(error, result){
			console.log("session id is : "+req.session.index);
				if(error){
					console.log(error);
				}else{
					res.json(result);
				}
			});
	});
	app.get('/getallnotices', function(req,res){
		mysqlClient.query('select board.title as board_name, notice.* from notice inner join board on notice.board_id = board.id where board_id in (select board.id from guest inner join board on board.id = guest.board_id where guest.user_id = ?) order by create_date desc limit 0,15',[req.session.index],
		function(error, result){
			console.log('called all notice!!');
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
	app.get('/getguest/:index', function(req,res){
		mysqlClient.query('select count(id) from guest where board_id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json(result);
				}
			});
	});


	/////////////////////
	// study
	/////////////////////
	app.post('/newStudy', function(req, res){
		mysqlClient.query('insert into board(admin_id, title, description, available, create_date) values(?,?,?,true,now())',
			[req.session.index, req.body.title, req.body.description],
			function(error, result){
				if(error){
					console.log(error);
					res.json({result : 'false'});
				}else{
					mysqlClient.query('insert into guest(board_id, user_id, admin_auth, nickname, join_date) values((select id from board where admin_id = ? order by id desc limit 0,1),?,1,?,now())',
					[req.session.index, req.session.index, req.session.userID], function(error, result){
						if(error){
							console.log(error);
						}else{
							res.json({result : 'success'});
						}
					})
				}
			});
	});
	app.post('/updateStudy', function(req, res){
		mysqlClient.query('update board set title = ?, description = ?, update_date = now() where id = ?',
			[req.body.title, req.body.description, req.body.id],
			function(error, result){
				if(error){
					console.log(error);
					res.json({result: 'false'});
				}else{
					res.json({result: 'success'});
				}
			});
	});


	////////////////////////////
	// user profile
	////////////////////////////
	app.post('/userPage/edit', function(req,res){
		mysqlClient.query('update user set email = ?, phone = ?, address = ?, introduce = ? where id = ?',
			[req.body.email, req.body.phone, req.body.address, req.body.introduce, req.session.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					console.log('user update success');
					res.json({message : 'success'});
				}
			});
	});
	app.get('/getuser', function(req, res){
		mysqlClient.query('select * from user where userID = ?',[req.session.userID], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
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
			fields.push([field, value]);
		})
		.on('file', function(field, file){
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
