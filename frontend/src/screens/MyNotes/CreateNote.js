import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { loginActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage";
function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const type = useSelector((state) => state.login.type);
  const item = useSelector((state) => state.login.speech);
  useEffect(() => {
    if (type === "title") {
      localStorage.setItem("title", item);
    }
    if (type === "content") {
      setContent(item);
      localStorage.setItem("content", item);
    }
    if (type === "category") {
      setCategory(item);
      localStorage.setItem("category", item);
    }

    setTitle(localStorage.getItem("title"));
    setContent(localStorage.getItem("content"));
    setCategory(localStorage.getItem("category"));
  }, [item, type]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let token = userInfo.token;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Headers": "Authorization",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/notes/create",
        { title, content, category },
        config
      );
      setLoading(false);
      localStorage.setItem("content", "");
      localStorage.setItem("title", "");
      localStorage.setItem("category", "");
      setCategory("");
      setContent("");
      setTitle("");
      navigate("/mynotes");
    } catch (e) {
      dispatch(loginActions.error(e.response.data.message));
      setLoading(false);
    }
  };

  return (
    <MainScreen title="Create a Note">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <Loader />}
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button
                style={{ marginTop: 15, marginBottom: 15 }}
                onClick={() => {
                  dispatch(loginActions.speechType("title"));
                }}
              >
                <Link to="/speechToText">Speech</Link>
              </Button>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                style={{ marginTop: 15, marginBottom: 15 }}
                onClick={() => {
                  dispatch(loginActions.speechType("content"));
                }}
              >
                <Link to="/speechToText">Speech</Link>
              </Button>
            </Form.Group>

            <Form.Group controlId="content" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
              <Button
                style={{ marginTop: 15, marginBottom: 15 }}
                onClick={() => {
                  dispatch(loginActions.speechType("category"));
                }}
              >
                <Link to="/speechToText">Speech</Link>
              </Button>
            </Form.Group>
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button onClick={resetHandler} className="mx-2" variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
