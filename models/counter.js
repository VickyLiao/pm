var mongoose=require('mongoose');
var CounterSchema= new mongoose.Schema({
 category: String,
  seq: Number

})
//SemesterSchema.plugin(autoIncrement.plugin, { model: 'Semester',field:'order'});
module.exports= mongoose.model('counter', CounterSchema)
