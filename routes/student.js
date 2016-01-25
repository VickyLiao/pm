var express =require ('express');
var router=express.Router();
var mongoose =require('mongoose');
var Student = require('../models/student');
var formidable=require("formidable");
var csvjson = require('csvjson');



/* Get all students*/

/*router.get('/',function(req,res,next){
	res.json(students);
})*/
router.get('/',function(req,res,next){

	Student.find(function(err,students){
		if(err) console.log(err);
		res.json(students);
	})
});




router.post('/',function(req,res,next){

	var student=new Student;
	student['Student Id']=req.body['Student Id'];
	student['Student First Name']=req.body['Student First Name'];
	student['Student Family Name']=req.body['Student Family Name'];
	student['Student Email Address']=req.body['Student Email Address'];
	student['Current GPA']=req.body['Current GPA'];
	student['Program Plan']=req.body['Program Plan'];
	student['Subject Area Catalog Number']=req.body['Subject Area Catalog Number'];
	student['Citizenship Status Desc Medium']=req.body['Citizenship Status Desc Medium'];
	student.semester=req.body.semester;
	student.project_no=req.body.project_no;
	student.save(function(err,data){
		if(err) console.log(err);
		res.json(data);
	})

})




router.post('/upload',function(req,res){
 
var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./uploads";       //set upload directory
    form.keepExtensions = true;     //keep file extension
    form.parse(req, function(err, fields, files) {

  var students=csvjson.toObject(files.file.path).output;
  		var length=Object.keys(students).length;
  		for(var i=0;i<length;i++){
  			students[i].semester=fields['semester[name]'];
  		}
      Student.collection.insert(students,function(err,data){
      	if(err) console.log(err)
      		  res.json(data.ops)
        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
  })
  })
});


router.delete('/:id',function(req,res,next){
	Student.remove({_id:req.params.id},function(err,data){
		if(err) console.log(err);
			res.json({message:'Deleted'});
	})
	/*var length=Object.keys(students).length;
		console.log(students[0].student_id);
	for(var i=0;i<length;i++){
		
		if (students[i].student_id==req.params.id)
		{
			students.splice(i,1);
			break;
	
		}
	}*/

})

//copy students to another semester
router.put('/copy',function(req,res,next){
		var students_length=Object.keys(students).length;
		var action_students_length=Object.keys(req.body.students).length;
		console.log(req.body.students);
		var semester=req.body.actionSemester;
		var result={success:[],fail:[]}

	for(var i=0;i<action_students_length;i++){
		var goAhead=true;
		for(var j=0;j<students_length;j++){
		if (students[j].student_id==req.body.students[i].student_id && students[j].semester==semester)
		{
			goAhead=false;
			break;
		}
		}
		var student= req.body.students[i];
		if (goAhead) 
		{
			student.semester=semester;
			delete student.selected;
			students.push(student);
		}
		else
		{
			result.fail.push(student);
		}
			
	}
	result.success=students;
	console.log(result);
	res.json(result);
})
	



//move students to another semester

router.put('/move',function(req,res,next){
		var students_length=Object.keys(students).length;
		var action_students_length=Object.keys(req.body.students).length;
		console.log(req.body.students);
		var semester=req.body.actionSemester;
		var result={success:[],fail:[]}

	for(var i=0;i<action_students_length;i++){
		var goAhead=true;
		for(var j=0;j<students_length;j++){
		if (students[j].student_id==req.body.students[i].student_id && students[j].semester==semester)
		{
			goAhead=false;
			break;
		}
		}
		var student= req.body.students[i];
		if (goAhead) 
		{
			for(var j=0;j<students_length;j++){
		if (students[j].student_id==req.body.students[i].student_id && students[j].semester==req.body.students[i].semester)
		{
			students.splice(j,1);
			break;
		}
	}
			student.semester=semester;
			delete student.selected;
			students.push(student);

		}
	
		else
		{
			result.fail.push(student);
		}
			
	}
	result.success=students;
	console.log(result);
	res.json(result);
})

module.exports=router;