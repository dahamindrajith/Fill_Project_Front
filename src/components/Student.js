import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Student() {
  const paperStyle = {
    padding: "50px 300px",
    width: 500,
    margine: "20px auto",
  };

  const [name, setName] = useState("");
  const [adderss, setAddress] = useState("");
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    const student = { name, adderss };
    console.log(student);
    if (student.name === "") {
      alert("Please Enter the Name");
    } else if (student.adderss === "") {
      alert("Please Enter the Address");
    } else {
      fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      }).then(() => {
        console.log("New Student Added");
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getstudent")
      .then((res) => res.json())
      .then((resul) => {
        setStudents(resul);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "gray" }}>
          <u>Add Student</u>
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={adderss}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="success" onClick={handleClick}>
            Success
          </Button>
        </Box>
      </Paper>

      <h1>Students</h1>

      {/* <Paper elevation={3} style={paperStyle}> */}
      

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.id}
              </TableCell>
              <TableCell align="right">{student.name}</TableCell>
              <TableCell align="right">{student.adderss}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

   
      {/* </Paper> */}
    </Container>
  );
}
