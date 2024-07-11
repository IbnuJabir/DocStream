import React from 'react'
import { Link } from "react-router-dom";

function UnAuthorizedAccess() {
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
          <h1>Unauthorized Access</h1>
          <Link style={{ textDecoration: "none", color: "green" }} to="/login">
        Go Back to Login
      </Link>
        </div>
      );
}

export default UnAuthorizedAccess