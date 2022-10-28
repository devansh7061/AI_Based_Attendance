import React, { useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../../actions/students";

const Form = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    desc: "",
    img: "",
  });
  function handleClear() {
    setStudentData({ name: "", desc: "", img: null });
  }
  const students = useSelector((state) => state.students);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(studentData));
    console.log(studentData);
    setStudentData({ name: "", desc: "", img: "" });
    alert("Student added successfully!");
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root}${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Add a Student</Typography>
        <TextField
          name="name"
          variant="outlined"
          label="Student Name"
          fullWidth
          value={studentData.name}
          onChange={(e) =>
            setStudentData({ ...studentData, name: e.target.value })
          }
        />
        <TextField
          name="desc"
          variant="outlined"
          label="Description/ Roll No"
          fullWidth
          value={studentData.desc}
          onChange={(e) =>
            setStudentData({ ...studentData, desc: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setStudentData({ ...studentData, img: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
