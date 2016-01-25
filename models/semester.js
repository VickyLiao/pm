var mongoose=require('mongoose');
var SemesterSchema= new mongoose.Schema({

	name:String,
created_at:{type:Date,default:Date.now},
	status:{type:Boolean,default: true},
	isCurrent:{type: Boolean,default:false}

})
//SemesterSchema.plugin(autoIncrement.plugin, { model: 'Semester',field:'order'});
module.exports= mongoose.model('semester', SemesterSchema)
