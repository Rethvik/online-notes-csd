import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { loginActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";

const SingleNote = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const type = useSelector((state) => state.login.type);
  const item = useSelector((state) => state.login.speech);
  const fetchOneNote = async () => {
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
      const { data } = await axios.get(`/api/notes/${id}`, config);
      console.log(localStorage.getItem("title"));
      localStorage.getItem("title")
        ? setTitle(localStorage.getItem("title"))
        : setTitle(data.title);
      localStorage.getItem("category")
        ? setCategory(localStorage.getItem("category"))
        : setCategory(data.category);
      localStorage.getItem("content")
        ? setContent(localStorage.getItem("content"))
        : setContent(data.content);

      setLoading(false);
    } catch (e) {
      dispatch(loginActions.error(e.response.data.message));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOneNote();
    if (type === "title") {
      localStorage.setItem("title", item);
    }
    if (type === "content") {
      localStorage.setItem("content", item);
    }
    if (type === "category") {
      localStorage.setItem("category", item);
    }
    setTitle(localStorage.getItem("title"));
    setContent(localStorage.getItem("content"));
    setCategory(localStorage.getItem("category"));
  }, [type, item]);

  const formUpdateHandler = async (e) => {
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
      const { data } = await axios.put(
        `/api/notes/${id}`,
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
  console.log({ title, content, category });
  return (
    <MainScreen title="Edit Note">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <Loader />}
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={formUpdateHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
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
                placeholder="Enter the content"
                rows={4}
                value={content}
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
            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
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
            <Button
              style={{ marginTop: "15px" }}
              variant="primary"
              type="submit"
            >
              Update Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
