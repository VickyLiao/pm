var express =require ('express');
var router=express.Router();
var mongoose =require('mongoose');
var Semester = require('../models/semester');



/* Get all projects
router.get('/',function(req,res,next) {
Semester.find(function(err,semesters){
	if(err) return next(err);
	res.json(semesters);
});

});

*/
 //var semesters=[{id:1, name:'SP22015',status:'active'},{id:2,name:'SP52015',status:'inactive'},{id:3,name:'SP22016',status:'inactive'},{id:4,name:'SP52016',status:'inactive'}];
router.get('/',function(req,res,next){
Semester.find(function(err,data){
	res.json(data);
})
})


router.get('/:id',function(req,res,next){
	
	var length=Object.keys(semesters).length;
	var semester=null;
	for (var i=0;i<length;i++)
	{
		if (semesters[i].id==req.params.id)
		{
			semester=semesters[i];
			break;
		}
	}

	res.json(semester);
})

router.get('/:status',function(req,res,next){

	var length=Object.keys(semesters).length;
	var semester=null;
	for (var i=0;i<length;i++)
	{
		if (semesters[i].status==req.params.status)
		{
			semesters[i].status='inactive';
		}
	}
	
	res.json(semester);
})

router.post('/',function(req,res,next){
console.log(req.body)
	var semester=new Semester();
	semester.name=req.body.name;
	console.log(semester.name)
	semester.save(function(err,data){
		if(err) console.log(err)
			console.log(data)
	})
	
	res.json(semester);
})
/*
router.delete('/:id',function(req,res,next){
	
	var length=Object.keys(semesters).length;
	
	for (var i=0;i<length;i++)
	{
		if (semesters[i].id==req.params.id)
		{
			semesters.splice(i,1);
		}
		
	}
	res.json(semesters);
})*/


router.delete('/:id',function(req,res,next){
	Semester.remove({_id:req.params.id},function(err,data){
		if(err) console.log(err);
		res.json({message:'Deleted'})
	})
})







router.post('/',function(req,res,next){
	var semester={id:req.body.id,name:req.body.name,status:req.body.status};
	semesters.push(semester);
	res.json(semesters);
})

/*router.put('/changeStatus',function(req,res,next){
	console.log(req.body);
	var length=Object.keys(semesters).length;

	for (var i=0;i<length;i++)
	{
		if (semesters[i].status=='active')
		{
			semesters[i].status='inactive';
			break;
		}
	}
	for (var i=0;i<length;i++)
	{
		if (semesters[i].id==req.body.id)
		{
			semesters[i].status='active';
			break;
		}
	}
	console.log(semesters);
	res.json(semesters);
})*/


router.put('/changeStatus',function(req,res,next){

	Semester.findOne({name:req.body.name},function(err,semester){
		if(err) console.log(err);
		semester.status=!req.body.status;
		semester.save(function(err,data){
			res.json({message:'Status Updated'})
		})
	})
	
	
})


router.put('/changeIsCurrent',function(req,res,next){
	

	
	Semester.findOne({isCurrent:true}, function(err,semester){
		if(semester!=null){
		semester.isCurrent=false;
		semester.save(function(){

			
	})
	}
})
	Semester.findOne({name:req.body.name},function(err,semester1){
		semester1.isCurrent=true;
		semester1.save(function(){
			res.json({message:'Status Updated'})
		})

		})
	
	
	

})


module.exports=router;
