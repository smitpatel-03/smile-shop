import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import "./SignUpLogin.css";

const SignUpLogIn = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const containerRef = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const toggleForm = () => {
    if (containerRef.current) {
      console.log("run");
      containerRef.current.classList.toggle("active");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    navigate("/account");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log(location.search.split("="));
    const redirect = location.search
      ? "/" + location.search.split("=")[1]
      : "/account";
    console.log(redirect);
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [error, alert, dispatch, isAuthenticated, navigate, location]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="login-section">
            <div className="login-container" ref={containerRef}>
              <div className="user signinBx">
                <div className="imgBx">
                  <img
                    src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                    alt=""
                  />
                </div>
                <div className="formBx">
                  <form onSubmit={loginSubmit}>
                    <h2>Sign In</h2>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <Link to="/password/forgot" className="forgot-pass">
                      Forget Password ?
                    </Link>
                    <input type="submit" value="Login" className="loginBtn" />
                    <p className="signup">
                      Don't have an account ?
                      <br />
                      <span onClick={toggleForm}>Sign Up.</span>
                    </p>
                  </form>
                </div>
              </div>
              <div className="user signupBx">
                <div className="formBx">
                  <form encType="multipart/form-data" onSubmit={registerSubmit}>
                    <h2>Create an account</h2>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                    <div id="registerImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Register"
                      className="signUpBtn"
                    />
                    <p className="signup">
                      Already have an account ?
                      <br />
                      <span onClick={toggleForm}>Sign in.</span>
                    </p>
                  </form>
                </div>
                <div className="imgBx">
                  <img
                    src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SignUpLogIn;
