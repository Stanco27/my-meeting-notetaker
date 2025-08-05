import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./FileUploader.css";
import { getTranscription, uploadAudioFile } from "../APIs/api";

const FileUploader = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const supportedFileTypes = [
    "mp3",
    "mp4",
    "wav",
    "ogg",
    "webm",
    "m4a",
    "flac",
    "aac",
    "pcm",
    "mp2",
    "opus",
  ];
  const pattern = new RegExp(`\\.(${supportedFileTypes.join("|")})$`, "i");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      alert("Error: No file selected.");
      fileInputRef.current!.value = "";
    } else if (!pattern.test(file.name)) {
      alert("Error: Not a valid file type.");
      fileInputRef.current!.value = "";
    } else {
      alert(`Selected file: ${file.name}`);
    }
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async () => {
    const response = await uploadAudioFile(fileInputRef.current!.files![0]);
    console.log("Audio file uploaded successfully:", response);
    const transcription = await getTranscription(response.transcriptId);
    console.log("Transcription result:", transcription);
  };

  return (
    <Container className="file-uploader-container">
      <h1>Upload</h1>
      <Form>
        <Form.Group>
          <Form.Control
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Form.Group>
      </Form>
      {fileName && !pattern.test(fileName) ? (
        <p className="mt-3 text-danger text-center">
          - Please select a valid audio file.
        </p>
      ) : fileName && pattern.test(fileName) ? (
        <p className="mt-3">Selected file: {fileName}</p>
      ) : null}
      <Button className="mt-3" onClick={handleSubmit} disabled={fileName == ""}>
        Get Notes
      </Button>
    </Container>
  );
};

export default FileUploader;
