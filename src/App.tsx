import { Container } from "react-bootstrap";
import "./App.css";
import FileUploader from "./file-uploader/FileUploader";
import NavigationBar from "./navigation-bar/NavigationBar";
import HandleFlashCards from "./flash-card/handle-flash-cards";
import UrlUpload from "./url-uploader/UrlUpload";


function App() {
  return (
    <>
      <NavigationBar />
      <Container className="fluid d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <FileUploader />
        <UrlUpload />
        <HandleFlashCards />
      </Container>
    </>
  );
}

export default App;
