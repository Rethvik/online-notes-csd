import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { loginActions } from "../../store";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function Header() {
  const navigate = useNavigate();
  const [name, setName] = useState("Author");
  const [logged, setLogged] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setLogged(true);
    }
  }, [userInfo]);
  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    setName("Author");
    setLogged(false);
    dispatch(loginActions.loggedOut());
  };
  return (
    <React.Fragment>
      <Navbar
        style={{
          backgroundColor: "#f75c03",
          borderColor: "#f75c03",
        }}
        expand="lg"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand>
            <Link
              style={{
                color: "white",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              to="/"
            >
              Notes App
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{
              width: "45px",
              backgroundColor: "transparent",
              border: "None",
              outline: "None",
              color: "#3691db",
            }}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 m-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {logged && (
                <Nav.Link>
                  <Link
                    style={{
                      letterSpacing: "1px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    to="/mynotes"
                  >
                    My Notes
                  </Link>
                </Nav.Link>
              )}
              {logged && (
                <NavDropdown
                  style={{ color: "black" }}
                  title={name}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item
                    style={{ color: "black" }}
                    onClick={logOutHandler}
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
