var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();

	app.use(bodyParser.urlencoded({ extended: false }));

var DBNAME ="sfteacher.db"
var TABLE_COURSES = "tbl_courses";
var TABLE_STUDENTS = "tbl_students";
var TABLE_FLAG = "tbl_flag";//Survey


var SELECT = 0;
var MODIFY = 1;
var CHAIN = 2;

///////////////////// on start up create new DB /////////////////////
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(DBNAME);

db.serialize(function() {

//delete any existing tables
	db.run("DROP TABLE if exists " + TABLE_COURSES + "");
	db.run("DROP TABLE if exists " + TABLE_STUDENTS + "");
	db.run("DROP TABLE if exists " + TABLE_FLAG + "");

//create tables

	db.run("CREATE TABLE if not exists " + TABLE_COURSES + " (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT,course_name TEXT,course_id TEXT,present_students INTEGER,absent_students INTEGER,excused_students INTEGER,tardy_students INTEGER)");
	db.run("CREATE TABLE if not exists " + TABLE_STUDENTS + " (id INTEGER PRIMARY KEY AUTOINCREMENT, student_name TEXT,student_id	INTEGER,student_username TEXT,student_integration_id TEXT,course_id TEXT,attendance_status TEXT,last_updated_date TEXT,image TEXT)");
	db.run("CREATE TABLE if not exists " + TABLE_FLAG + " (id INTEGER PRIMARY KEY AUTOINCREMENT,survey TEXT,instructor TEXT,survey_date TEXT,student_id TEXT,tracking_item_name TEXT,course_id TEXT)");


//insert students
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Benjamin Lutz','blutz4839','blutz','Benjamin.Lutz','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dfhdesign/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Brad Wadleigh','bwadleigh5083','bwadleigh','Brad.Wadleigh','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/gusso/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Brad Workman','bworkman5157','bworkman','Brad.Workman','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/juaumlol/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Bujold Mile','bmile5019','bmile','Bujold.Mile','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Cadfael Elizabeth','celizabeth5021','celizabeth','Cadfael.Elizabeth','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/petr_stepanov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Deb Heck','dheck5051','dheck','Deb.Heck','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/yasincelikbass/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Deb Ivanov','divanov5125','divanov','Deb.Ivanov','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dotpegaso/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Edwina Resalvo','eresalvo5075','eresalvo','Edwina.Resalvo','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Edwina Sanders','esanders5149','esanders','Edwina.Sanders','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/c_southam/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Egon Adam','eadam5013','eadam','Egon.Adam','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Egon Mills','emills5099','emills','Egon.Mills','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Emily Sand','esand4974','esand','Emily.Sand','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/connor_gaunt/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Flint Thomasina','fthomasina5017','fthomasina','Flint.Thomasina','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/teleject/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Gene Ogilvie','gogilvie5147','gogilvie','Gene.Ogilvie','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/shbabalif/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Gene Pallas','gpallas5073','gpallas','Gene.Pallas','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dfhdesign/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Jeff Berger','jberger5035','jberger','Jeff.Berger','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/gusso/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Jeff Chappell','jchappell5109','jchappell','Jeff.Chappell','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/juaumlol/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Jim Fisher','jfisher5043','jfisher','Jim.Fisher','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Jim Fore','jfore5117','jfore','Jim.Fore','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/petr_stepanov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Johnny H','johnnyh5390','johnnyh','johnnyh','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/yasincelikbass/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Lester Knopf','lknopf4998','lknopf','Lester.Knopf','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dotpegaso/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Lexy Gilmore','lgilmore4976','lgilmore','Lexy.Gilmore','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Lynn Meyer','lmeyer5067','lmeyer','Lynn.Meyer','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/c_southam/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Lynn Nelson','lnelson5141','lnelson','Lynn.Nelson','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Max Jennings','mjennings5093','mjennings','Max.Jennings','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Max Johnson','mjohnson5007','mjohnson','Max.Johnson','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/connor_gaunt/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Max Jorgenson','mjorgenson4986','mjorgenson','Max.Jorgenson','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/teleject/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('McDuff Susan','msusan5025','msusan','McDuff.Susan','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/shbabalif/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Michael Joseph','mjoseph5057','mjoseph','Michael.Joseph','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dfhdesign/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Michael Shine','mshine5131','mshine','Michael.Shine','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/gusso/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Mostel Zero','mzero5023','mzero','Mostel.Zero','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/juaumlol/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Neha Desai','ndesai5041','ndesai','Neha.Desai','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Neha Elkins','nelkins5115','nelkins','Neha.Elkins','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/petr_stepanov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Nikki Tuason','ntuason5155','ntuason','Nikki.Tuason','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/yasincelikbass/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Nikki Vazquez','nvazquez5081','nvazquez','Nikki.Vazquez','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dotpegaso/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Qing Zhang','qzhang5091','qzhang','Qing.Zhang','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Rachel Lands','rlands4978','rlands','Rachel.Lands','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/c_southam/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Randy Albright','ralbright5027','ralbright','Randy.Albright','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Randy Andrews','randrews5101','randrews','Randy.Andrews','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Ron Wilkinson','rwilkinson4984','rwilkinson','Ron.Wilkinson','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/connor_gaunt/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Ryan Neil','rneil4980','roneil','Ryan.Neil','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/teleject/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Sara Hand','shand4982','shand','Sara.Hand','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/shbabalif/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Sean Basu','sbasu5107','sbasu','Sean.Basu','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dfhdesign/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Sean Baumann','sbaumann5033','sbaumann','Sean.Baumann','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/gusso/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Shan Lin','slin5163','slin','Shan.Lin','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/juaumlol/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Shan Yang','syang5089','syang','Shan.Yang','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Smith Jorge','sjorge5015','sjorge','Smith.Jorge','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/petr_stepanov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Tim Levitt','tlevitt5139','tlevitt','Tim.Levitt','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/yasincelikbass/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Tim Makuta','tmakuta5065','tmakuta','Tim.Makuta','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dotpegaso/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Wataru Kato','wkato5059','wkato','Wataru.Kato','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Wataru Lam','wlam5133','wlam','Wataru.Lam','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/c_southam/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Will Garcia','wgarcia5123','wgarcia','Will.Garcia','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Will Godfrey','wgodfrey5049','wgodfrey','Will.Godfrey','SCI-BIOL101-500-201601','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Xie Zhang','xzhang5167','xzhang','Xie.Zhang','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/connor_gaunt/128.jpg')");

//insert courses
	db.run("INSERT INTO " + TABLE_COURSES + "('date', 'time','course_name','course_id','present_students','absent_students','excused_students','tardy_students') VALUES ('M, W, F',' | 2–4p','Microbiology II','SCI-BIOL202-600-201602','49','2','1','3')");
	db.run("INSERT INTO " + TABLE_COURSES + "('date', 'time','course_name','course_id','present_students','absent_students','excused_students','tardy_students') VALUES ('T, Th',' | 9–11a','Western History & Medieval Politics','HIST-HIST301-600-201602','30','2','1','3')");
	db.run("INSERT INTO " + TABLE_COURSES + "('date', 'time','course_name','course_id','present_students','absent_students','excused_students','tardy_students') VALUES ('M, W',' | 10:30–12:30p','General Biology I','SCI-BIOL101-500-201601','22','2','1','3')");

//insert flags
  db.run("INSERT INTO " +  TABLE_FLAG + "('survey','instructor','survey_date','student_id','tracking_item_name',course_id) VALUES ('Fall 2016','Yasmin Gold','2016-06-07 10:00:00','joshbraun5005','Poor Attendants','SCI-BIOL202-600-201602')");
  db.run("INSERT INTO " +  TABLE_FLAG + "('survey','instructor','survey_date','student_id','tracking_item_name',course_id) VALUES ('Spring 2016','Yasmin Gold','2016-06-07 10:00:00','dmason1234','Work Life Interfering','SCI-BIOL202-600-201602')");
  db.run("INSERT INTO " +  TABLE_FLAG + "('survey','instructor','survey_date','student_id','tracking_item_name',course_id) VALUES ('Summer 2016','Yasmin Gold','2016-06-07 10:00:00','philiplevy1234','Dramatic Change in Appearance','HIST-HIST301-600-201602')");
  db.run("INSERT INTO " +  TABLE_FLAG + "('survey','instructor','survey_date','student_id','tracking_item_name',course_id) VALUES ('Summer 2016','Yasmin Gold','2016-06-07 10:00:00','steveday1234','Dramatic Change in Appearance','SCI-BIOL202-600-201602')");


	//select and loop results
	db.each("SELECT * from " + TABLE_COURSES, function(err, row) {
		console.log(row.id + ": " + row.course_name + " (" + row.date + ")");
  	});
});

