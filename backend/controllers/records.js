import Record from "../models/record.js";

export const getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.error(error);
  }
};

export const addRecord = async (req, res) => {
  const record = req.body;
  const newRecord = new Record(record);
  try {
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
