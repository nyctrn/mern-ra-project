import ListAlt from "@material-ui/icons/ListAlt";
import FolderSharedIcon from "@material-ui/icons/FolderShared";

const RegisteredUserHome = () => {
  return (
    <body>
      <div className="container" style={{ width: "85%" }}>
        <h1 style={{ textAlign: "center" }}>
          Καλώς ήρθατε στην Εφαρμογή Υποβολής Αιτήσεων Συνταξιοδότησης
        </h1>
        <br></br>
        <ul>
          <li>
            <h2>
              Για δημιουργία και υποβολή αίτησης συνταξιοδότησης πατήστε
              αριστερά στο κουμπί "Αίτηση"{" "}
              {<ListAlt style={{ verticalAlign: "text-bottom" }} />}.
            </h2>
          </li>
          <li>
            <h2>
              Για προβολή κάποιας υπάρχουσας αίτησης ή επεξεργασία πατήστε
              αριστερά στο κουμπί "Ο φάκελός μου"{" "}
              {<FolderSharedIcon style={{ verticalAlign: "text-bottom" }} />}.
            </h2>
          </li>
          <li>
            <h2>
              Για παραλαβή της αίτησής σας, εφόσον έχει εγκριθεί, πατήστε στο
              κουμπί "Ο φάκελός μου"{" "}
              {<FolderSharedIcon style={{ verticalAlign: "text-bottom" }} />}{" "}
              και επιλέξτε την αίτησή σας, στη συνέχεια επιλέξτε "Λήψη αίτησης
              σε PDF"
            </h2>
          </li>
        </ul>
      </div>
    </body>
  );
};

export default RegisteredUserHome;
