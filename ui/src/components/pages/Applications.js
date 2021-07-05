import { useState, useContext, useEffect } from "react";
import SingleApplication from "../pages/SingleApplication";
import AuthContext from "../../context/authContext";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";

const columns = [
  { id: "firstName", label: "Όνομα", minWidth: 170 },
  { id: "lastName", label: "Επώνυμο", minWidth: 170 },
  { id: "afm", label: "ΑΦΜ", minWidth: 100 },
  { id: "amka", label: "AMKA", minWidth: 100 },
  { id: "status", label: "Κατάσταση αίτησης", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Applications = (props) => {
  const authContext = useContext(AuthContext);

  const [muiState, setMuiState] = useState({
    open: false,
  });

  const {
    users,
    currentUser,
    loading,
    fetchApplications,
    showSingleApplication,
    state,
    loadUser,
    justLogged,
  } = authContext;

  const [listLen, setListLen] = useState(
    state.users.filter((appl) => appl.application).length
  );

  const handleClose = () => {
    setMuiState({
      ...muiState,
      open: false,
    });
  };

  const filterApplications = (list) => {
    return list.filter((user) => user.application);
  };

  useEffect(() => {
    setListLen(filterApplications(state.users).length);

    loadUser();
    if (currentUser && currentUser.title) {
      const interval = setInterval(() => {
        fetchApplications(currentUser._id);
        if (
          filterApplications(state.users).length > listLen &&
          state.justLogged === false
        ) {
          setMuiState({
            open: true,
            SlideTransition,
          });

          setTimeout(() => {
            setMuiState({
              ...muiState,
              open: false,
            });
          }, 2500);

          setListLen(filterApplications(state.users).length);
        }
        if (state.justLogged) {
          setTimeout(() => justLogged(), 4000);
        }
        // setJustLogged(true);
        // justLogged();
      }, 3000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line
  }, [state.users]);

  const [applicant, setApplicant] = useState(null);
  // const [justLogged, setJustLogged] = useState(true);

  const openApplication = (event, appl) => {
    setApplicant(appl);
    showSingleApplication(true);
  };

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth="lg" style={{ marginBottom: "4px" }}>
      <Paper>
        <Snackbar
          open={muiState.open}
          onClose={handleClose}
          TransitionComponent={muiState.Transition}
          message="Υπάρχει νέα αίτηση"
          // key={muiState.Transition.name}
        />

        {state.single_application ? (
          <SingleApplication applicant={applicant} />
        ) : (
          <>
            <h1>Αιτήσεις</h1>
            {loading ? (
              <CircularProgress style={{ margin: "5% 50%" }} />
            ) : users.length ? (
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
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
                      {users
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={uuid()}
                            >
                              {columns.map((column) => {
                                const value = row.application[column.id];
                                return (
                                  <TableCell
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      openApplication(e, row);
                                    }}
                                    key={column.id}
                                    align={column.align}
                                  >
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
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  labelRowsPerPage="Αιτήσεις ανά σελίδα"
                />
              </Paper>
            ) : (
              <h2 style={{ textAlign: "center" }}>Δεν υπάρχουν αιτήσεις</h2>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Applications;

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};