db.close();

///////////////////// REST API /////////////////////

var server = app.listen(8081, function () {

	var host = server.address().address;
	var port = server.address().port;

});
//
// /* GET DATA */
app.get('/courses', function (req, res) {
	getAllCourses(res);
});

app.get('/students', function (req, res) {
	getAllStudents(res);
});

app.get('/student/course', function (req, res) {
  console.log(req.query);
	getStudentsInClass(req, res);
});

app.get('/surveys', function (req, res) {
	getSurveyInClass(req, res);
});

app.get('/updateAttendance', jsonParser, function (req, res){
  console.log(req.query);
//   if (!req.body) return res.sendStatus(400);

	updateAttendance(req,res);
});
//
// app.post('/addUser', jsonParser, function (req, res){
//     if (!req.body) return res.sendStatus(400);
//
//   	addUser(req,res);
//
// });
//
// app.get('/listUsers', function (req, res) {
//
// 	getAllUsers(res);
// });
// //used for login
// app.get('/getUser', function (req, res) {
//
//     console.log(req.query.userName);
//
// 	getUser(req, res);
// });
//
// /* QUIZ */

//
// app.post('/deleteQuiz', jsonParser, function (req, res){
//
//     if (!req.body) return res.sendStatus(400);
//
//   	deleteQuiz(req,res);
//
// });
//
// app.get('/getQuiz', function (req, res) {
//
//     console.log(req.query.quizId);
//
// 	getQuiz(req, res);
// });
//
// app.get('/getAllQuizzes', function (req, res) {
// 	getAllQuizzes(req, res);
// });
//
// /* GROUP */
// app.get('/groups', function (req, res) {
//
// 	getAllGroups(res);
// });
//
// app.get('/', function (req, res) {
//    res.send('Base call this does Nothing!');
// });
//
// ///////////////////// FUNCITONS /////////////////////
//
// //Add Quiz
// function createQuiz(req,res){
// 	var body = req.body;
// 	databaseManager("INSERT INTO " + TABLE_QUIZ + "('groupId','quiz','quizName') VALUES ('" + body.groupId + "','" + body.quiz + "','" + body.quizName + "')", MODIFY,"Quiz Added",res);
// }
//
// function deleteQuiz(req,res){
// 	var body = req.body;
// 	databaseManager("DELETE FROM " + TABLE_QUIZ + " WHERE quizId ='" + body.quizId + "'", MODIFY, body.quizName + " has been deleted!",res);
// }
// //gets a quiz by id
// function getQuiz(req,res){
// 	databaseManager("SELECT * from " + TABLE_QUIZ + " WHERE quizId ='" + req.query.quizId +"'",SELECT,null,res);
// }
//
// function getAllQuizzes(req,res){
// 	databaseManager("SELECT * from " + TABLE_QUIZ,SELECT,null,res);
// }
//
// //Delete User
// function deleteUser(req,res){
// 	var body = req.body;
// 	databaseManager("DELETE FROM " + TABLE_DETAILS + " WHERE userId ='" + body.userId + "'", MODIFY,body.userName + " has been deleted!",res);
// }
//
// //Add User
// function addUser(req,res){
//
// 	var body = req.body;
// 	if(body.avatarURL == "")
// 		body.avatarURL = "http://www.air-cosmos.com/img/unknown-avatar.png";//default pic
//
// 	databaseManager("INSERT INTO " + TABLE_DETAILS + "('userName','fName','lName','avatar','groupIds') VALUES ('" + body.userName + "','" + body.fName + "','" + body.lName + "','" + body.avatarURL + "','" + body.groupIds + "')", MODIFY,JSON.stringify(body),res);
// }
//
// //Get a Single User
// function getUser(req,res){
// 	databaseManager("SELECT * from " + TABLE_DETAILS + " WHERE userName ='" + req.query.userName +"'",SELECT,null,res);
// }
//
// Gets
function getAllCourses(res){
	databaseManager("SELECT  * from " + TABLE_COURSES + "",SELECT,null,res);
}

