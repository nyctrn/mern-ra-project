import { useState } from "react";

const VersionNumber = () => {
  const [versionNumber, setVersionNumber] = useState(" ");

  setTimeout(() => {
    setVersionNumber("v0.5.8");
  }, 200);
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "110px",
      }}
    >
      <span>{versionNumber}</span>
    </div>
  );
};

export default VersionNumber;
