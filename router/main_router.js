module.exports = function(app, mysqlClient)
{
	app.get('/test', function(req, res){
		mysqlClient.query('select * from products', function(error, results){
			if(error){
				console.log('error : ', error.message);
			}else{
				res.render('main/list.html',{prodList : results});
			};
		})
	});

	app.get('/test/delete/:id', function(req, res){
		mysqlClient.query('delete from products where id = ?', [req.params.id], function(error, result){
			if(error){
				console.log('delete Error');
			}else{
				console.log('delete id = %d', req.params.id);
				res.redirect('/test');
			}
		});
	});

	app.get('/test/insert', function(req, res){
		res.render('main/insert.html');
	});

	app.get('/test/edit/:id', function(req, res){
		mysqlClient.query('select * from products where id = ?', [req.params.id], function(error, result){
			if(error){
				console.log('readFile Error');
			}else{
				res.render('main/edit.html', {product : result[0]});
			}
		});
	});
	app.post('/test/insert', function(req, res){
		var body = req.body;
		mysqlClient.query('insert into products(name, modelnumber, series) values(?,?,?)', [body.name, body.modelnumber, body.series],
			function(error, result){
				if(error){
					console.log('insert error : ', error.message);
				}else{
					res.redirect('/test');
				}
			});
	});

app.post( '/test/edit/:id', function(req, res){
	var body = req.body;
	
	mysqlClient.query( 'update products set name=?, modelnumber=?, series=? where id=?',
			[ body.name, body.modelnumber, body.series, body.id ], 
			function(error, result){
				if(error){
					console.log('update error : ', error.message );
				}else{
					res.redirect('/test');
				}
	});
});


}