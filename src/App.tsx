import { Container } from "react-bootstrap";
import "./App.css";
import FileUploader from "./file-uploader/FileUploader";
import NavigationBar from "./navigation-bar/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <FileUploader />
      </Container>
    </>
  );
}

export default App;
