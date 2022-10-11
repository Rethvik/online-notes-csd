import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import axios from "axios";
function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };
  const formSubmitHandler = async (e) => {
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
    setLoading(true);
    const { data } = await axios.post(
      "/api/notes/create",
      { title, content, category },
      config
    );
    setLoading(false);
    navigate("/mynotes");
  };
  return (
    <MainScreen title="Create a Note">
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
            </Form.Group>

            <Form.Group controlId="content" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
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
