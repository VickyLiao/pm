var express = require('express');
var mongoose= require('mongoose');
var jwt=require('jsonwebtoken');
var morgan     = require("morgan");
var bodyParser = require("body-parser");
var router = express.Router();
var User=require('../models/user');
var formidable=require("formidable");
var csvjson = require('csvjson');

router.delete('/:id',function(req,res){
    User.remove({_id:req.params.id},function(err,data){
      if(err) console.log(err)
        res.json({'message':'Deleted'});
    })
})

router.put('/:id',function(req,res){
    User.findById(req.params.id,function(err,user){
      user.fullname=req.body.fullname;
          user.email=req.body.email;
      user.organisation=req.body.organisation;
      user.phone=req.body.phone;
      user.role=req.body.role;
      user.password=req.body.password;
      user.save(function(err,data){
        res.json(data);
      })
    })
})
  

router.post('/login', function(req, res) {

    User.findOne({email: req.body.email}, function(err, user) {
       if(err){
      return res.send(401,'Connection Error Occurs')
       }
       if(user!=null){
       user.comparePassword(req.body.password,function(isMatch){
       if (!isMatch) {
               return res.send(401,'Password is Not Matched')
            }
            return res.json({user:user});
        });
     }
     else
     {
      return res.send(401,'User Not Found')
     
     }
       })
});

//create an user
router.post('/', function(req, res) {
  console.log(req.body)
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) console.log(err)
                var userModel = new User();
                 userModel.fullname=req.body.fullname;
                userModel.email = req.body.email;
                  userModel.phone = req.body.phone;
                    userModel.organisation = req.body.organisation;
                userModel.role = req.body.role;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                   
                    user.save(function(err, user) {
                        res.json(user);
                    });
                })
            })
});





router.post('/upload',function(req,res){

var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./uploads";       //set upload directory
    form.keepExtensions = true;     //keep file extension
    form.parse(req, function(err, fields, files) {

  var users=csvjson.toObject(files.file.path).output;

        User.collection.insert(users,function(err,data){
          if(err) console.log(err)
  res.json(data.ops)
  })
  })
});


/* GET users listing. */
router.get('/', function(req, res, next) {

	User.find(function(err,users){
    if(err) console.log(err);
    res.json(users);
  })
 
});

module.exports = router;
