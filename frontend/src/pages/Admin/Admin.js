import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { addStudent } from "../../actions/students";
import { useSelector, useDispatch } from "react-redux";
import { getRecords } from "../../actions/records";
import {
  Center,
  useDisclosure,
  Box,
  Button,
  Menu,
  MenuButton,
  IconButton,
  FormLabel,
  FormControl,
  Input,
  ModalBody,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import "./Admin.css";
import { Navigate } from "react-router-dom";
function Admin({isLoggedIn, setLoggedIn}) {
  const records = useSelector((state) => state.records);
  const dispatch = useDispatch();
  console.log(records);
  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [studentData, setStudentData] = useState({
    name: "",
    desc: "",
    img: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(studentData));
    console.log(studentData);
    setStudentData({ name: "", desc: "", img: "" });
    alert("Student added successfully!");
    onClose();
  };
  const handleLogout = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    <Navigate to="/login"></Navigate>
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
        <div className="menu">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
          </Menu>
        </div>
        Hello Admin!
        <div className="buttons">
          <Button colorScheme="gray" variant="outline" className="logout-btn" onClick={(e) => handleLogout(e)}>
            Logout
          </Button>
          <Button colorScheme="gray" variant="outline" onClick={onOpen}>
            Add Student
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Student</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Name"
                    value={studentData.name}
                    onChange={(e) =>
                      setStudentData({ ...studentData, name: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Roll No.</FormLabel>
                  <Input
                    placeholder="Roll No."
                    value={studentData.desc}
                    onChange={(e) =>
                      setStudentData({ ...studentData, desc: e.target.value })
                    }
                  />
                </FormControl>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setStudentData({ ...studentData, img: base64 })
                  }
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </Box>
      <TableContainer>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Roll No.</Th>
              <Th isNumeric>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.map((record) => {
              return (
                <Tr>
                  <Td>{record.name}</Td>
                  <Td>{record.desc}</Td>
                  <Td isNumeric>{formatDate(record.createdAt)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Admin;
