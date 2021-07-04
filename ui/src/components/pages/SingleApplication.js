import { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Check from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import Close from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const SingleApplication = ({ applicant }) => {
  const authContext = useContext(AuthContext);
  const {
    error,
    acceptApplications,
    rejectApplications,
    showSingleApplication,
  } = authContext;

  const [declineOrRejectSucess, setDeclineOrRejectSucess] = useState(null);

  const handleApplications = async (event) => {
    if (event.target.innerText === "ΕΓΚΡΙΣΗ") {
      acceptApplications({
        // _id: applicant._id, (test for error handling)
        _id: applicant._id,
        status: "δεκτή",
      });
    } else {
      rejectApplications({
        _id: applicant._id,
        status: "μη δεκτή",
      });
    }

    await error;

    if (!error) {
      setDeclineOrRejectSucess(true);
      setTimeout(() => {
        setDeclineOrRejectSucess(null);
      }, 2000);
    }
    if (error) {
      setDeclineOrRejectSucess(false);
      setTimeout(() => {
        setDeclineOrRejectSucess(null);
      }, 2000);
    }
  };

  const formatDate = (date) => {
    let datePart = date.match(/\d+/g),
      year = datePart[0].substring(2),
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  return (
    <Container maxWidth="xl" style={{ height: "80vh" }}>
      <h3 style={{}}>ID αίτησης: {applicant.application.applicationId}</h3>
      <h2>Στοιχεία αιτούντα:</h2>
      {/* <hr /> */}
      <div>
        <ul style={{ listStyle: "none" }}>
          <li>
            <p>
              Όνοματεπώνυμο: {applicant.application.firstName}{" "}
              {applicant.application.lastName}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Πατρώνυμο: {applicant.application.fName}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Μητρώνυμο: {applicant.application.mName}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              ΑΦΜ {applicant.application.afm}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              ΑΜΚΑ: {applicant.application.amka}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Ημερομηνία Γέννησης: {formatDate(applicant.application.birthday)}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Υπηκοότητα: {applicant.application.citizenship}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Αριθμός Ταυτότητας/Διαβατηρίου: {applicant.application.idNumber}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Δήμος: {applicant.application.municipality}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Πόλη: {applicant.application.city}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Διεύθυνση κατοικίας: {applicant.application.address}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              Τ.Κ.: {applicant.application.postalCode}
              <Divider />
            </p>
          </li>
          <li>
            <p>Τηλέφωνο: {applicant.application.phoneNumber}</p>
            <Divider />
          </li>
          <li>
            <p>
              Κινητό: {applicant.application.mobileNumber}
              <Divider />
            </p>
          </li>
          <li>
            <p>
              E-mail: {applicant.application.email}
              <Divider />
            </p>
          </li>
        </ul>
      </div>
      <p></p>
      <Button
        id="1"
        onClick={(e) => handleApplications(e)}
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#4caf50", float: "left" }}
        startIcon={<ThumbUpIcon />}
      >
        ΕΓΚΡΙΣΗ
      </Button>

      <Button
        onClick={(e) => handleApplications(e)}
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#e91e63", float: "right" }}
        startIcon={<ThumbDownIcon />}
      >
        ΑΠΟΡΡΙΨΗ
      </Button>

      <Button
        onClick={() => showSingleApplication(false)}
        variant="contained"
        color="primary"
        style={{ top: "20%" }}
        component={Link}
        to={"/applications"}
        startIcon={<ArrowBackIcon />}
      >
        ΕΠΙΣΤΡΟΦΗ
      </Button>
      <div style={{ top: "30%" }}>
        {declineOrRejectSucess && (
          <>
            <Typography component="h1" variant="h6">
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

        {declineOrRejectSucess === false && (
          <>
            <Typography component="h1" variant="h5">
              υπήρξε κάποια σφάλμα
              <Close
                style={{
                  color: "red",
                  verticalAlign: "bottom",
                  fontSize: "2rem",
                }}
              />
            </Typography>
          </>
        )}
      </div>
    </Container>
  );
};

export default SingleApplication;
