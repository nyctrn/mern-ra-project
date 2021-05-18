import { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Check from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";

const EditAppForm = () => {
  const authContext = useContext(AuthContext);
  const { error, clearErrors, currentUser, formEdit } = authContext;

  const { firstName, lastName, email } = currentUser.application;

  const [edit, setEdit] = useState(false);
  const [viewAppForm, setViewAppForm] = useState(true);
  const [editSuccess, setEditSuccess] = useState(false);

  const [application, setApplication] = useState({
    firstName,
    lastName,
    email,
  });

  // console.log(application, "EditAppForm");

  const onChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSwitchEdit = (e) => {
    setEdit(!edit);
    setViewAppForm(!viewAppForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (firstName === "" || lastName === "" || email === "") {  --> !!!
    //   setAlert("please enter all fields", "danger");
    // } else if () {
    //setAlert("password do not match", "danger");  --> !!!

    formEdit({
      currentUser,
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
    });

    if (!error) {
      setEditSuccess(true);

      setTimeout(() => {
        setEditSuccess(false);
      }, 2000);
    }

    clearErrors();
  };

  return (
    <div>
      {currentUser.application && (
        <>
          <h2>Έχετε ήδη υποβάλει αίτηση συνταξιοδότησης</h2>
          <h3 style={{ float: "right" }}>
            Επεξεργασία αίτησης:{" "}
            <>
              <EditIcon
                onClick={handleSwitchEdit}
                style={{ cursor: "pointer" }}
              />
            </>
          </h3>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={application.firstName}
                  onChange={onChange}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Όνομα"
                  autoFocus
                  size="small"
                  disabled={viewAppForm && true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={application.lastName}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Επώνυμο"
                  name="lastName"
                  autoComplete="lname"
                  size="small"
                  disabled={viewAppForm && true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={application.email}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  size="small"
                  disabled={viewAppForm && true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={application.email}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  size="small"
                  disabled={viewAppForm && true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={application.email}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  size="small"
                  disabled={viewAppForm && true}
                />
              </Grid>
            </Grid>
            {edit && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                ΥΠΟΒΟΛΗ
              </Button>
            )}

            {editSuccess && (
              <>
                <Typography component="h1" variant="h5">
                  Επεξεργασία αίτησης επιτυχής!
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
          </form>
        </>
      )}
    </div>
  );
};

export default EditAppForm;
