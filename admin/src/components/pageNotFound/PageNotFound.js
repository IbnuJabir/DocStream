import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "gray"
      }}
    >
      <h1>404</h1>
      <h1>PageNotFound</h1>
      <Link style={{ textDecoration: "none", color: "#159eec"  }} to="/">
        Go Back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
