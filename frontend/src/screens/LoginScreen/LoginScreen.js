import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);

  const emailChangeHandler = (e) => {
    dispatch(loginActions.emailHandler(e.target.value));
  };
  const passwordChangeHandler = (e) => {
    dispatch(loginActions.passwordHandler(e.target.value));
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch(loginActions.loadingTrue());
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(loginActions.loggedIn());
      navigate("/mynotes");
      dispatch(loginActions.loadingFalse());
    } catch (e) {
      dispatch(loginActions.error(e.response.data.message));
      dispatch(loginActions.loadingFalse());
    }
  };
  return (
    <React.Fragment>
      <MainScreen title="Login">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <Loader />}
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={emailChangeHandler}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={passwordChangeHandler}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row>
          <Col className="mt-3">
            New User?{" "}
            <Link to="/register" style={{ color: "blue" }}>
              Register Here
            </Link>
          </Col>
        </Row>
      </MainScreen>
    </React.Fragment>
  );
};

export default LoginScreen;
