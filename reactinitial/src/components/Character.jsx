import React, { useState } from "react";
import Button from "@mui/material/Button";

export default function Character({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <h3>{data.name}</h3>
      {showDetails && <div>{data.details}</div>}
      <Button onClick={toggleDetails} variant="contained">
        {showDetails ? "show less" : "Show more"}
      </Button>
    </>
  );
}
