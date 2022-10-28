import mongoose from "mongoose";

var studentSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String
});
  
//Image is a model which has a schema imageSchema
const Student = mongoose.model("Student", studentSchema);

export default Student;