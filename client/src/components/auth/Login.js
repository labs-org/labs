import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/Personalprofile");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2>Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label>Email</label>
        <input
        required='true' type='text'className="form-control col"
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
         required='true'  type="password" name="password" className="form-control col"
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input type="submit" value="Log in" />

        <br></br>
                 <br></br>
                <p>Don't have an account? <a href='/add'> Sign Up</a></p>
      </form>
    </div>
  );
}
