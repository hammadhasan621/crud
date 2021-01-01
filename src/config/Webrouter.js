import React from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import Signup from '../component/Signup';
import Login from '../component/Login';
import Adminpanel from '../component/Adminpanel';

const Webrouter = () => {
    return (
        <Router>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/adminpanel" component={Adminpanel}></Route>
        </Router>
    );
};

export default Webrouter;