var express =require ('express');
var router=express.Router();
var mongoose =require('mongoose');
var Project = require('../models/project');
var Student = require('../models/student');
var formidable=require("formidable");
var csvjson = require('csvjson');


/* Get all projects*/
router.get('/',function(req,res,next) {
Project.find(function(err,projects){
	if(err) return next(err);
	res.json(projects);
});

});





/*Create a project
when Project is created, only need title,description,client,semester and questions
return a project object
*/


router.post('/',function(req,res,next){
	var project=new Project();
	project.title=req.body.title;
	project.description=req.body.description;
	project.clients=req.body.clients;
	project.semester=req.body.semester;
    project.question2=req.body.question2;
      project.question3=req.body.question3;
        project.question4=req.body.question4;
          project.question5=req.body.question5;
            project.question6=req.body.question6;
              project.question7=req.body.question7;
                project.question8=req.body.question8;
                  project.question9=req.body.question9;
                    project.question10=req.body.question10;
            
	project.save(function(err,data){
		if(err) console.log(err)
     res.json(data)
	})

});

//=========================================


/*Update a project
when Project is update, no,title,description,clients,supervisors,students,status,semester and comments can be updated
students also need to be updated
return a project object
*/


router.put('/:id',function(req,res,next){
 
 Project.findOne({_id:req.params.id},function(err,project){
      
  project.no=req.body.no;
  project.title=req.body.title;
  project.description=req.body.description;
  project.clients=req.body.clients;
  project.supervisors=req.body.supervisors;
  project.students=req.body.students;
    project.comments=req.body.comments;
  project.semester=req.body.semester;
  project.status=req.body.status;
      project.save(function(err,data){
    if(err) console.log(err)
 
console.log(req.body.no)
//update students table if students is not null and have objects
//clear all students who originally belong to this project
if(req.body.students!=null && req.body.students.length>0){
Student.update({project_no:req.body.no},{project_no:null},{multi:true},function(err,num){
         if(err) console.log(err)
          console.log('num '+num)

          var ids=[];
for(var i=0;i<req.body.students.length;i++){
  ids.push(req.body.students[i]._id);
}

Student.update({_id:{$in: ids}},{project_no:req.body.no},{multi:true},function(err,num){
  if(err) console.log(err)
          console.log('num1 '+num)
  
})
})
//mark the students who belong to this project


 }
//=========finish update student===========================   

res.json(data)
 })

 });
})
  
//==============================================




router.post('/upload',function(req,res){

var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./uploads";       //set upload directory
    form.keepExtensions = true;     //keep file extension
    form.parse(req, function(err, fields, files) {
	  

  var projects=csvjson.toObject(files.file.path).output;
  
      Project.collection.insert(projects,function(err,data){
        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
     
  })
  })
  res.json({messasg:'Successfully Upload Students'})

});





router.delete('/:id',function(req,res,next){
  Project.remove({_id:req.params.id},function(err,data){
    if(err) console.log(err);
      res.json({message:'Deleted'});
  })

})

router.delete('/:id/:comment',function(req,res,next){
  Project.findOne({_id:req.params.id},function(err,project){
    if(err) console.log(err);
    if(project.comments!=null){
 
    for(var i=0;i<project.comments.length;i++){
      if(project.comments[i].name==req.params.comment) {
        delete project.comments[i];
        break;
      }
    }
  }
    project.save(function(err){
    if(err) console.log(err)
  })
      res.json({message:'Deleted'});
  })


})

module.exports=router;
