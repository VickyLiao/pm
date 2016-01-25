var mongoose=require('mongoose');

var ProjectSchema= new mongoose.Schema({
	no:  String,
	project_id:String,
	title:  {type:String,required:true},
	description: String,
	questions2:String,
	questions3:String,
	questions4:String,
	questions5:String,
	questions6:String,
	questions7:String,
	questions8:String,
	questions9:String,
	questions10:String,
	students:[],
	comments:[],
	supervisors:[],
	clients:[],
	status: {type:String,default:'Created'},
	created_at:{type:Date,default:Date.now},
	semester:  {type:String,required:true},
	isNewObject:Boolean

})



ProjectSchema.pre('save', function(next) {
    var doc = this;
    	if(!this.isNewObject) return next();
    counter.findByIdAndUpdate({_id: 'project_id'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.project_id = counter.seq;
        next();
    });
});


module.exports= mongoose.model('project', ProjectSchema)



