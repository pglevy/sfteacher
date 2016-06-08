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
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Darren Mason','dmason1234','dmason','darren.mason','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Philip Levy','philiplevy1234','philiplevy','philip.levy','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/c_southam/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Josh Braun','joshbraun5005','joshbraun','josh.braun','SCI-BIOL202-600-201602','ABSENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Steve Jobs','sjobs1234','sjobs','steve.jobes','SCI-BIOL101-500-201601','ABSENT','2016-05-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Aaron Jones','arronjones1234','aaronjones','arron.jones','HIST-HIST301-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/connor_gaunt/128.jpg')");
  db.run("INSERT INTO " + TABLE_STUDENTS + "('student_name','student_id','student_username','student_integration_id','course_id','attendance_status','last_updated_date','image') VALUES ('Steve Day','steveday1234','steveday','steve.day','SCI-BIOL202-600-201602','PRESENT','2016-06-07 10:00:00','https://s3.amazonaws.com/uifaces/faces/twitter/teleject/128.jpg')");

//insert courses
	db.run("INSERT INTO " + TABLE_COURSES + "('date', 'time','course_name','course_id','present_students','absent_students','excused_students','tardy_students') VALUES ('2016-06-07 10:00:00','10:00:00 AM','Microbiology II','SCI-BIOL202-600-201602','49','2','1','3')");
	db.run("INSERT INTO " + TABLE_COURSES + "('date', 'time','course_name','course_id','present_students','absent_students','excused_students','tardy_students') VALUES ('2016-06-05 10:00:00','08:00:00 AM','Western History & Medieval Politics','HIST-HIST301-600-201602','30','2','1','3')");
	db.run("INSERT INTO " + TABLE_COURSES + "('date', 'time','course_name','course_id','present_students','absent_students','excused_students','tardy_students') VALUES ('2016-06-4 10:00:00','13:00:00 PM','General Biology I','SCI-BIOL101-500-201601','22','2','1','3')");

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





