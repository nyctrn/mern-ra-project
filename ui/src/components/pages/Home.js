import AuthContext from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import RegisteredUserHome from "./RegisteredUserHome";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, currentUser, state, loadUser, fetchApplications } =
    authContext;

  useEffect(() => {
    loadUser();

    if (currentUser && currentUser.title) {
      const interval = setInterval(() => {
        const filterApplications = (list) => {
          return list.filter((user) => user.application);
        };

        fetchApplications();

        if (filterApplications(state.users).length > listLen) {
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
      }, 3000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line
  }, [state.users]);

  const [muiState, setMuiState] = useState({
    open: false,
  });

  const [listLen, setListLen] = useState(
    state.users.filter((appl) => appl.application).length
  );

  const handleClose = () => {
    setMuiState({
      ...muiState,
      open: false,
    });
  };

  return (
    <Container maxWidth="lg">
      {isAuthenticated ? (
        <Paper>
          <>
            {currentUser.title ? (
              <div>
                <h2>Admin Control Panel</h2>
                {/* WORK IN PROGRESS */}
                <p style={{ fontSize: 40, textAlign: "center", color: "red" }}>
                  work in progress...
                </p>
                <Snackbar
                  open={muiState.open}
                  onClose={handleClose}
                  TransitionComponent={muiState.Transition}
                  message="Υπάρχει νέα αίτηση"
                  // key={muiState.Transition.name}
                />
              </div>
            ) : (
              <>
                <RegisteredUserHome />
              </>
            )}
          </>
        </Paper>
      ) : (
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Αρχική σελίδα (public)...</h1>
          {/* WORK IN PROGRESS */}
          <p style={{ fontSize: 40, textAlign: "center", color: "red" }}>
            work in progress...
          </p>
        </div>
      )}
    </Container>
  );
};

export default Home;

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};
