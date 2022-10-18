import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";
import { Container, Row, Button } from "react-bootstrap";
const LandingPage = () => {
  const history = useNavigate();
  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    if (info) {
      history("/mynotes");
    }
  }, [history]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Online Notes Application</h1>
              <p>
                Come and Save Your Notes Or Just Talk and Save Notes! No time to
                read then Listen
              </p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button
                  variant="outline-info"
                  size="lg"
                  className="landingbutton"
                >
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-info"
                >
                  Register
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
