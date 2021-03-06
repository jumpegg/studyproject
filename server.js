var express = require('express');
var app = express();
// body-parser : POST 데이터 처리
var bodyParser = require('body-parser');
// express-session : 세션관리
var session = require('express-session');
// fs 파일 입출력
var fs = require('fs');
// util : nodejs 보조 모듈
var util = require('util');
// mysql
var mysql = require('mysql');
// mysql config
var mysqlClient = mysql.createConnection({
	host: 'myproject.cpylkksl9brd.ap-northeast-2.rds.amazonaws.com',
	port: 3306,
	user:'jumpegg',
	password: 'fly19354',
	database : 'nodetest'
});
var passport = require('passport');
var flash = require('connect-flash');
var async = require('async');
//fs : 파일 입출력
var fs = require('fs');
//formidable : 파일 업로드
var formidable = require('formidable');
// encrypt
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(33);

app.use(flash());

//session config
app.use(session({
	secret: '@#@#MYSIGN#@#@#',
	resave: true,
	saveUninitialized: true
}));

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
passport.use('local',
	new LocalStrategy({
		usernameField : 'userID',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, userID, password, done){
		mysqlClient.query('select * from user where userID = ?', [userID],
			function(error, result){
				console.log(result.length);
				var checkpass = '';

				checkpass = result.length == 0 ? bcrypt.hashSync(0, salt) : result[0].password;

				var comp = bcrypt.compareSync(password, checkpass);

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

var isAuthenticated = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};
//view 파일 경로 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// js, css, img 파일 경로 설정
app.use(express.static('public'));
app.use("/bower_components", express.static(__dirname + "/bower_components"));
app.use("/userPic", express.static(__dirname + "/userPic"));
app.use("/studydata", express.static(__dirname + "/studydata"));

//bodyParser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
	console.log('listening on port 3000!');
});

app.get('/userPage',isAuthenticated ,function(req, res, next){
	res.render('userPage/userPage.html', {
		session: req.session
	});
});

app.get('/boardIndex/:id',isAuthenticated ,function(req, res, next){
	console.log("req.params.id is : " + req.params.id);
	req.session.board_id = req.params.id;
	mysqlClient.query('select * from board where id = ? and available = true',[req.session.board_id], function(error, result){
		req.session.board_name = result[0].title;
		if(error){
			console.log("server board info error");
		}else{
			res.render('board.html',{session: req.session});
		}
	});
});

app.post('/login', passport.authenticate('local', {
	successRedirect : '/userPage',
	failureRedirect : '/login',
	failureFlash : false
}));

// route 파일 설정
var main = require('./router/main_router')(app, mysqlClient);
var login = require('./router/login_router')(app, mysqlClient, passport, bcrypt, salt);
var userPage = require('./router/userPage_router')(app, mysqlClient, passport, session, fs, formidable, util);
var board = require('./router/board_router')(app, mysqlClient, passport, session, fs, formidable);
