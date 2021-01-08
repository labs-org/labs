import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [labName, setLabName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password, labName };
      const loginRes = await Axios.post(
        'http://localhost:3000/users/login',
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('x-auth-token', loginRes.data.token);
      localStorage.setItem('labName', loginRes.data.labName);
      history.push('/Personalprofile');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    // <div style = {{ background: "#566573"}}>
    <div
      className="card p-3 shadow mb-5 bg-white"
      style={{
        width: '35rem',
        paddingTop: '100px',
        marginLeft: '150px',
        marginTop: '100px',
        height: '500px',
        borderRadius: '2.5rem',
       
       
      }}
    >
      <br />
      <h2 style={{ marginLeft: '10px' }}>Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <br />
        {/* <label style={{ marginLeft: '10px' }}>Email</label> */}
        <input
          required={true}
          className="form-control col"
          id="login-email"
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {/* <label style={{ marginLeft: '10px' }}>Password</label> */}
        <input
          required={true}
          name="password"
          className="form-control col"
          placeholder="Password"
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <label style={{ marginLeft: '10px' }}>Lab Name</label> */}
        <br />
        <input
          required={true}
          className="form-control col"
          id="login-labName"
          placeholder="Lab Name"
          type="text"
          onChange={(e) => setLabName(e.target.value)}
        />

        <br></br>
        <input
          // fullWidth
          // style={{ marginLeft: '20px' }}
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          value="Log in"
        />
       
        <br/>
        <p>
          Don't have an account? <a href="/register"> Sign Up</a>
        </p>
      </form>
    </div>
    // </div>
  );
}
