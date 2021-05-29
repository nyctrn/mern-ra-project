import { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import AuthContext from "./../../context/authContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Check from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ListAlt from "@material-ui/icons/ListAlt";
import EditAppForm from "../pages/EditAppForm";
import Paper from "@material-ui/core/Paper";
import Close from "@material-ui/icons/Close";

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

const AppForm = (props) => {
  const authContext = useContext(AuthContext);

  const {
    error,
    clearErrors,
    isAuthenticated,
    formApplication,
    currentUser,
    applicationSubmission,
  } = authContext;
  // console.log(user);
  // console.log(authContext);

  useEffect(() => {
    if (error) {
      console.log("test in error");
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }
    console.log(error);
    if (error === "no errors" && !currentUser.application) {
      console.log(error, "in useeffect");
      // setRegSuccess(true);
      setTimeout(() => {
        props.history.push("/");
      }, 1600);
      setTimeout(() => {
        // setRegSuccess(false);
      }, 1500);
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // console.log(error, "error appform");
  // console.log(currentUser, "curr user appform");

  const [regSuccess, setRegSuccess] = useState(false);

  const [application, setApplication] = useState({
    firstName: "",
    lastName: "",
    email: "",
    fName: "",
    mName: "",
    birthday: "",
    citizenship: "",
    idNumber: "",
    municipality: "",
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
    mobileNumber: "",
  });

  const {
    firstName,
    lastName,
    email,
    fName,
    mName,
    birthday,
    citizenship,
    idNumber,
    municipality,
    city,
    address,
    postalCode,
    phoneNumber,
    mobileNumber,
  } = application;

  // console.log(application);
  const onChange = (e) =>
    setApplication({ ...application, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // if (firstName === "" || lastName === "" || email === "") {
    //   // setAlert("please enter all fields", "danger");  --> fix alerts
    //   // } else if () {
    //   //   setAlert("password do not match", "danger"); --> fix alerts
    // } else {
    formApplication({
      applicationId: uuid().slice(0, 13),
      firstName,
      lastName,
      fName,
      mName,
      birthday,
      citizenship,
      idNumber,
      municipality,
      city,
      address,
      postalCode,
      phoneNumber,
      mobileNumber,
      email,
      currentUser,
    });

    // if (!error) {
    //   setTimeout(() => {
    //     props.history.push("/");
    //   }, 1800);
    // }
    // }
  };

  const formFields = [
    { fieldName: "firstName", labeName: "Όνομα" },
    { fieldName: "lastName", labeName: "Επώνυμο" },
    { fieldName: "fName", labeName: "Πατρώνυμο" },
    { fieldName: "mName", labeName: "Μητρώνυμο" },
    { fieldName: "birthday", labeName: "Ημερομηνία Γέννησης" },
    { fieldName: "citizenship", labeName: "Υπηκοότητα" },
    { fieldName: "idNumber", labeName: "Αριθμός Ταυτότητας/Διαβατηρίου" },
    { fieldName: "municipality", labeName: "Δήμος" },
    { fieldName: "city", labeName: "Πόλη" },
    { fieldName: "address", labeName: "Διεύθυνση κατοικίας" },
    { fieldName: "postalCode", labeName: "Τ.Κ." },
    { fieldName: "phoneNumber", labeName: "Τηλέφωνο" },
    { fieldName: "mobileNumber", labeName: "Κινητό" },
    { fieldName: "email", labeName: "E-mail" },
  ];

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      {!currentUser.application ? (
        <>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar
              className={classes.avatar}
              style={
                applicationSubmission
                  ? {
                      backgroundColor: "#4caf50",
                      transitionDuration: "0.3s",
                      transitionTimingFunction: "ease-out",
                      transitionDelay: "0.2s",
                    }
                  : {
                      transitionDuration: "0.5s",
                      transitionTimingFunction: "ease-out",
                      transitionDelay: "0.3s",
                    }
              }
            >
              <ListAlt />
            </Avatar>
            {!applicationSubmission && (
              <>
                <Typography component="h1" variant="h5">
                  Αίτηση Συνταξιοδότησης
                </Typography>

                <form onSubmit={onSubmit} className={classes.form}>
                  <Grid container spacing={2}>
                    {formFields.map((field) => {
                      return (
                        <Grid key={field.fieldName} item xs={12}>
                          <TextField
                            value={application[`${field.fieldName}`]}
                            onChange={onChange}
                            autoComplete={field.fieldName}
                            name={field.fieldName}
                            variant="outlined"
                            // required
                            fullWidth
                            id={field.fieldName}
                            label={field.labeName}
                            autoFocus
                            size="small"
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    ΑΠΟΣΤΟΛΗ ΑΙΤΗΣΗΣ
                  </Button>{" "}
                </form>
              </>
            )}
            {/* <>
              <Typography component="h1" variant="h5">
                Η αίτηση της συνταξιοδότησής σας στάλθηκε επιτυχώς!
                <Check
                  style={{
                    color: "#4caf50",
                    verticalAlign: "bottom",
                    fontSize: "2rem",
                  }}
                />
              </Typography>
            </>
            )
            {error && error[0].msg && (
              <div
                style={{
                  float: "right",
                }}
              >
                <span>{error[0].msg}</span>

                <Close style={{ color: "red", verticalAlign: "bottom" }} />
              </div>
            )} */}
            {applicationSubmission && (
              <>
                <Typography component="h1" variant="h5">
                  Η αίτηση της συνταξιοδότησής σας στάλθηκε επιτυχώς!
                  <Check
                    style={{
                      color: "#4caf50",
                      verticalAlign: "bottom",
                      fontSize: "2rem",
                    }}
                  />
                </Typography>
              </>
            )}
            {error && error[0].msg && (
              <div
                style={{
                  float: "right",
                }}
              >
                <span>{error[0].msg}</span>

                <Close style={{ color: "red", verticalAlign: "bottom" }} />
              </div>
            )}
          </div>
        </>
      ) : currentUser.application.status === "εκκρεμής" ? (
        <EditAppForm />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Paper>
            <h2>Δεν μπορείτε να επεξεργαστείτε την αίτησή σας</h2>
            <h2>Κατάσταση αίτησης: {currentUser.application.status}</h2>
          </Paper>
        </div>
      )}
    </Container>
  );
};

export default AppForm;
