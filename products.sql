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


select * from board where id = (select board_id from guest where user_id = ?)

insert into user(userID, password, email, available, create_date) values('jumpegg', '870915', 'jumpegg@naver.com',true, now());
insert into user(userID, password, email) values('wonny', 'wonny', 'wonny@naver.com');

/*테이블 구조 보기*/
desc board;