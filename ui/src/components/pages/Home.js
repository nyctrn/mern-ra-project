import AuthContext from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import RegisteredUserHome from "./RegisteredUserHome";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import ListAlt from "@material-ui/icons/ListAlt";

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
                {/* <h2>Admin Control Panel</h2> */}
                <body>
                  <div style={{ textAlign: "left" }}>
                    <h1 style={{ textAlign: "center" }}>
                      Καλώς ήρθατε στην Εφαρμογή Υποβολής Αιτήσεων
                      Συνταξιοδότησης
                    </h1>
                    <br></br>
                    <ul>
                      <li>
                        <h2>
                          Για προβολή όλων των αιτήσεων πατήστε αριστερά στο
                          κουμπί "Αιτήσεις"{" "}
                          {<ListAlt style={{ verticalAlign: "text-bottom" }} />}
                          .
                        </h2>
                      </li>
                      <li>
                        <h2>
                          Για έλεγχο και αξιολόγηση νέας αίτησης επιλέξτε την
                          αίτηση απο την λίστα και πατήστε "ΕΓΚΡΙΣΗ" ή
                          "ΑΠΟΡΡΙΨΗ".
                        </h2>
                      </li>
                      <li>
                        <h2 style={{ paddingBottom: "20px" }}>
                          Ο πολίτης ενημερώνεται αυτόματα με e-mail έπειτα απο
                          την έγκριση ή την απόρριψη της αίτησής του.
                        </h2>
                      </li>
                    </ul>
                  </div>
                </body>
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
        <Paper>
          <div>
            <body>
              <h1 style={{ textAlign: "center" }}>
                Καλως ήλθατε στην Εφαρμογή Υποβολής Αιτήσεων Συνταξιοδότησης
              </h1>
              <br></br>
              <ul style={{ textAlign: "left" }}>
                <li>
                  <h2>
                    Για να κάνετε χρήση της εφαρμογής πρέπει να είστε
                    εγγεγραμμένος χρήστης.
                    <br></br>Για να εγγραφείτε πατήστε το κουμπί "Εγγραφή" ή
                    κάντε κλίκ <Link to={"/register"}>εδώ</Link>.
                  </h2>
                </li>
                <li>
                  <h2>
                    Αν είστε εγγεγραμμένος χρήστης, για την χρήση της εφαρμογής
                    πρέπει να συνδεθείτε (log in). <br></br>Για σύνδεση στην
                    εφαρμογή πατήστε το κουμπί "Σύνδεση" ή κάντε κλίκ{" "}
                    <Link to={"/login"}>εδώ</Link>.
                  </h2>
                </li>
                <li>
                  <h2 style={{ paddingBottom: "20px" }}>
                    Αν θέλετε να κάνετε εγγραφή ως υπάλληλος διαχείρησης θα
                    χρειαστείτε τον κατάλληλο κωδικό αυθεντικοποίησης. <br></br>
                    Κατά την εγγραφή σας επιλέξτε την επιλογή "Υπάλληλος" και
                    πληκτρολογήστε τον κωδικό στο πεδίο που εμφανίζεται.
                  </h2>
                </li>
              </ul>
            </body>
          </div>
        </Paper>
      )}
    </Container>
  );
};

export default Home;

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};
