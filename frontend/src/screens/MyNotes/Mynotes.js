import React, { useEffect, useState } from "react";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import Loader from "../../components/Loader";
import Speech from "react-speech";
import "./Mynotes.css";
import { FaRegPlayCircle } from "react-icons/fa";
const Mynotes = () => {
  const [userNotes, setuserNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let token = userInfo.token;

  const fetchNotes = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    const { data } = await axios.get("/api/notes", config);
    setuserNotes(data);
    setLoading(false);
  };
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let token = userInfo.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Headers": "Authorization",
        },
      };
      const { data } = await axios.delete(`/api/notes/${id}`, config);
      console.log(data);
    }
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="My Notes">
      <Link id="RouterNavLink" to="/createnote">
        <Button
          variant="outline-secondary"
          style={{
            marginLeft: 10,
            marginBottom: 6,
            color: "black",
            letterSpacing: "1px",
          }}
          size="lg"
        >
          Create a New Note
        </Button>
      </Link>

      {userNotes.length < 1 && <h2>No notes available, Create a new one</h2>}
      {loading && <Loader />}
      {userNotes.length > 0 &&
        userNotes.map((note) => (
          <Accordion key={note._id}>
            <Card key={note._id} style={{ margin: 10 }}>
              <Accordion.Header>
                <Card.Header
                  style={{ display: "flex", backgroundColor: "#fffffc" }}
                >
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignItems: "center",
                      fontSize: 18,
                      textAlign: "left",
                    }}
                  >
                    <Accordion.Item
                      style={{ fontFamily: "Montserrat" }}
                      eventKey="0"
                    >
                      {note.title}
                    </Accordion.Item>
                  </span>
                  <div>
                    <Speech
                      textAsButton={true}
                      displayText={<FaRegPlayCircle />}
                      rate="0.5"
                      text={`Category ${note.category} Title ${note.title} Content ${note.content}`}
                    ></Speech>
                    <Button
                      variant="outline-info"
                      style={{ textDecoration: "none" }}
                    >
                      <Link style={{ color: "black" }} to={`/note/${note._id}`}>
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
              </Accordion.Header>
              <Accordion.Body>
                <Card.Body>
                  <h4>
                    <Badge bg="success">Category- {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      {`Created on- ${note.createdAt.substring(0, 10)}`}
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default Mynotes;
