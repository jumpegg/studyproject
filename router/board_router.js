module.exports = function(app, mysqlClient, passport, session, fs, formidable)
{

	app.get('/board/getboardinfo', function(req, res){
		mysqlClient.query('select * from board where id = ?',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getboardinfo error');
			}else{
				res.json(result);
			}
		});
	});

	////////////////////////
	//guest
	////////////////////////

	app.get('/board/getboardguest', function(req, res){
		mysqlClient.query('select * from guest where board_id = ? and user_id = ?', [req.session.board_id, req.session.index], function(error, result){
			if(error){
				console.log('server getboardguest error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getguest', function(req, res){
		mysqlClient.query('select * from guest where board_id = ?',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getguest error');
			}else{
				res.json(result);
			}
		});
	});
	app.post('/board/upguest', function(req, res){
		mysqlClient.query('update guest set nickname = ? where id = ?',
			[req.body.nickname, req.body.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delguest/:index', function(req, res){
		mysqlClient.query('delete from guest where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//freetalk
	////////////////////////

	app.get('/board/getfreetalk/:index', function(req, res){
		mysqlClient.query('select * from freetalk where board_id = ? and id = ?',[req.session.board_id, req.params.index], function(error,result){
			if(error){
				console.log('server getfreetalk one error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getfreetalk', function(req, res){
		mysqlClient.query('select * from freetalk where board_id = ? and available = true',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getfreetalk error');
			}else{
				res.json(result);
			}
		});
	});
	app.post('/board/newfreetalk', function(req, res){
		mysqlClient.query('insert into freetalk(board_id, user_id, nickname, title, content, cnt, create_date, available) values(?,?,?,?,?,0,now(), true)', 
			[req.session.board_id, req.session.index, req.session.userID, req.body.title, req.body.content], 
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.post('/board/upfreetalk', function(req, res){
		mysqlClient.query('update freetalk set title = ?, content = ?, update_date = now() where id = ?',
			[req.body.title, req.body.content, req.body.id],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/hidefreetalk/:index', function(req, res){
		mysqlClient.query('update freetalk set available = false where id=?',[req.params.index], 
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delfreetalk/:index', function(req, res){
		mysqlClient.query('delete from freetalk where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//notice
	////////////////////////

	app.get('/board/getnotice', function(req, res){
		mysqlClient.query('select * from notice where board_id = ? and available = true',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getnotice error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getnotice/:index', function(req, res){
		mysqlClient.query('select * from notice where board_id = ? and id = ?',[req.session.board_id, req.params.index],function(error, result){
			if(error){
				console.log('server get notice one error');
			}else{
				res.json(result);
			}
		});
	});
	app.post('/board/newnotice', function(req, res){
		mysqlClient.query('insert into notice(board_id, user_id, title, content, cnt, create_date, available) values(?,?,?,?,0,now(),true)',
			[req.session.board_id, req.session.index, req.body.title, req.body.content],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.post('/board/upnotice', function(req, res){
		mysqlClient.query('update notice set title = ?, content = ?, update_date = now() where id = ?',
			[req.body.title, req.body.content, req.body.id],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/hidenotice/:index', function(req, res){
		mysqlClient.query('update notice set available = false where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delnotice/:index', function(req, res){
		mysqlClient.query('delete from notice where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//schedule
	////////////////////////

	app.get('/board/getschedule', function(req, res){
		mysqlClient.query('select * from schedule where board_id = ? and available = true',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getschedule error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getschedule/:index', function(req, res){
		mysqlClient.query('select * from schedule where board_id = ? and id = ?',[req.session.board_id, req.params.index], function(error, result){
			if(error){
				console.log('server getschedule error');
			}else{
				res.json(result);
			}
		});
	});
	app.post('/board/newschedule', function(req, res){
		mysqlClient.query('insert into schedule(board_id, user_id, nickname, title, place, gathering_time, t_cost, cnt, create_date, available) values(?,?,?,?,?,?,?,0,now(), true)',
			[req.session.board_id, req.session.index, req.session.userID, req.body.title, req.body.place, req.body.gathering_time, req.body.t_cost],
			function(error, result){
				if(error){
					console.log('server error');
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.post('/board/upschedule', function(req, res){
		mysqlClient.query('update schedule set title=?, place=?, gathering_time=?, t_cost=?, update_date=now() where id = ?',
			[req.body.title, req.body.place, req.body.gathering_time, req.body.t_cost, req.body.id],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/hideschedule/:index', function(req, res){
		mysqlClient.query('update schedule set available = false where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delschedule/:index', function(req, res){
		mysqlClient.query('delete from schedule where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//attendUser
	////////////////////////

	app.get('/board/getattendUser/:id', function(req, res){
		mysqlClient.query('select * from attendUser where schedule_id = ?',[req.params.id], function(error, result){
			if(error){
				console.log('server getattendUser error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/newattendUser/:s_id/:u_id', function(req, res){
		mysqlClient.query('insert into attendUser(schedule_id, user_id) values(?,?)',
			[req.params.s_id, req.params.u_id],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delattendUser/:index', function(req, res){
		mysqlClient.query('delete from attendUser where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//studydata
	////////////////////////

	app.get('/board/getstudydata', function(req, res){
		mysqlClient.query('select * from studydata where board_id = ? and available = true',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getnotice error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getstudydata/:index', function(req, res){
		mysqlClient.query('select * from studydata where board_id = ? and id = ?',[req.session.board_id, req.params.index],function(error, result){
			if(error){
				console.log('server get notice one error');
			}else{
				res.json(result);
			}
		});
	});
	app.post('/board/newstudydata', function(req, res){
		var d = new Date();
		var t = d.getTime();
		var y = Math.round(t/10);
		mysqlClient.query('insert into studydata(board_id, user_id, title, description, url, create_date, available) values(?,?,?,?,?,now(),true)',
			[req.session.board_id, req.session.index, req.body.title, req.body.description, y],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.post('/board/setstudydatafile', function(req, res){
		var form = new formidable.IncomingForm();
		var files = [],
		fields = [];
		var d = new Date();
		var t = d.getTime();
		var y = Math.round(t/10);


		form.keepExtensions = true;

		var dir = './studydata/'+req.session.board_id;
		var subdir = './studydata/'+req.session.board_id+'/'+y;
		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		};
		if(!fs.existsSync(subdir)){
			fs.mkdirSync(subdir);
		};

		form.uploadDir = subdir;

		form.on('field', function(field, value){
			fields.push([field, value]);
		})
		.on('file', function(field, file){
			fs.rename(file.path, form.uploadDir + '/' + file.name);
			mysqlClient.query('update studydata set filename = ? where url = ?',[file.name, y],function(error, result){
				if(error){
					console.log(error);
				}
			});
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
	app.post('/board/upstudydata', function(req, res){
		mysqlClient.query('update studydata set title = ?, description = ?, update_date = now() where id = ?',
			[req.body.title, req.body.description, req.body.id],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/hidestudydata/:index', function(req, res){
		mysqlClient.query('update studydata set available = false where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delstudydata/:index', function(req, res){
		mysqlClient.query('delete from studydata where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});



}
