module.exports = function(app, mysqlClient, passport, session, fs, formidable)
{
	var pageSize = 10;
	app.get('/board/getboardinfo', function(req, res){
		mysqlClient.query('select * from board where id = ?',[req.session.board_id], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result[0]);
			}
		});
	});

	////////////////////////
	//?authentification
	////////////////////////

	app.get('/isBoardAuth', function(req,res){
		mysqlClient.query('select * from guest where board_id = ? and user_id = ?', [req.session.board_id, req.session.index], function(error, result){
			(error) ? console.log(error) : res.json(result[0]);
		});
	});

	////////////////////////
	//?guest
	////////////////////////

	app.get('/board/getboardguest', function(req, res){
		mysqlClient.query('select * from guest where board_id = ? and user_id = ?', [req.session.board_id, req.session.index], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result[0]);
			}
		});
	});
	app.get('/board/getguests', function(req, res){
		mysqlClient.query('select * from guest where board_id = ?',[req.session.board_id], function(error, result){
			if(error){
				console.log(error);
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
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delguest/:index', function(req, res){
		mysqlClient.query('delete from guest where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//?freetalk
	////////////////////////

	app.get('/board/getfreetalk/:index', function(req, res){
		mysqlClient.query('select * from freetalk where board_id = ? and id = ?',[req.session.board_id, req.params.index], function(error,result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getfreetalk/list/:index', function(req, res){
		var sql = "select * from freetalk where board_id = ? and available = true";
		var limit = " order by id desc limit ?,?";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql + limit;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'" +limit;
		}
		mysqlClient.query(sqlInput,
		[req.session.board_id, (req.params.index-1)*pageSize, pageSize], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getfreetalkcnt', function(req, res){
		var sql = "select count(*) as cnt from freetalk where available = true";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'";
		}
		mysqlClient.query(sqlInput, function(error, result){
			if(error){
				console.log(error);
			}else{
				console.log(result[0]);
				res.json(result[0]);
			}
		});
	});
	app.post('/board/newfreetalk', function(req, res){
		mysqlClient.query('insert into freetalk(board_id, user_id, nickname, title, content, cnt, create_date, available) values(?,?,?,?,?,0,now(), true)', 
			[req.session.board_id, req.session.index, req.session.userID, req.body.title, req.body.content], 
			function(error, result){
				if(error){
					console.log(error);
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
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/hidefreetalk/:index', function(req, res){
		mysqlClient.query('update freetalk set available = false where id=?',[req.params.index], 
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delfreetalk/:index', function(req, res){
		mysqlClient.query('delete from freetalk where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//?notice
	////////////////////////

	app.get('/board/getnotice/list/:index', function(req, res){
		var sql = "select * from notice where board_id = ? and available = true";
		var limit = " order by id desc limit ?,?";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql + limit;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'" +limit;
		}
		mysqlClient.query(sqlInput,[req.session.board_id, (req.params.index-1)*pageSize, pageSize], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getnotice/:index', function(req, res){
		mysqlClient.query('select * from notice where board_id = ? and id = ?',[req.session.board_id, req.params.index],function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
		app.get('/board/getnoticecnt', function(req, res){
		var sql = "select count(*) as cnt from notice where available = true";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'";
		}
		mysqlClient.query(sqlInput, function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result[0]);
			}
		});
	});
	app.post('/board/newnotice', function(req, res){
		mysqlClient.query('insert into notice(board_id, user_id, nickname, title, content, cnt, create_date, available) values(?,?,?,?,?,0,now(),true)',
			[req.session.board_id, req.session.index, req.session.userID, req.body.title, req.body.content],
			function(error, result){
				if(error){
					console.log(error);
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
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/hidenotice/:index', function(req, res){
		mysqlClient.query('update notice set available = false where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delnotice/:index', function(req, res){
		mysqlClient.query('delete from notice where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//?schedule
	////////////////////////

	app.get('/board/getschedule/list/:index', function(req, res){
		var sql = "select * from schedule where board_id = ? and available = true";
		var limit = " order by id desc limit ?,?";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql + limit;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'" +limit;
		}
		mysqlClient.query(sqlInput,[req.session.board_id, (req.params.index-1)*pageSize, pageSize], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getschedule/:index', function(req, res){
		mysqlClient.query('select * from schedule where board_id = ? and id = ?',[req.session.board_id, req.params.index], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
		app.get('/board/getschedulecnt', function(req, res){
		var sql = "select count(*) as cnt from schedule where available = true";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'";
		}
		mysqlClient.query(sqlInput, function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result[0]);
			}
		});
	});
	app.post('/board/newschedule', function(req, res){
		mysqlClient.query('insert into schedule(board_id, user_id, nickname, title, place, gathering_time, t_cost, cnt, create_date, available) values(?,?,?,?,?,?,?,0,now(), true)',
			[req.session.board_id, req.session.index, req.session.userID, req.body.title, req.body.place, req.body.gathering_time, req.body.t_cost],
			function(error, result){
				if(error){
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
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delschedule/:index', function(req, res){
		mysqlClient.query('delete from schedule where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//?attendUser
	////////////////////////

	app.get('/board/getattendUser/:id', function(req, res){
		mysqlClient.query('select * from attendUser where schedule_id = ?',[req.params.id], function(error, result){
			if(error){
				console.log(error);
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
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delattendUser/:index', function(req, res){
		mysqlClient.query('delete from attendUser where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});

	////////////////////////
	//?studydata
	////////////////////////

	app.get('/board/getstudydata/list/:index', function(req, res){
		var sql = "select * from studydata where board_id = ? and available = true";
		var limit = " order by id desc limit ?,?";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql + limit;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'" +limit;
		}

		mysqlClient.query(sqlInput,[req.session.board_id, (req.params.index-1)*pageSize, pageSize], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
	app.get('/board/getstudydata/:index', function(req, res){
		mysqlClient.query('select * from studydata where board_id = ? and id = ?',[req.session.board_id, req.params.index],function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
		app.get('/board/getstudydatacnt', function(req, res){
		var sql = "select count(*) as cnt from studydata where available = true";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'";
		}
		mysqlClient.query(sqlInput, function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result[0]);
			}
		});
	});
	app.post('/board/newstudydata', function(req, res){
		var d = new Date();
		var t = d.getTime();
		var y = Math.round(t/10);
		mysqlClient.query('insert into studydata(board_id, user_id, nickname ,title, description, url, create_date, available) values(?,?,?,?,?,?,now(),true)',
			[req.session.board_id, req.session.index, req.session.userID, req.body.title, req.body.description, y],
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
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	////////////////////////////
	//?account
	////////////////////////////

	app.get('/board/getaccount/list/:index', function(req, res){
		var sql = "select * from account where board_id = ? and available = true";
		var limit = " order by id desc limit ?,?";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql + limit;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'" +limit;
		}
		mysqlClient.query(sqlInput, [req.session.board_id, (req.params.index-1)*pageSize, pageSize],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json(result);
				}
			});
	});
	app.get('/board/getaccount/:index', function(req, res){
		mysqlClient.query('select * from account where board_id = ? and id = ?', [req.session.board_id, req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json(result);
				}
			});
	});
		app.get('/board/getaccountcnt', function(req, res){
		var sql = "select count(*) as cnt from account where available = true";
		var sqlInput = "";
		if(req.query.type.length == 0){
			sqlInput = sql;
		}else{
			sqlInput = sql +" and "+req.query.type+" like '%"+req.query.search+"%'";
		}
		mysqlClient.query(sqlInput, function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result[0]);
			}
		});
	});
	app.post('/board/newaccount', function(req, res){
		mysqlClient.query('insert into account(board_id, user_id, nickname, title, description, cost, create_date, available) values(?,?,?,?,?,?,now(),true)',
			[req.session.board_id, req.session.index, req.session.userID, req.body.title, req.body.description, req.body.cost],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.post('/board/upaccount', function(req, res){
		mysqlClient.query('update account set title = ?, description = ?, cost = ?, update_date = now() where id = ?',
			[req.body.title, req.body.description, req.body.cost, req.body.id],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/hideaccount/:index', function(req, res){
		mysqlClient.query('update account set available = false where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delaccount/:index', function(req, res){
		mysqlClient.query('delete from account where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});

	/////////////////////////////
	//?attendee
	/////////////////////////////

	app.get('/board/getattendee', function(req, res){
		mysqlClient.query('select * from attendee where account_id = ?', [req.session.board_id],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json(result);
				}
			});
	});
	app.post('/board/newattendee', function(req, res){
		mysqlClient.query('insert into attendee(account_id, user_id, member_paycheck, admin_paycheck) values(?,?,false, false)',
			[req.body.account_id, req.session.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/upattendeemember/:index', function(req, res){
		mysqlClient.query('update attendee set member_paycheck = true where id = ?',
			[req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/upattendeeadmin/:index', function(req, res){
		mysqlClient.query('update attendee set admin_paycheck = true where id = ?',
			[req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delattendee/:index', function(req, res){
		mysqlClient.query('delete from account where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});

	
	////////////////////////
	//?comment
	////////////////////////

	app.get('/board/getcomment/list/:type/:index', function(req, res){
		mysqlClient.query('select * from comment where board_type = (select id from board_type where type_name = ?) and parents_id = ?',[req.params.type ,req.params.index], function(error, result){
			if(error){
				console.log(error);
			}else{
				res.json(result);
			}
		});
	});
	app.post('/board/newcomment', function(req, res){
		mysqlClient.query('insert into comment(board_type, parents_id, user_id, nickname, comment, create_date) values((select id from board_type where type_name = ?),?,?,?,?,now())', 
			[req.body.board_type, req.body.parents_id, req.session.index, req.session.userID, req.body.comment], 
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
	app.get('/board/delcomment/:index', function(req, res){
		mysqlClient.query('delete from comment where id = ?', [req.params.index],
			function(error, result){
				if(error){
					console.log(error);
				}else{
					res.json({message : 'success'});
				}
			});
	});
}

