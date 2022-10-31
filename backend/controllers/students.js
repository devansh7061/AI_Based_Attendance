import Student from "../models/student.js";

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.error(error);
    }
}

export const addStudent = async (req, res) => {
    const student = req.body;
    const newStudent = new Student(student);
    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}