function getAllStudents(res){
	databaseManager("SELECT  * from " + TABLE_STUDENTS + "",SELECT,null,res);
}

function getStudentsInClass(req,res){
  var body = req.query;
	databaseManager("SELECT * from " + TABLE_STUDENTS + " WHERE course_id ='" + body.courseId +"'",SELECT,null,res);
}

function getSurveyInClass(req,res){
  var body = req.query;
//   SELECT f.id, f.survey, s.student_name, s.image,s.student_id, f.course_id, s.student_id  from tbl_flag f   INNER JOIN   tbl_students s   on s.student_id =  f.student_id WHERE f.course_id = 'SCI-BIOL202-600-201602'
	databaseManager("SELECT f.id, f.survey, s.student_name, s.image,s.student_id, f.course_id, s.student_id  from " + TABLE_FLAG + " f INNER JOIN " + TABLE_STUDENTS + " s ON s.student_id = f.student_id WHERE f.course_id ='" + body.courseId +"'",SELECT,null,res);
}

//POSTS
function updateAttendance(req,res){
	var body = req.query;
	databaseManager("UPDATE " + TABLE_STUDENTS + " SET attendance_status='" + body.status + "' WHERE student_id = '" + body.studentId + "'", CHAIN, null,res, getStudentsInClass,req);

}

function updateFlag(req,res){
	var body = req.body;
	databaseManager("UPDATE " + TABLE_FLAG + " SET attendance_status='" + body.status + "' WHERE student_id = '" + body.studentId + "'", MODIFY, body.studentName + " has been updated!",res);
}


// //get all groups
// function getAllGroups(res){
// 	databaseManager("SELECT * from " + TABLE_GROUP,SELECT,null,res);
// }

function databaseManager(sql,type,response,res,callback,req){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//open db
	var db = new sqlite3.Database(DBNAME);

	console.log(sql);

	db.serialize(function() {
		switch(type){
			case SELECT :
				db.all(sql, function(err, rows) {
					res.send(JSON.stringify(rows));
				});
				break;
			case MODIFY :
				db.run(sql);
				res.send(response);
				break;
			case CHAIN :
				db.all(sql,function(err, rows){
				  callback(req,res)
				});
				break;
		}

	});

	//close db
	db.close();
}





