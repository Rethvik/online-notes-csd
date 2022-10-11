import React from "react";
import MainScreen from "../../components/MainScreen";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { loginActions } from "../../store";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const registerFormHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      dispatch(loginActions.loggedIn());

      navigate("/mynotes");
    } catch (e) {
      setError(e.response.data.message);
      setLoading(false);
    }
  };
  return (
    <MainScreen title="Register">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <Loader />}
      <Form onSubmit={registerFormHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={nameChangeHandler}
            value={name}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={emailChangeHandler}
            value={email}
            type="text"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={passwordChangeHandler}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <Row>
        <Col className="mt-3">
          Already User?{" "}
          <Link to="/login" style={{ color: "blue" }}>
            Login Here
          </Link>
        </Col>
      </Row>
    </MainScreen>
  );
}

export default RegisterScreen;
