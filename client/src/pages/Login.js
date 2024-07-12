import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
import {
  Alert,
  CircularProgress,
  FormGroup,
  Link,
  TextField,
} from "@mui/material";
import { FaUser } from "react-icons/fa";
import "../style/login.css";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login({ isSignUpAllowed }) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, setIsAuthenticated } = useAuth;

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Fill all fields");
      return;
    }
    setLoading(true);
    let data = {
      password,
      email,
    };
    try {
      const result = await axios.post("/user/login", data);
      console.log(result.data);
      if (result.data) {
        toast.success("Successfully LoggedIn!");
        navigate("/");
        setIsLogin(true);
        setError("");
      } else {
        setError(result.data.message);
      }
      // console.log(result.data);
    } catch (error) {
      if (error.response) {
        console.log("Server responded with an error:", error.response.data);
        setError(error.response.data.message);
      } else if (error.request) {
        console.log("No response received:", error.request);
        setError("No response from server. Please try again later.");
      } else {
        console.log("Error", error.message);
        setError("Error: " + error.message);
      }
    } finally {
      if (isLogin) setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "9%" }}>
      <div className="login-container">
        <div className="user-icon">
          <FaUser style={{ fontSize: 80, color: "#fff" }} />
        </div>
        <div style={{ marginTop: "10%" }}>
          <form onSubmit={handleSubmit} action="/">
            <FormGroup style={{ marginTop: 30 }}>
              <TextField
                label="Email"
                onChange={(e) => setemail(e.target.value)}
                type="text"
                style={{ width: 300 }}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: 15 }}>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: 300 }}
              />
            </FormGroup>
            {error && (
              <div style={{ margin: "8px 0 8px", width: 300 }}>
                <Alert severity="error">{error}</Alert>
              </div>
            )}

            <div>
              {loading ? (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                <button className="login-button" type="submit">
                  Login
                </button>
              )}
            </div>
          </form>
          <div style={{ marginTop: "15px" }}>
            <Link
              href="/signup"
              style={{
                textDecoration: "none",
                color: "#13A014",
                cursor: "pointer",
              }}
            >
              Creat Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
