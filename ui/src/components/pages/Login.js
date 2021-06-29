import { useState, useContext, useEffect } from "react";
import AuthContext from "./../../context/authContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated, state } = authContext;

  useEffect(() => {
    if (isAuthenticated && state.currentUser.title) {
      setTimeout(() => {
        props.history.push("/applications");
      }, 1400);
    } else if (isAuthenticated) {
      setTimeout(() => {
        props.history.push("/");
      }, 1400);
    }

    if (error) {
      // setAlert(error, "danger");
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }

    if (error) {
      setUser({
        email: "",
        password: "",
      });
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      // setAlert("fill in all fields");  --> fix alerts
    } else {
      login({
        email,
        password,
      });
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          style={
            isAuthenticated
              ? {
                  backgroundColor: "#4caf50",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-out",
                  transitionDelay: "0.2s",
                }
              : error
              ? {
                  backgroundColor: "red",
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "ease-out",
                  transitionDelay: "0.3s",
                }
              : {
                  transitionDuration: "0.0s",
                  transitionTimingFunction: "ease-out",
                  transitionDelay: "0.0s",
                }
          }
          className={classes.avatar}
        >
          <PermIdentity />
        </Avatar>
        <Typography component="h1" variant="h5">
          Σύνδεση χρήστη{" "}
          {isAuthenticated && (
            <>
              <span>επιτυχής!</span>
              <Check
                style={{
                  color: "#4caf50",
                  verticalAlign: "bottom",
                  fontSize: "2rem",
                }}
              />
            </>
          )}
        </Typography>
        {/* {!isAuthenticated && ( */}
        <form onSubmit={onSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={onChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                disabled={isAuthenticated}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={onChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Κωδικός χρήστη"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={isAuthenticated}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ΣΥΝΔΕΣΗ
          </Button>{" "}
          {error && (
            <div
              style={{
                float: "right",
              }}
            >
              Λάθος στοιχεία!
              <Close style={{ color: "red", verticalAlign: "bottom" }} />
            </div>
          )}
        </form>
        {/* )} */}
      </div>
    </Container>
  );
};

export default Login;
