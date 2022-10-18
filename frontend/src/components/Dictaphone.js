import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "react-bootstrap/Button";
import { loginActions } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dictaphone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  const micDataTransfer = () => {
    dispatch(loginActions.speechRecg(transcript));
    navigate(-1);
  };
  return (
    <div style={{ textAlign: "center", marginTop: 15 }}>
      <p style={{ fontSize: 20 }}>Microphone: {listening ? "on" : "off"}</p>
      <Button
        variant="outline-primary"
        className="mr-3"
        onClick={startListening}
      >
        Start
      </Button>
      <Button
        variant="outline-primary"
        className="mr-3"
        onClick={SpeechRecognition.stopListening}
      >
        Stop
      </Button>
      <Button variant="outline-primary" onClick={resetTranscript}>
        Reset
      </Button>
      <p style={{ fontSize: 24 }}>{transcript}</p>
      <Button onClick={micDataTransfer} variant="outline-success">
        Submit
      </Button>
    </div>
  );
};
export default Dictaphone;
