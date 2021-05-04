import React, { useState } from "react";
import "./style.css";
import playImg from "../../Media/play.svg";
import launchImg from "../../Media/launch.svg";
import Input from "../../components/UI/Input";
import { useDispatch , useSelector} from "react-redux";
import { Redirect, useHistory} from 'react-router-dom'
import authAction from "../../Actions/auth.action";
// import { signup } from "../../Actions/user.action";

/**
 * @author
 * @function LoginSignup
 **/

const LoginSignup = (props) => {
  const [mode, setMode] = useState("container-123");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const dispatch = useDispatch();
  const history = useHistory()
  const auth = useSelector(state=>state.auth);
  const user = useSelector(state=>state.user);

  if(auth.authenticate){
    return <Redirect to='/'/>
  }

  const signUpBtn = () => {
    setMode("container-123 sign-up-mode-123");
  };

  const signInBtn = () => {
    setMode("container-123");
  };

  const submitSignupBtn = (event) => {
    event.preventDefault();
    const signupForm = {
      firstName,
      lastName,
      email,
      username,
      contactNumber,
      password,
    };

   history.push("/login/complete",{form:signupForm})
    // dispatch(signup(signupForm))
    // setMode("container-123");
  };

  const submitSigninBtn = (event) => {
    event.preventDefault();
    const signinForm = {
      email,
      password,
    };
    dispatch(authAction(signinForm))
  };

  return (
    <div className={mode}>
      <div className="forms-container-loginSignup">
        <div className="signin-signup-123">

            {/* Signin Form  */}  

          <form onSubmit={submitSigninBtn} className="sig-in-form-123">
            {(user.done) && <p>Signed up Successfully, now Signin</p>}
            <h2 className="title-123">SIGNIN</h2>
            <Input
              type="text"
              placeholder="Email"
              iclassname="fas fa-envelope"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              iclassname="fas fa-lock"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input type="submit" value="Login" className="btn-123 solid" />
          </form>

          {/* Sign up form  */}

          <form onSubmit={submitSignupBtn} className="sig-up-form-123">
            <h2 className="title-123">SIGNUP</h2>
            <Input
              type="text"
              placeholder="First Name"
              iclassname="fas fa-user"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />

            <Input
              type="text"
              placeholder="Last Name"
              iclassname="fas fa-user"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />

            <Input
              type="text"
              placeholder="Username"
              iclassname="fas fa-user"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <Input
              type="email"
              placeholder="Email"
              iclassname="fas fa-envelope"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              type="text"
              placeholder="Phone Number"
              iclassname="fas fa-phone"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              iclassname="fas fa-lock"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input type="submit" value="Signup" className="btn-123 solid" />
          </form>
        </div>
      </div>

      <div className="panels-container-123">
        <div className="panel-123 left-panel-123">
          <div className="content-123">
            <h3>New Here?</h3>
            <p>Register yourself by clicking on Signup Button</p>
            <button
              onClick={signUpBtn}
              className="btn-123 transparent-123"
              id="sign-up-btn"
            >
              Signup
            </button>
          </div>
          <img src={launchImg} className="image-123" alt="Rocket" />
        </div>
        <div className="panel-123 right-panel-123">
          <div className="content-123">
            <h3>One of Us?</h3>
            <p>Login yourself by clicking on Signin Button</p>
            <button
              onClick={signInBtn}
              className="btn-123 transparent-123"
              id="sign-in-btn"
            >
              Signin
            </button>
          </div>
          <img src={playImg} className="image-123" alt="play" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
