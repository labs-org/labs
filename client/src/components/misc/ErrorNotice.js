import React from "react";

export default function ErrorNotice(props) {
  return (
    <div className="alert alert-danger" role="alert">
      <span>{props.message}</span>
      <button  className="close" onClick={props.clearError}>X</button>
    </div>
  );
}
