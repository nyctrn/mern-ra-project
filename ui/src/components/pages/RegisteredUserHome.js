import ListAlt from "@material-ui/icons/ListAlt";
import FolderSharedIcon from "@material-ui/icons/FolderShared";

const RegisteredUserHome = () => {
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>
          Καλώς ήλθατε στην Εφαρμογή Υποβολής Αιτήσεων Συνταξιοδότησης
        </h1>
        <br></br>
        <ul>
          <li>
            <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
              Για δημιουργία και υποβολή αίτησης συνταξιοδότησης πατήστε
              αριστερά στο κουμπί "Αίτηση"{" "}
              {<ListAlt style={{ verticalAlign: "text-bottom" }} />}.
            </p>
          </li>
          <li>
            <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
              Για προβολή κάποιας υπάρχουσας αίτησης ή επεξεργασία πατήστε
              αριστερά στο κουμπί "Ο φάκελός μου"{" "}
              {<FolderSharedIcon style={{ verticalAlign: "text-bottom" }} />}.
            </p>
          </li>
          <li>
            <p
              style={{
                textAlign: "left",
                fontSize: "1.4rem",
                paddingBottom: "1rem",
              }}
            >
              Για παραλαβή της αίτησής σας, εφόσον έχει εγκριθεί, πατήστε στο
              κουμπί "Ο φάκελός μου"{" "}
              {<FolderSharedIcon style={{ verticalAlign: "text-bottom" }} />}{" "}
              και επιλέξτε την αίτησή σας, στη συνέχεια επιλέξτε "Λήψη αίτησης
              σε PDF"
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RegisteredUserHome;
