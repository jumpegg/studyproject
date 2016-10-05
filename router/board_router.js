module.exports = function(app, mysqlClient, passport, session)
{
	app.get('/boardIndex/:id', function(req, res){
		console.log("req.params.id is : " + req.params.id);
		req.session.board_id = req.params.id;
		console.log("req.session.board_id is : "+ req.session.board_id);

		mysqlClient.query('select * from board where id = ?',[req.session.board_id], function(error, result){
			req.session.board_name = result[0].title;
			console.log("board name is : " + req.session.board_name);
			if(error){
				console.log("server board info error");
			}else{
				res.render('board.html',{session: req.session});
			}
		});
		
	});
	app.get('/board/getboardinfo', function(req, res){
		mysqlClient.query('select * from board where id = ?',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getboardinfo error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getboardguest', function(req, res){
		mysqlClient.query('select * from guest where board_id = ? and user_id = ?', [req.session.board_id, req.session.index], function(error, result){
			if(error){
				console.log('server getboardguest error');
				console.log(error);
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
	app.get('/board/getfreetalk', function(req, res){
		mysqlClient.query('select * from freetalk where board_id = ?',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getfreetalk error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getnotice', function(req, res){
		mysqlClient.query('select * from notice where board_id = ?',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getnotice error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getschedule', function(req, res){
		mysqlClient.query('select * from schedule where board_id = ?',[req.session.board_id], function(error, result){
			if(error){
				console.log('server getschedule error');
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getattendUser/:id', function(req, res){
		mysqlClient.query('select * from attendUser where schedule_id = ?',[req.params.id], function(error, result){
			if(error){
				console.log('server getattendUser error');
			}else{
				res.json(result);
			}
		});
	});

	app.post('/board/newfreetalk', function(req, res){
		mysqlClient.query('insert into freetalk(board_id, user_id, nickname, title, content, cnt, create_date, available) values(?,?,?,?,?,0,now(), true)', 
			[req.session.board_id, req.session.index, req.body.nickname, req.body.title, req.body.content], 
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
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
	app.post('/board/newschedule', function(req, res){
		mysqlClient.query('insert into schedule(board_id, user_id, title, place, gathering_time, t_cost, e_cost, cnt, create_date) values(?,?,?,?,?,?,?,0,now())',
			[req.session.board_id, req.session.index, req.body.title, req.body.place, req.body.gathering_time, req.body.t_cost, req.body.e_cost],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
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
	app.post('/board/upfreetalk', function(req, res){
		mysqlClient.query('update freetalk set title = ?, content = ?, update_date = now() where id = ?',
			[req.body.title, req.body.content, req.body.index],
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
			[req.body.title, req.body.content, req.body.index],
			function(error, result){
				if(error){
					console.log('server error');
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.post('/board/upschedule', function(req, res){
		mysqlClient.query('update schedule set title=?, place=?, gathering_time=?, t_cost=?, e_cost, update_date=now()',
			[req.body.title, req.body.place, req.body.gathering_time, req.body.t_coast, req.body.e_cost],
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
}
