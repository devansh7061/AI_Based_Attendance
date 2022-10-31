import axios from "axios";

const url = "http://localhost:5000/viewRecord";

export const getRecords = () => axios.get(url);
export const addRecord = (newRecord) => axios.post(url, newRecord);
