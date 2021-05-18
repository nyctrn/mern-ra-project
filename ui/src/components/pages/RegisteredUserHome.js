import ListAlt from "@material-ui/icons/ListAlt";
import FolderSharedIcon from "@material-ui/icons/FolderShared";

const RegisteredUserHome = () => {
  return (
    <div>
      <h2>....</h2>
      <p>
        Για να κάνετε αίτηση συνταξιοδότησης πατήστε στο εικονίδιο {<ListAlt />}{" "}
        στα αριστερά
      </p>
      <p>
        Για να δείτε τον φάκελο χρήστη πατήστε στο εικονίδιο{" "}
        {<FolderSharedIcon />} στα αριστερά
      </p>
      <h2>....</h2>
    </div>
  );
};

export default RegisteredUserHome;
