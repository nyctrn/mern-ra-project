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
  console.log(docs.getFontList());
  const { currentUser } = authContext;

  console.log(font);

  const generatePdf = () => {
    var doc = new jsPDF("p", "pt");

    doc.setFont("LiberationSerif-Regular");
    doc.text(20, 20, `ασδφσδφ (id:${currentUser.application.applicationId})`);

    doc.text(20, 60, "......");
    doc.save("αίτηση_συνταξιοδότησης.pdf");
  };

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
            {/* WORK IN PROGRESS */}
            <p style={{ fontSize: 40, textAlign: "center", color: "red" }}>
              work in progress...
            </p>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Folder;
