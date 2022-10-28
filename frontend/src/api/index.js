import axios from "axios";

const url = "http://localhost:5000/admin";

export const getStudents = () => axios.get(url);
export const addStudent = (newStudent) => axios.post(url, newStudent);