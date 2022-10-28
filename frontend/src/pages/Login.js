import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

function Login({isLoggedIn, setLoggedIn}) {
  return isLoggedIn ? (
    <Navigate to="/admin" replace />
  ) : (
    <div>
      <form onSubmit={(e) => verifyLogin(e, { setLoggedIn })}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" id="email" />
          <FormHelperText>
            For dev please use, admin123@gmail.com
          </FormHelperText>
          <FormLabel>Password</FormLabel>
          <Input type="password" id="password" />
          <FormHelperText>For dev please use, admin123</FormHelperText>
          <Button mt={4} colorScheme="teal" type="Submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

function verifyLogin(e, {setLoggedIn}) {
  e.preventDefault();
  console.log("Called");
  let request = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  axios
    .post("http://localhost:5000/login", request)
    .then((resp) => {
      if (resp.data.message === "Successful Login!") {
        setLoggedIn(true);
        <Navigate to="/admin"></Navigate>
        e.preventDefault();
      }
      else {
        alert(resp.data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default Login;
