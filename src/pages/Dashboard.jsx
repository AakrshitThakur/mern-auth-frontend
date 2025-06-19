// src/pages/Dashboard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { notifySuccess, notifyError } from "../utils/toastify.js";

const columns = [
  { id: "username", label: "Username", minWidth: 170, align: "left" },
  { id: "dob", label: "d.o.b.", minWidth: 150, align: "left" },
  { id: "joiningDate", label: "Joining Date", minWidth: 150, align: "left" },
  { id: "email", label: "Email", minWidth: 170, align: "left" },
  { id: "role", label: "Role", minWidth: 70, align: "left" },
];

function createData(username, dob, joiningDate, email, role) {
  return { username, dob, joiningDate, email, role };
}

function Dashboard() {
  const [rows, setRows] = React.useState([
    createData(
      "Loading...",
      "Loading...",
      "Loading...",
      "Loading...",
      "Loading..."
    ),
  ]);
  React.useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch("http://localhost:5000/api/dashboard", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response
          .json()
          .then((payload) => ({ payload, status: response.status }));
      })
      .then(({ payload, status }) => {
        if (status === 200) {
          notifySuccess(payload.msg);
          setRows(payload.users);
        } else if (status === 400) {
          notifyError(payload.msg);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div id="dashboard">
      <div className="min-h-screen bg-gradient-to-b from-teal-200 to-teal-300 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.email}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
