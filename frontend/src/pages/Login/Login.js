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
  Center,
} from "@chakra-ui/react";
import "./Login.css";

function Login({ isLoggedIn, setLoggedIn }) {
  return isLoggedIn ? (
    <Navigate to="/admin" replace />
  ) : (
    <div className="form">
      <Center>
        <form className="formContent" onSubmit={(e) => verifyLogin(e, { setLoggedIn })}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" id="email" />
            <FormHelperText color="whiteAlpha.700">
              For dev please use, admin123@gmail.com
            </FormHelperText>
            <FormLabel>Password</FormLabel>
            <Input type="password" id="password" />
            <FormHelperText color="whiteAlpha.700">
              For dev please use, admin123
            </FormHelperText>
            <Center>
              <Button mt={4} colorScheme="gray" variant="outline" type="Submit">
                Submit
              </Button>
            </Center>
          </FormControl>
        </form>
      </Center>
    </div>
  );
}

function verifyLogin(e, { setLoggedIn }) {
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
        <Navigate to="/admin"></Navigate>;
        e.preventDefault();
      } else {
        alert(resp.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default Login;
