import {
  Alert,
  CircularProgress,
  FormGroup,
  Link,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
//   import { Button, Form, Nav } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !username) {
      setError("Fill all fields");
      return;
    }
    setLoading(true);
    let data = {
      username,
      password,
      email,
    };
    try {
      const result = await axios.post("/user/signup", data);
      if (result.data.newUser) {
        toast.success("Successfully registered!");
        navigate("/login");
        setError("");
      } else {
        setError(result.data.message);
      }
      console.log(result.data);
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
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "5% 0 2% 0" }}>
      <div className="login-container">
        <div className="user-icon" style={{ marginBottom: "400px" }}>
          <FaUser style={{ fontSize: 80, color: "#fff" }} />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <FormGroup style={{ marginTop: 20 }}>
              <TextField
                required
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                style={{ width: 300 }}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: 15 }}>
              <TextField
                required
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                style={{ width: 300 }}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: 15 }}>
              <TextField
                required
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                style={{ width: 300 }}
              />
            </FormGroup>

            {error && (
              <div style={{ margin: "8px 0 8px" }}>
                <Alert severity="error">{error}</Alert>
              </div>
            )}

            <div>
              {loading ? (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                <button
                  className="login-button"
                  type="submit"
                  variant="outline-dark"
                >
                  Signup
                </button>
              )}
            </div>
          </form>
          <div style={{ marginTop: "15px" }}>
            <Link
              href="/login"
              style={{ textDecoration: "none", color: "#13A014", cursor: "pointer" }}
            >
              Have an Account ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
