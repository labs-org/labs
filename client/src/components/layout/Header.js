import React , {useContext } from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
// import UserContext from "../../context/userContext";

export default function Header() {
  const userContext = useContext(userContext);
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title"></h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
