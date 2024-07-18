import {
  Alert,
  CircularProgress,
  FormGroup,
  Link,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
//   import { Button, Form, Nav } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signup } from "../../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../style/signup.css";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      setErr(error.message);
    } else {
      setErr("");
    }
  }, [error]);
  const handleSigup = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email || !password || !username) {
      setErr("Fill all fields");
      return;
    }
    setLoading(true);
    let data = {
      username,
      password,
      email,
    };

    const result = await dispatch(signup(data));
    if (error) return;
    console.log(result);
    console.log(error);
    toast.success("Account created Successfully!");
    navigate("/login");
  };

  return (
    <div style={{ padding: "5% 0 2% 0" }}>
      <div className="login-container">
        <div className="user-icon" style={{ marginBottom: "400px" }}>
          <FaUser style={{ fontSize: 80, color: "#fff" }} />
        </div>
        <div>
          <form onSubmit={handleSigup}>
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

            {err && (
              <div style={{ margin: "8px 0 8px" }}>
                <Alert severity="error">{err}</Alert>
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
              style={{
                textDecoration: "none",
                color: "#13A014",
                cursor: "pointer",
              }}
            >
              Have an Account ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
