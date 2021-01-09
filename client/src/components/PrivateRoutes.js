import React from 'react';
import {Redirect , Route } from 'react-router-dom'
function PrivateRoute({component:Component , ...rest}){
  return (<Route  
    {...rest}
    render={(props) =>{
    
        if (typeof localStorage.getItem('x-auth-token') === "string" ){
      return <Component {...props}/>
    }
    else{
      return( <Redirect to ={{ pathname :'/Homepage', state:{from :props.location} } }
      />)}
  }}
  />
  )
}
  export default PrivateRoute;