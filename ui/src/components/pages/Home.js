import AuthContext from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import RegisteredUserHome from "./RegisteredUserHome";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const Home = () => {
  const authContext = useContext(AuthContext);

  const {
    isAuthenticated,
    currentUser,
    state,
    loadUser,
    fetchApplications,
  } = authContext;

  useEffect(() => {
    loadUser();

    if (currentUser && currentUser.title) {
      const interval = setInterval(() => {
        const filterApplications = (list) => {
          return list.filter((user) => user.application);
        };

        // console.log(state, "state home");
        // console.log(listLen, "list len Home");
        // console.log(
        //   filterApplications(state.users).length,
        //   "new appl list len Home"
        // );

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
    // console.log(currentUser, "in async before loaduser()");
    // await loadUser();
    // console.log(currentUser, "in async after loaduser()");

    // eslint-disable-next-line
  }, [state.users]);

  // console.log(currentUser, "currentUser Home");
  // console.log(state, "state Home");

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
        </div>
      )}
    </Container>
  );
};

export default Home;

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};
