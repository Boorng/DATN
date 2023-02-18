create table Account 
(
	idAccount uniqueidentifier primary key not null,
	email nvarchar(250) not null,
	password nvarchar(250) not null,
	created_at datetime2 not null,
	updated_at datetime2 not null,
	status bit not null,
	role int not null
);

create table Semester
(
	idSemester int primary key identity,
	name nvarchar(5) not null,
	schoolYear nvarchar(20) not null,
	timeStart date not null,
	timeEnd date not null,
);

create table Subject
(
	idSubject int primary key identity,
	name nvarchar(20) not null,
	grade int not null
);

create table Student 
(
	idStudent nvarchar(15) primary key,
	fullName nvarchar(70) not null,
	age int not null,
	gender nvarchar(10) not null,
	phone nvarchar(20) not null,
	ethnic nvarchar(20) not null,
	address nvarchar(max) not null,
	birthday date not null,
	avatar nvarchar(max) null,
	fatherName nvarchar(70) not null,
	fatherCareer nvarchar(50) not null,
	fatherPhone nvarchar(20) not null,
	motherName nvarchar(70) not null,
	motherCareer nvarchar(50) not null,
	motherPhone nvarchar(20) not null,
	status int not null,
	schoolYear nvarchar(20) not null,
	accountId uniqueidentifier unique not null,
	constraint FK_Student_Account foreign key (accountId) references Account (idAccount)
);

create table Team
(
	idTeam int primary key identity,
	name nvarchar(100) not null,
	notification nvarchar(max) null,
);

create table Teacher 
(
	idTeacher nvarchar(15) primary key,
	fullName nvarchar(70) not null,
	age int not null,
	gender nvarchar(10) not null,
	address nvarchar(max) not null,
	ethnic nvarchar(20) not null,
	phone nvarchar(20) not null,
	birthday date not null,
	avatar nvarchar(max) null,
	level int not null,
	status int not null,
	leader bit not null,
	viceLeader bit not null,
	isSeenNotification bit not null,
	teamId int null,
	accountId uniqueidentifier unique not null,
	constraint FK_Teacher_Account foreign key (accountId) references Account (idAccount),
	constraint FK_Teacher_Team foreign key (teamId) references Team(idTeam)
);

create table Conduct 
(
	idConduct uniqueidentifier primary key,
	evaluate nvarchar(15) not null,
	comment nvarchar(max) not null,
	semesterId int not null,
	studentId nvarchar(15) not null,
	constraint FK_Conduct_Semester foreign key (semesterId) references Semester (idSemester),
	constraint FK_Conduct_Student foreign key (studentId) references Student (idStudent)
);

create table Class 
(
	idClass nvarchar(15) primary key,
	name nvarchar(20) not null,
	academicYear nvarchar(max) not null,
	grade int not null,
	headerTeacherId nvarchar(15) not null,
	constraint FK_Class_HeaderTeacher foreign key (headerTeacherId) references Teacher (idTeacher)
);

create table Assign 
(
	idAssign uniqueidentifier primary key,
	semesterId int not null,
	subjectId int not null,
	classId nvarchar(15) not null,
	teacherId nvarchar(15) not null,
	constraint FK_Assign_Semester foreign key (semesterId) references Semester (idSemester),
	constraint FK_Assign_Subject foreign key (subjectId) references Subject (idSubject),
	constraint FK_Assign_Class foreign key (classId) references Class (idClass),
	constraint FK_Assign_Teacher foreign key (teacherId) references Teacher (idTeacher)
);

create table StudentClass
(
	idStudentClass int primary key identity,
	classId nvarchar(15) not null,
	studentId nvarchar(15) not null,
	constraint FK_StudentClass_Class foreign key (classId) references Class (idClass),
	constraint FK_StudentCLass_Student foreign key (studentId) references Student (idStudent)
);

create table Test
(
	idTest uniqueidentifier primary key,
	comment nvarchar(max) null,
	markWeight int not null,
	mark float not null,
	created_at datetime not null,
	updated_at datetime not null,
	subjectId int not null,
	semesterId int not null,
	studentClassId int not null,
	constraint FK_Test_Subject foreign key (subjectId) references Subject (idSubject),
	constraint FK_Test_Semester foreign key (semesterId) references Semester (idSemester),
	constraint FK_Test_StudentClass foreign key (studentClassId) references StudentClass (idStudentClass),
);


