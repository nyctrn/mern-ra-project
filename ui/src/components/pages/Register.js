import { useState, useContext, useEffect } from "react";
import AuthContext from "./../../context/authContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Check from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Close from "@material-ui/icons/Close";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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

const Register = (props) => {
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        props.history.push("/");
      }, 1800);
    }

    if (error) {
      setTimeout(() => {
        clearErrors();
      }, 2400);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
        code: "",
      });
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    code: "",
  });

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const { firstName, lastName, email, password, password2, code } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      // setAlert("please enter all fields", "danger"); --> fix alerts
    } else if (password !== password2) {
      // setAlert("password do not match", "danger"); --> fix alerts
    } else {
      register({
        firstName,
        lastName,
        email,
        password,
        code,
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
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "ease-out",
                  transitionDelay: "0.3s",
                }
          }
          className={classes.avatar}
        >
          {/* <LockOutlinedIcon /> */}
          <PermIdentity />
        </Avatar>
        <Typography
          component="h1"
          variant="h6"
          style={{ fontSize: "1.5rem", width: "31vw", textAlign: "center" }}
        >
          Δημιουργία λογαρισμού{" "}
          {isAuthenticated && (
            <>
              <span>επιτυχής!</span>
              <Check
                style={{
                  color: "#4caf50",
                  verticalAlign: "bottom",
                  fontSize: "2rem",
                }}
              />{" "}
            </>
          )}{" "}
        </Typography>
        {!isAuthenticated && (
          <form onSubmit={onSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={firstName}
                  onChange={onChange}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Όνομα"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={lastName}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Επώνυμο"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
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
                  // minLength="6"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password2}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Επαλήθευση κωδικού χρήστη"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        name="checked"
                      />
                    }
                    label="Υπάλληλος;"
                  />
                  {checked && (
                    <TextField
                      label="10-ψήφιος κωδικός"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={onChange}
                      value={code}
                      name="code"
                      required
                    />
                  )}
                </FormGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Εγγραφη
            </Button>{" "}
            {isAuthenticated && (
              <span style={{ float: "right" }}>
                Επιτυχής εγγραφή!
                <Check style={{ color: "#4caf50", verticalAlign: "bottom" }} />
              </span>
            )}
            {error && (
              <div
                style={{
                  float: "right",
                }}
              >
                {error === "user exists" && (
                  <span>Υπάρχει ήδη χρήστης με τέτοιο email!</span>
                )}
                {error === "wrong code" && (
                  <span>"Λάθος 10-ψήφιος κωδικός!</span>
                )}
                <Close style={{ color: "red", verticalAlign: "bottom" }} />
              </div>
            )}
          </form>
        )}
      </div>
    </Container>
  );
};

export default Register;
