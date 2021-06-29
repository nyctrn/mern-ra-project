import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Check from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

const EditAppForm = () => {
  const authContext = useContext(AuthContext);
  const { error, clearErrors, currentUser, formEdit } = authContext;

  const {
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
  } = currentUser.application;

  const [edit, setEdit] = useState(false);
  const [viewAppForm, setViewAppForm] = useState(true);
  const [editSuccess, setEditSuccess] = useState(false);

  const [application, setApplication] = useState({
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
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }

    if (error === "no errors") {
      setEditSuccess(true);

      setTimeout(() => {
        setEditSuccess(false);
      }, 2000);
    }
    // eslint-disable-next-line
  }, [error]);

  const onChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSwitchEdit = (e) => {
    setEdit(!edit);
    setViewAppForm(!viewAppForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (firstName === "" || lastName === "" || email === "") {  --> !!!
    //   setAlert("please enter all fields", "danger");
    // } else if () {
    //setAlert("password do not match", "danger");  --> !!!

    await formEdit({
      applicationId: currentUser.applicationId,
      id: currentUser._id,
      firstName: application.firstName,
      lastName: application.lastName,
      fName: application.fName,
      mName: application.mName,
      birthday: application.birthday,
      citizenship: application.citizenship,
      idNumber: application.idNumber,
      municipality: application.municipality,
      city: application.city,
      address: application.address,
      postalCode: application.postalCode,
      phoneNumber: application.phoneNumber,
      mobileNumber: application.mobileNumber,
      email: application.email,
    });

    if (!error) {
    }

    // if (error) {
    //   console.log("test in error");
    //   setTimeout(() => {
    //     clearErrors();
    //   }, 3000);

    //   // setEditSuccess(true);
    //   // setTimeout(() => {
    //   //   setEditSuccess(false);
    //   // }, 2000);
    // }

    // clearErrors();
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
                      disabled={viewAppForm && true}
                      InputLabelProps={
                        field.fieldName === "birthday"
                          ? {
                              shrink: true,
                            }
                          : null
                      }
                      type={field.fieldName === "birthday" ? "date" : null}
                    />
                  </Grid>
                );
              })}
            </Grid>
            {edit && (
              <Button
                style={{ marginTop: "20px" }}
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
          </form>
        </>
      )}
    </div>
  );
};

export default EditAppForm;
