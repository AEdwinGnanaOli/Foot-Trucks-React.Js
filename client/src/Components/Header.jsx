import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import { useAuth } from "../Context/auth";


function Navbars() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const Logout = () => {
    navigate("/");
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem('auth')
    localStorage.clear("utoken");
  };
  return (
    <Navbar expand="md" className="bg-body-tertiary navbar-header">
      <Container fluid>
        <Navbar.Brand onClick={(e) => navigate("/")} className="logo">Foot Trucks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={(e) => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={(e) => navigate("/about-us")}>About Us</Nav.Link>
            <Nav.Link onClick={(e) => navigate("/contect-us")}>Contact Us</Nav.Link>
            {!auth.user ? (
              <>
                <Button variant={"success"} className="signin-btn" onClick={(e) => navigate("/signin")}>
                  SignIn
                </Button>
                <Button variant={"success"} className="login-btn" onClick={(e) => navigate("/login")}>
                  Login
                </Button>
              </>
            ) : (
              <>
                <Button variant={"success"} onClick={Logout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
