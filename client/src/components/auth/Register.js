import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
// import {Button} from "reactstrap";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [labName, setLabName] = useState();
  const [location, setLocation] = useState();
  const [phone, setPhone] = useState();
  const [officialWebSite, setOfficialWebSite] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, labName,location, phone};
      await Axios.post("http://localhost:3000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/login");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
            <br />
            <div className = "container text-center"></div>
    <div className="page">
    <h3 className = "mb-3">Register</h3>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      
      <form className="text-center border border-light p-9" onSubmit={submit}>
        <label >Email</label>
        <input
        required='true' type='text'className="form-control col"
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label >Password</label>
        <input
        required='true'  type="password" name="password" className="form-control col"
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input
        required='true'  type="password" name="password" className="form-control col"
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label>Lab Name</label>
        <input
        required='true'  className="form-control col"
          id="register-lab-name"
          type="text"
          onChange={(e) => setLabName(e.target.value)}
        />

<label>Location</label>
        <input
        required='true'  className="form-control col"
          id="register-location"
          type="text"
          onChange={(e) => setLocation(e.target.value)}
        />

<label htmlFor="register-phone">Phone</label>
        <input
        required='true'  className="form-control col"
          id="register-phone"
          type="text"
          onChange={(e) => setPhone(e.target.value)}
        />

{/* <label >Official officialWebSite</label>
        <input
        required='true'  className="form-control col"
          id="official-web-site"
          type="text"
          onChange={(e) => setOfficialWebSite(e.target.value)}
        /> */}
        
       {/* < Button class="btn btn-secondary" type='submit' value='Creat Account' className="btn btn-deep-orange darken-4"></Button> */}
        <input type="submit" value="Register" />

        <br></br>
               <b>If you already have an account<a href='/login'> Log In </a></b>
      </form>
    </div>
    </div>
  );
}
