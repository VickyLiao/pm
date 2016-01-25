var mongoose=require('mongoose');

var StudentSchema= new mongoose.Schema({
	'Student Id': String,
	'Student First Name': String,
	'Student Family Name': String,
	'Student Email Address':String,
	'Current GPA':Number,
	'Program Plan':String,
	'Subject Area Catalog Number':String,
	'Citizenship Status Desc Medium':String,
	semester: String,
	project_no:String,
	created_by:{username:String, email:String},
	created_at:{type:Date,default:Date.now}


})

module.exports= mongoose.model('student', StudentSchema)