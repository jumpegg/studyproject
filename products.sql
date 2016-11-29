create table products(
	id int not null auto_increment primary key,
	name varchar(50) not null,
	modelnumber varchar(15) not null,
	series varchar(30) not null
);


/*여기부터*/
create database nodetest;

create table user(
	id int not null auto_increment primary key,
	userID varchar(100) not null,
	password varchar(100) not null,
	email varchar(100) not null,
	available boolean not null,
	create_date DATE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE user
ADD (address VARCHAR(200), phone varchar(50), introduce TEXT);


create table board(
	id int not null auto_increment primary key,
	admin_id int not null,
	title varchar(200),
	description TEXT,
	create_date DATE,
	update_date DATE,
	delete_date DATE,
	available boolean not null,
	FOREIGN KEY (admin_id) REFERENCES user(id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table guest(
	id int not null auto_increment,
	board_id int not null,
	user_id int not null,
	admin_auth boolean not null,
	nickname varchar(200),
	join_date DATE,
	PRIMARY KEY (id),
	FOREIGN KEY (board_id) REFERENCES board(id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into guest(board_id, user_id, admin_auth, nickname, join_date) values(1, 1, true, 'wonnynickname', now());
insert into guest(board_id, user_id, admin_auth, nickname, join_date) values(2, 2, true, 'wonnynickname', now());

create table requestApply(
	id int not null auto_increment primary key,
	board_id int not null,
	user_id int not null,
	nickname varchar(200) not null,
	apply_date DATE
);

create table freetalk(
	id int not null auto_increment primary key,
	board_id int not null,
	user_id int not null,
	nickname varchar(200) not null,
	title varchar(1000),
	content TEXT,
	cnt int,
	create_date DATE,
	update_date DATE,
	delete_date DATE,
	available boolean not null
);

create table notice(
	id int not null auto_increment primary key,
	board_id int not null,
	user_id int not null,
	nickname varchar(200) not null,
	title varchar(1000),
	content TEXT,
	cnt int,
	create_date DATE,
	update_date DATE,
	delete_date DATE,
	available boolean not null
);

create table schedule(
	id int not null auto_increment primary key,
	board_id int not null,
	user_id int not null,
	nickname varchar(200) not null,
	title varchar(1000),
	place varchar(1000),
	gathering_time DATE,
	t_cost int,
	e_cost int,
	cnt int,
	create_date DATE,
	update_date DATE,
	delete_date DATE,
	available boolean not null
);

create table studydata(
	id int not null auto_increment primary key,
	board_id int not null,
	user_id int not null,
	nickname varchar(200) not null,
	title varchar(1000),
	description TEXT,
	url TEXT,
	filename TEXT,
	create_date DATE,
	update_date DATE,
	delete_date DATE,
	available boolean not null
);

create table attendUser(
	id int not null auto_increment primary key,
	schedule_id int not null,
	user_id int not null,
	nickname varchar(200) not null
);

create table account(
	id int not null auto_increment primary key,
	board_id int not null,
	user_id int not null,
	nickname varchar(200) not null,
	title varchar(200) not null,
	description text,
	cost int,
	create_date DATE,
	update_date DATE,
	delete_date DATE,
	available boolean not null
);

insert into freetalk(board_id, user_id, nickname, title, content, create_date, available, cnt) select board_id, user_id, nickname, title, content, create_date, available, cnt from freetalk;

insert into notice(board_id, user_id, nickname, title, content, create_date, available, cnt) select board_id, user_id, nickname, title, content, create_date, available, cnt from notice;

insert into schedule(board_id, user_id, nickname, title, place, gathering_time, t_cost, e_cost, create_date, available, cnt) select board_id, user_id, nickname, title, place, gathering_time, t_cost, e_cost, create_date, available, cnt from schedule;

insert into account(board_id, user_id, nickname, title, description, create_date, available, cost) select board_id, user_id, nickname, title, description, create_date, available, cost from account;

create table attendee(
	id int not null auto_increment primary key,
	account_id int not null,
	user_id int not null,
	member_paycheck boolean not null,
	admin_paycheck boolean not null
);

create table comment(
	id int not null auto_increment primary key,
	board_type int not null,
	parents_id int not null,
	user_id int not null,
	nickname varchar(200) not null,
	comment text,
	create_date DATE,
	update_date DATE
);

create table board_type(
	id int not null auto_increment primary key,
	type_name varchar(100) not null
);



insert into board_type(type_name) values('freetalk');
insert into board_type(type_name) values('notice');
insert into board_type(type_name) values('schedule');
insert into board_type(type_name) values('studydata');

select * from board where id = (select board_id from guest where user_id = ?)
insert into user(userID, password, email) values('tester', 'tester', 'tester@tester.com');


insert into user(userID, password, email, available, create_date) values('jumpegg', '870915', 'jumpegg@naver.com',true, now());
insert into user(userID, password, email) values('wonny', 'wonny', 'wonny@naver.com');

/*테이블 구조 보기*/
desc board;

/*날짜 비교*/
select * from notice
where date(create_date) < '2016-10-20';

/*user outer join user, board test*/
select user.id, user.email, user.userID, count(board.id) AS cnt
from user left outer join board 
on user.id = board.admin_id;


/*outer join board, guest test*/
select board.id, board.admin_id, board.title, board.description, board.create_date,
	board.update_date, board.delete_date, board.available, count(guest.id) AS guestcnt
	from board left outer join guest
	on board.id = guest.board_id
	where board.admin_id = 1;

select board.id, board.admin_id, board.title, board.description, board.create_date, board.update_date, board.delete_date, board.available, count(guest.id) AS guestcnt from board left outer join guest on board.id = guest.board_id where board.admin_id = 1;

/*inner join*/
select board.id, board.admin_id, board.title, board.description, board.create_date,
	board.update_date, board.delete_date, board.available, count(guest.id) AS guestcnt
	from board inner join guest
	on board.id = guest.board_id
	where board.admin_id = 1;

/*left join*/
select board.id, board.admin_id, board.title, board.description, board.create_date,
	board.update_date, board.delete_date, board.available
	from board left join guest
	on board.id = guest.board_id
	where board.admin_id = 1;

/*sub query*/
select id, admin_id, title, description, create_date, update_date, delete_date, available, 
(select count(*) from guest where board_id = 1) AS guestcnt
from board
where admin_id = 1;

/*left join group by */
select board.id, board.admin_id, board.title, board.description, board.create_date,
	board.update_date, board.delete_date, board.available, count(guest.id) AS guestcnt
	from board left join guest
	on board.id = guest.board_id
	where board.admin_id = 1
	group by board.id;

select board.*, count(guest.id) AS guestcnt
	from board left join guest
	on board.id = guest.board_id
	where board.admin_id = 2
	group by board.id
	limit 0,15;

select board.id, board.admin_id, board.title, board.description, board.create_date, board.update_date, board.delete_date, board.available, count(guest.id) AS guestcnt from board left join guest on board.id = guest.board_id where board.admin_id = 1 group by board.id;

select board.*, count(guest.id) AS guestcnt from board left join guest on board.id = guest.board_id where board.admin_id = 1 group by board.id;




-- for get joiner boards
select board.* 
from guest inner join board
on board.id = guest.board_id
where guest.user_id = 2 and !(board.admin_id = 2);

-- for get notice to userpage index
select * from notice
where board_id 
in (select board.id from guest inner join board
on board.id = guest.board_id
where guest.user_id = 2)
order by create_date desc
limit 0,15;

--for get notice and board information by board_id
select board.title as board_name, notice.* 
from notice inner join board
on notice.board_id = board.id
where board_id
in (select board.id from guest inner join board
on board.id = guest.board_id
where guest.user_id = 2)
order by create_date desc
limit 0,15; 

--for get boards and orner
select board.*, guest.nickname
from board inner join guest
on board.admin_id = guest.user_id
where board.id = guest.board_id
order by create_date desc;