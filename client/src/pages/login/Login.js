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
    console.log('result', result)
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
          {/* <div className="social-icons">
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
          </div> */}
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
            <div style={{ width: "70%" }}>
              <Alert severity="error">{err}</Alert>
            </div>
          )}
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <button type="submit">Sign Up</button>
          )}
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          {/* <div className="social-icons">
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
          </div> */}
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
            <div style={{ width: "70%" }}>
              <Alert severity="error">{err}</Alert>
            </div>
          )}
          <a href="#">Forget Password?</a>
          <div>
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              //   <button className="login-button" type="submit">
              //     Login
              //   </button>
              <button type="submit">Sign In</button>
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
            <h1>Welcome Back</h1>
            <h3>DocStream</h3>
            <p className="quote">Bridging Healthcare Beyond Distance.</p>
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
