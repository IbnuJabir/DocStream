import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress, FormGroup, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RiAdminFill } from "react-icons/ri";
import { Button } from "@mui/material";
import { login } from "../../state/userSlice";
import "./login.css";

export default function Login({ isSignUpAllowed }) {
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

  // useEffect(() => {
  //   console.log('isLogin', isLoggedIn)
  //   if (isLoggedIn) {
  //     toast.success("Successfully Logged In!");
  //     navigate("/");
  //   }
  // }, [isLoggedIn, navigate]);

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
    <div style={{ paddingTop: "2%", width: "100%" }}>
      <div id="login-container">
        <div className="user-icon">
          <RiAdminFill style={{ fontSize: 80, color: "#fff" }} />
        </div>
        <h3 style={{ color: "#159eec" }}>Admin Login</h3>
        <div style={{ marginTop: "5%" }}>
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
                <Button
                  sx={{
                    padding: "8px 16px",
                    backgroundColor: "#159eec",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#127abb" },
                  }}
                  variant="outlined"
                  className="login-button"
                  type="submit"
                >
                  Login
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
