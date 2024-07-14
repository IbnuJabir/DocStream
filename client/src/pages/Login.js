import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert, CircularProgress, FormGroup, TextField } from "@mui/material";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { login } from "../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "../style/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email || !password) {
      setErr("Fill all fields");
      return;
    }

    const data = { password, email };
    await dispatch(login(data));
    if (isLoggedIn) {
      toast.success("Successfully Logged In!");
      navigate("/");
    }
  };

  return (
    <div style={{ paddingTop: "9%" }}>
      <div className="login-container">
        <div className="user-icon">
          <FaUser style={{ fontSize: 80, color: "#fff" }} />
        </div>
        <div style={{ marginTop: "10%" }}>
          <form onSubmit={handleSubmit}>
            <FormGroup style={{ marginTop: 30 }}>
              <TextField
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
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
            {err && (
              <div style={{ width: 300 }}>
                <Alert severity="error">{err}</Alert>
              </div>
            )}
            <div>
              {isLoading ? (
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
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#13A014",
                cursor: "pointer",
              }}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
