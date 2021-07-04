import AuthContext from "../../context/authContext";
import { useContext } from "react";
import { jsPDF } from "jspdf";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import font from "../../fonts/LiberationSerif-Regular-normal";

var callAddFont = function () {
  this.addFileToVFS("LiberationSerif-Regular-normal.ttf", font);
  this.addFont(
    "LiberationSerif-Regular-normal.ttf",
    "LiberationSerif-Regular",
    "normal"
  );
};
jsPDF.API.events.push(["addFonts", callAddFont]);

const Folder = () => {
  const authContext = useContext(AuthContext);
  const docs = new jsPDF();
  const { currentUser } = authContext;

  const formatDate = (date) => {
    let datePart = date.match(/\d+/g),
      year = datePart[0].substring(2),
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  console.log(currentUser);

  const generatePdf = () => {
    var doc = new jsPDF("p", "pt");

    doc.setFont("LiberationSerif-Regular");
    doc.text(
      20,
      20,
      `Αίτηση συνταξιοδότησης (id:${currentUser.application.applicationId})`
    );
    doc.text(
      20,
      60,
      `
      Όνομα: ${currentUser.application.firstName}
      Επώνυμο: ${currentUser.application.lastName}
      Πατρώνυμο: ${currentUser.application.fName}
      Μητρώνυμο: ${currentUser.application.mName}
      Ημερομηνία Γέννησης: ${formatDate(currentUser.application.birthday)}
      Υπηκοότητα: ${currentUser.application.citizenship}
      Αριθμός Ταυτότητας/Διαβατηρίου: ${currentUser.application.idNumber}
      Δήμος: ${currentUser.application.municipality}
      Διεύθυνση κατοικίας: ${currentUser.application.address}
      Τ.Κ.: ${currentUser.application.postalCode}
      Τηλέφωνο: ${currentUser.application.phoneNumber}
      Κινητό: ${currentUser.application.mobileNumber}
      E-mail: ${currentUser.application.email}
                                    
                                    Εγκρύνεται`
    );
    doc.save("αίτηση_συνταξιοδότησης.pdf");
  };

  return (
    <Container maxWidth="lg" style={{ minHeight: "250px" }}>
      <Paper>
        <h1 style={{ textAlign: "center" }}>Φάκελος χρήστη</h1>
        <hr />
        {currentUser && (
          <h2 style={{ fontSize: "1.6rem" }}>
            Κατάσταση αίτησης:{" "}
            {currentUser.application
              ? currentUser.application.status
              : "Δεν έχει γίνει αίτηση"}
          </h2>
        )}

        {currentUser.application && currentUser.application.status === "δεκτή" && (
          <div>
            <br></br>
            <p style={{ fontSize: "1.5rem" }}>
              Η αίτηση συνταξιοδότησης με κωδικό{" "}
              {currentUser.application.applicationId}:
            </p>
            <ul style={{ listStyleType: "none", fontSize: "1.5rem" }}>
              <li>Όνομα: {currentUser.application.firstName}</li>
              <li>Επώνυμο: {currentUser.application.lastName}</li>
              <li>Πατρώνυμο: {currentUser.application.fName}</li>
              <li>Μητρώνυμο: {currentUser.application.mName}</li>
              <li>
                Ημερομηνία Γέννησης:{" "}
                {formatDate(currentUser.application.birthday)}
              </li>
              <li>Υπηκοότητα: {currentUser.application.citizenship}</li>
              <li>
                Αριθμός Ταυτότητας/Διαβατηρίου:
                {currentUser.application.idNumber}
              </li>
              <li>Δήμος: {currentUser.application.municipality}</li>
              <li>Διεύθυνση κατοικίας: {currentUser.application.address}</li>
              <li>Τ.Κ.: {currentUser.application.postalCode}</li>
              <li>Τηλέφωνο: {currentUser.application.phoneNumber}</li>
              <li>Κινητό: {currentUser.application.mobileNumber}</li>
              <li>E-mail: {currentUser.application.email}</li>
            </ul>
            <p
              style={{
                textAlign: "right",
                fontSize: "1.5rem",
                paddingRight: "10rem",
              }}
            >
              Εγκρίνεται
            </p>
            <Button
              onClick={generatePdf}
              type="primary"
              variant="contained"
              style={{
                marginBottom: "10px",
                textTransform: "none",
                backgroundColor: "#349aa0",
                color: "#ffffff",
              }}
              startIcon={<GetAppIcon />}
            >
              Λήψη αίτησης σε PDF
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Folder;
