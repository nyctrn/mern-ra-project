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

  //   console.log(applicant);
  const handleApplications = async (event) => {
    if (event.target.innerText === "ΑΠΟΔΟΧΗ") {
      acceptApplications({
        // _id: applicant._id, (test for error handling)
        _id: applicant._id,
        status: "δεκτή",
      });
    } else {
      // console.log(0);
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

  //   const applicantsDetails = [
  //      email
  //   ]

  return (
    <Container maxWidth="xl" style={{ height: "50vh" }}>
      <h2>Στοιχεία αιτούντα:</h2>
      <hr />
      <h3 style={{ textAlign: "center", float: "right" }}>
        ID αίτησης: {applicant.application.applicationId}
      </h3>
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
              Όνοματεπώνυμο: {applicant.application.firstName}{" "}
              {applicant.application.lastName}
            </p>
          </li>
          <li>
            <p>...</p>
          </li>
          <li>
            <p>Email: {applicant.application.email}</p>
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
        ΑΠΟΔΟΧΗ
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
        style={{ float: "right", position: "relative", top: "30%" }}
        component={Link}
        to={"/applications"}
        startIcon={<ArrowBackIcon />}
      >
        ΕΠΙΣΤΡΟΦΗ
      </Button>
      <div style={{ float: "right", position: "relative", top: "35%" }}>
        {declineOrRejectSucess && (
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
