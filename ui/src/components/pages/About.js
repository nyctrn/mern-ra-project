import { Link } from "react-router-dom";
import { Container, Paper } from "@material-ui/core";

const About = () => {
  return (
    <Container maxWidth="lg" style={{ height: "80vh" }}>
      <Paper elevation={2}>
        <div>
          <h1 style={{ textAlign: "center" }}>
            Καλώς ήλθατε στην Εφαρμογή Υποβολής Αιτήσεων Συνταξιοδότησης
          </h1>
          <br></br>
          <ul>
            <li>
              <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
                Για να κάνετε χρήση της εφαρμογής πρέπει να είστε εγγεγραμμένος
                χρήστης. <br></br>Για να εγγραφείτε πατήστε το κουμπί "Εγγραφή"
                ή κάντε κλίκ <Link to={"/register"}>εδώ</Link>.
              </p>
            </li>
            <li>
              <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
                Αν είστε εγγεγραμμένος χρήστης, για την χρήση της εφαρμογής
                πρέπει να συνδεθείτε. <br></br>Για σύνδεση στην εφαρμογή πατήστε
                το κουμπί "Σύνδεση" ή κάντε κλίκ <Link to={"/login"}>εδώ</Link>.
              </p>
            </li>
            <li>
              <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
                Αν θέλετε να κάνετε εγγραφή ως υπάλληλος διαχείρησης θα
                χρειαστείτε τον κατάλληλο κωδικό αυθεντικοποίησης. <br></br>
                Κατά την εγγραφή σας επιλέξτε την επιλογή "Υπάλληλος" και
                πληκτρολογήστε τον κωδικό στο πεδίο που εμφανίζεται.
              </p>
            </li>
          </ul>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <br></br>
          <br></br>
          <h1>Επικοινωνία:</h1>
          <p style={{ fontSize: "1.3rem" }}>
            Τηλέφωνα εξυπηρέτησης πολιτών: 209 987546213, 208 987546248
            <br></br>
            Ηλεκτρονικό ταχυδρομείο: aitisi@syntaxiouxosthagino.gr<br></br>
            Διεύθυνση: Λφ. Δρόμου 675, Περιοχή, Πόλη, ΤΚ 0000
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default About;
