var express = require('express');
var app = express();
// body-parser : POST 데이터 처리
var bodyParser = require('body-parser');
// express-session : 세션관리
var session = require('express-session');
// fs 파일 입출력
var fs = require('fs');
// mysql
var mysql = require('mysql');
// mysql config
var mysqlClient = mysql.createConnection({
	user:'root',
	password: '870915',
	database : 'nodetest'
});
var passport = require('passport');
var flash = require('connect-flash');
var async = require('async');

// encrypt 
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(33);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user);
});
passport.deserializeUser(function(user, done){
	mysqlClient.query('select * from user where id = ?', [user.id], function(error, result){
		done(null, user);
	});
});

var LocalStrategy = require('passport-local').Strategy;
passport.use('local-login',
	new LocalStrategy({
		usernameField : 'userID',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, userID, password, done){
		mysqlClient.query('select * from user where userID = ?', [userID], 
			function(error, result){
				var comp = bcrypt.compareSync(password, result[0].password);
				if(error){
					return done(error);
				}else if(result.length == 0){
					return done(error);
				}else if(comp){
					req.session.index = result[0].id;
					req.session.userID = result[0].userID;
					req.session.email = result[0].email;
					return done(null, result);
				}else{
					return done(error);
				}
			})
	})
);

//view 파일 경로 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// js, css, img 파일 경로 설정
app.use(express.static('public'));

//bodyParser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//session config
app.use(session({
	secret: '@#@#MYSIGN#@#@#',
	resave: false,
	saveUninitialized: true
}));

// route 파일 설정
var main = require('./router/main')(app, mysqlClient);
var login = require('./router/login')(app, mysqlClient, passport, bcrypt, salt);
var userPage = require('./router/userPage')(app, mysqlClient, passport, session);
var board = require('./router/board_router')(app, mysqlClient, passport, session);

app.listen(3000, function(){
	console.log('listening on port 3000!');
});