import React, { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import { useSelector, useDispatch } from "react-redux";
import { getRecords } from "../../actions/records";
import { Center, Box, Button, Menu, MenuButton, IconButton } from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons"
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
function Admin() {
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
          <Button colorScheme="gray" variant="outline" className="logout-btn">
            Logout
          </Button>
          <Button colorScheme="gray" variant="outline">
            Add Student
          </Button>
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
