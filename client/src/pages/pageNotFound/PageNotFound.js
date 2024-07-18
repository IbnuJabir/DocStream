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
        color: "#003639",
        fontFamily: "serif",
        fontWeight: "bolder"
      }}
    >
      <h1>404</h1>
      <h1>PageNotFound</h1>
      <p style={{fontFamily: "serif",
        fontWeight: "bolder"}}>The page you're looking for is out sick.</p>
      <p>
        Luckily, it has access to DocStream so it can feel better, faster.
      </p>
      <Link style={{ textDecoration: "none", color: "#fff", backgroundColor:"#1DA0FF", borderRadius: "2rem", padding: ".2rem 1rem"  }} to="/">
        Go Back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
