import React from 'react';
import firebase from '../config/FirebaseCon';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Logoutadmin = () => {

    
    const logout = () => {
        firebase.auth().signOut()
    }


    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            <Nav.Link eventKey={2} onClick={logout}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default Logoutadmin;