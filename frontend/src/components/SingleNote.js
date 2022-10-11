import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
const SingleNote = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const fetchOneNote = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let token = userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Headers": "Authorization",
      },
    };
    const { data } = await axios.get(`/api/notes/${id}`, config);
    setTitle(data.title);
    setContent(data.content);
    setCategory(data.category);
  };
  useEffect(() => {
    fetchOneNote();
  }, []);
  const formUpdateHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let token = userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Headers": "Authorization",
      },
    };
    const { data } = await axios.put(
      `/api/notes/${id}`,
      { title, content, category },
      config
    );
    navigate("/mynotes");
  };
  return (
    <MainScreen title="Edit Note">
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
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
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
