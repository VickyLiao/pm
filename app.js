var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer  = require('multer');
var csvjson = require('csvjson');
//var upload   =   multer({ dest: './public/uploads/'});
var mongoose = require('mongoose'); 
//var autoIncrement = require('mongoose-auto-increment');

// var routes = require('./routes/index');
//var upload   =   multer({ dest: 'uploads/'}).array('files');
var uri='mongodb://localhost/pm-test'
//var conn=mongoose.createConnection(uri);
//autoIncrement.initialize(conn);
var app = express();
var semesters=require('./routes/semester');
var projects= require('./routes/project');
var students=require('./routes/student');
var email=require('./routes/email');
var users=require('./routes/user');

mongoose.connect(uri,function(err){
    if (err) console.log(err);
    console.log('Mongodb connect succesfully')
}); 





//connection.model('project', ProjectSchema)
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
*/
//app.use(upload);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/projects',projects);
app.use('/api/students',students);
app.use('/api/semesters',semesters);
app.use('/api/users',users);
app.use('/api/email',email);

/*app.use(multer({ dest: './public/app/assets/uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.path)
      console.log(csvjson.toObject('./'+file.path).output);
        
    }
}));

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});*/

// error handlers
app.get('*', function(req, res) {

        res.sendFile(__dirname +'/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
app.listen(5000);
console.log("App listening on port 5000");
