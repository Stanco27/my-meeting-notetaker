import { Container } from "react-bootstrap";
import "./App.css";
import NavigationBar from "./navigation-bar/NavigationBar";
import TranscriptHandler from "./transcript-handler/TranscriptHandler";


function App() {
  return (
    <>
      <NavigationBar />
      <Container className="fluid d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <TranscriptHandler />
      </Container>
    </>
  );
}

export default App;
