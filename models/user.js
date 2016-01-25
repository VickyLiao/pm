var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var SALT_WORK_FACTOR=10;
var UserSchema= new mongoose.Schema({
	fullname: {type:String,required:true},
	email:{type:String,required:true},
	organisation:String,
	role:{type:String,default:'Supervisor'},
	phone:String,
	password:String,
	created_by:{username:String, email:String},
	created_at:{type:Date,default:Date.now}
	

})

UserSchema.pre('save',function(next){
	var user=this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err);
		 bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
	});
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

module.exports= mongoose.model('user', UserSchema)