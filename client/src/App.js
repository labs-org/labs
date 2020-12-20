import React from 'react';
import AppNavbar from "./components/AppNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePage from "./components/ProfilePage"

const App = () => {
    return ( <
        div className = "App" >
        <AppNavbar / >
        <ProfilePage />
        </div>
    );
};

export default App;