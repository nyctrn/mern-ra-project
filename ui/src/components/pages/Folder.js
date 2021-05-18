import AuthContext from "../../context/authContext";
import { useContext } from "react";
import jsPDF from "jspdf";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";

const Folder = () => {
  const authContext = useContext(AuthContext);

  const { currentUser } = authContext;

  const generatePdf = () => {
    var doc = new jsPDF("p", "pt");

    // doc.text(20, 20, "This is the first page title.");

    doc.setFont("LiberationSerif-Regular", "normal");
    doc.text(
      20,
      20,
      `Αίτηση Συνταξιοδότησης (id:${currentUser.application.applicationId})`
    );

    doc.text(20, 60, "......");

    doc.save("αίτηση_συνταξιοδότησης.pdf");
  };

  // console.log(currentUser, "user Folder");
  return (
    <Container maxWidth="lg" style={{ minHeight: "250px" }}>
      <Paper>
        <h1 style={{ textAlign: "center" }}>Φάκελος χρήστη</h1>
        <hr />
        {currentUser && (
          <h2>
            Κατάσταση αίτησης:{" "}
            {currentUser.application
              ? currentUser.application.status
              : "Δεν έχει γίνει αίτηση"}
          </h2>
        )}
        <h2>........</h2>

        {currentUser.application && currentUser.application.status === "δεκτή" && (
          <div>
            <Button
              onClick={generatePdf}
              type="primary"
              variant="contained"
              color="primary"
              style={{ marginBottom: "10px", textTransform: "none" }}
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
