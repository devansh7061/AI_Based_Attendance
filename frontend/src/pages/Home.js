import React from "react";
import { Box, Divider, Center, Flex, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
function Home() {
  const studentProp = {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwpHfSxec2smXlG2M_JnHab_T8LHAMYGF0VJ0YRro0DFxnbJ39UHdZLFhXYn4H1yzLD7k&usqp=CAUttps://img.freepik.com/premium-vector/graduate-student-avatar-student-student-icon-flat-design-style-education-graduation-isolated-student-icon-white-background-vector-illustration-web-application-printing_153097-1566.jpg?w=2000",
    imageAlt: "Rear view of modern home with pool",
    title: "Student Login",
  };
  const AdminProp = {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNo4stwrTlL-hXj37PpuJuk3TLUSz25FPuQ&usqp=CAU",
    imageAlt: "Rear view of modern home with pool",
    title: "Admin Login",
  };
  return (
    <div>
      <Box
        bg="red.400"
        color="white"
        height="20"
        fontSize="5xl"
        textAlign="center"
      >
        AI Based Attendance System
      </Box>
      <div>
        <Center>
          <Flex>
            <div className="card">
              <Card property={studentProp}></Card>
            </div>
            <div className="card">
              <Link to="/login">
                <Card property={AdminProp}></Card>
              </Link>
            </div>
          </Flex>
        </Center>
      </div>
      <Center height="50px">
        <Divider orientation="vertical" variant="thick" />
      </Center>
    </div>
  );
}

export default Home;