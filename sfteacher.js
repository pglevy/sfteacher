var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();

	app.use(bodyParser.urlencoded({ extended: false }));

var DBNAME ="sfteacher.db"
var TABLE_COURSES = "tbl_cources";
var TABLE_STUDENTS = "tbl_students";
var TABLE_FLAG = "tbl_flag";//Survey


var SELECT = 0;
var MODIFY = 1;

///////////////////// on start up create new DB /////////////////////
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(DBNAME);

db.serialize(function() {

	//delete any existing tables
	db.run("DROP TABLE if exists " + TABLE_COURSES + "");
	db.run("DROP TABLE if exists " + TABLE_STUDENTS + "");
	db.run("DROP TABLE if exists " + TABLE_FLAG + "");


	//create tables

	db.run("CREATE TABLE if not exists " + TABLE_COURSES + " (date TEXT, time TEXT,course_name TEXT,course_ID TEXT,present_students INTEGER,absent_students INTEGER,excused_students INTEGER,tardy_students INTEGER)");
// 	db.run("CREATE TABLE if not exists " + TABLE_STUDENTS + " (userId INTEGER PRIMARY KEY AUTOINCREMENT,groupIds TEXT,  userName TEXT, fName TEXT, lName TEXT, avatar TEXT)");
// 	db.run("CREATE TABLE if not exists " + TABLE_FLAG + " (resultId INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, answer TEXT)");


	//insert group
// 	db.run("INSERT INTO " + TABLE_STUDENTS + "('groupName') VALUES ('Third Grade Math')");

// 	insert courses
// 	db.run("INSERT INTO " + TABLE_COURSES + "('userName','fName','lName','avatar','groupIds') VALUES ('djmason9','Darren','Mason','https://avatars1.githubusercontent.com/u/327110','1,2,3')");

// 	insert flags
//   db.run("INSERT INTO " + TABLE_FLAG + "('groupName') VALUES ('Third Grade Math')");

	//select and loop results
	db.each("SELECT * from " + TABLE_COURSES, function(err, row) {
		console.log(row.userId + ": " + row.userName + " (" + row.groupIds + ")");
  	});
});

db.close();

///////////////////// REST API /////////////////////

var server = app.listen(8081, function () {

	var host = server.address().address;
	var port = server.address().port;

});

/* USER */
app.post('/deleteUser', jsonParser, function (req, res){

    if (!req.body) return res.sendStatus(400);

  	deleteUser(req,res);

});

app.post('/addUser', jsonParser, function (req, res){
    if (!req.body) return res.sendStatus(400);

  	addUser(req,res);

});

app.get('/listUsers', function (req, res) {

	getAllUsers(res);
});
//used for login
app.get('/getUser', function (req, res) {

    console.log(req.query.userName);

	getUser(req, res);
});

/* QUIZ */
app.post('/createQuiz', jsonParser, function (req, res){

    if (!req.body) return res.sendStatus(400);

	createQuiz(req,res);
});

app.post('/deleteQuiz', jsonParser, function (req, res){

    if (!req.body) return res.sendStatus(400);

  	deleteQuiz(req,res);

});

app.get('/getQuiz', function (req, res) {

    console.log(req.query.quizId);

	getQuiz(req, res);
});

app.get('/getAllQuizzes', function (req, res) {
	getAllQuizzes(req, res);
});

/* GROUP */
app.get('/groups', function (req, res) {

	getAllGroups(res);
});

app.get('/', function (req, res) {
   res.send('Base call this does Nothing!');
});

///////////////////// FUNCITONS /////////////////////

//Add Quiz
function createQuiz(req,res){
	var body = req.body;
	databaseManager("INSERT INTO " + TABLE_QUIZ + "('groupId','quiz','quizName') VALUES ('" + body.groupId + "','" + body.quiz + "','" + body.quizName + "')", MODIFY,"Quiz Added",res);
}

function deleteQuiz(req,res){
	var body = req.body;
	databaseManager("DELETE FROM " + TABLE_QUIZ + " WHERE quizId ='" + body.quizId + "'", MODIFY, body.quizName + " has been deleted!",res);
}
//gets a quiz by id
function getQuiz(req,res){
	databaseManager("SELECT * from " + TABLE_QUIZ + " WHERE quizId ='" + req.query.quizId +"'",SELECT,null,res);
}

function getAllQuizzes(req,res){
	databaseManager("SELECT * from " + TABLE_QUIZ,SELECT,null,res);
}

//Delete User
function deleteUser(req,res){
	var body = req.body;
	databaseManager("DELETE FROM " + TABLE_DETAILS + " WHERE userId ='" + body.userId + "'", MODIFY,body.userName + " has been deleted!",res);
}

//Add User
function addUser(req,res){

	var body = req.body;
	if(body.avatarURL == "")
		body.avatarURL = "http://www.air-cosmos.com/img/unknown-avatar.png";//default pic

	databaseManager("INSERT INTO " + TABLE_DETAILS + "('userName','fName','lName','avatar','groupIds') VALUES ('" + body.userName + "','" + body.fName + "','" + body.lName + "','" + body.avatarURL + "','" + body.groupIds + "')", MODIFY,JSON.stringify(body),res);
}

//Get a Single User
function getUser(req,res){
	databaseManager("SELECT * from " + TABLE_DETAILS + " WHERE userName ='" + req.query.userName +"'",SELECT,null,res);
}

//Get All Users
function getAllUsers(res){
	databaseManager("SELECT  * from " + TABLE_DETAILS + "",SELECT,null,res);
}
//get all groups
function getAllGroups(res){
	databaseManager("SELECT * from " + TABLE_GROUP,SELECT,null,res);
}

function databaseManager(sql,type,response,res){

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
		}

	});

	//close db
	db.close();
}





