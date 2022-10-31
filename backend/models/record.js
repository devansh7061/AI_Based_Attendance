import mongoose from "mongoose";

var recordSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
  },
  {timestamps: true}
);

const Record = mongoose.model("Record", recordSchema);

export default Record;