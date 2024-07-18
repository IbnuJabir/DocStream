import { useState, useEffect } from "react";
import "./style.css"; // Make sure this path is correct according to your project structure
import { useNavigate, Link } from "react-router-dom";
import { Alert, CircularProgress, FormGroup, TextField } from "@mui/material";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { login, signup } from "../../state/userSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email || !password) {
      setErr("Fill all fields");
      return;
    }

    const data = { password, email };
    await dispatch(login(data));
    if (error) return;
    toast.success("Successfully Logged In!");
    navigate("/");
  };
  const handleSigup = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email || !password || !username) {
      setErr("Fill all fields");
      return;
    }
    // setLoading(true);
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
    handleLoginClick();
  };

  const handleRegisterClick = () => {
    setErr("");
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setErr("");
    setIsActive(false);
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSigup}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icons">
              <i className="bx bxl-google"></i>
            </a>
            <a href="#" className="icons">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#" className="icons">
              <i className="bx bxl-github"></i>
            </a>
            <a href="#" className="icons">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
          <span>Register with E-mail</span>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && (
            <div style={{ width: 300 }}>
              <Alert severity="error">{err}</Alert>
            </div>
          )}
          {isLoading ? (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <button type="submit">Sign Up</button>
          )}
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icons">
              <i className="bx bxl-google"></i>
            </a>
            <a href="#" className="icons">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#" className="icons">
              <i className="bx bxl-github"></i>
            </a>
            <a href="#" className="icons">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
          <span>Login With Email & Password</span>
          <input
            type="email"
            placeholder="Enter E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && (
            <div style={{ width: 300 }}>
              <Alert severity="error">{err}</Alert>
            </div>
          )}
          <a href="#">Forget Password?</a>
          <div>
            {isLoading ? (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              //   <button className="login-button" type="submit">
              //     Login
              //   </button>
              <button type="button" onClick={handleSignIn}>
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>
              Welcome To <br />
              DocStream
            </h1>
            <p>Sign in With Email & Password</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hii Coder's</h1>
            <p>Join "Code With Patel" to Improve Your Coding Skills</p>
            <button
              className="hidden"
              id="register"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;

/*
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert, CircularProgress, FormGroup, TextField } from "@mui/material";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { login } from "../../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../style/login.css";
import AuthComponent from ".";

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
    <>
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
      <AuthComponent />
    </>
  );
}

*/
