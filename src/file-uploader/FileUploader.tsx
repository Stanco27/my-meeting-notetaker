import React, { useEffect } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import "./FileUploader.css";
import { getMainTopics, getTranscription, uploadAudioFile } from "../APIs/api";

interface FileUploaderProps {
  MainTopicsData: (mainTopics: string[]) => void;
  setLoading: (isLoading: boolean) => void;
  loading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  MainTopicsData,
  setLoading,
  loading,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
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
      setError("- No file selected.");
      fileInputRef.current!.value = "";
    } else if (!pattern.test(file.name)) {
      alert("Error: Not a valid file type.");
      setError(
        `- Please select a valid audio file. Supported formats: ${supportedFileTypes.join(
          ", "
        )}`
      );
      fileInputRef.current!.value = "";
    } else {
      alert(`Selected file: ${file.name}`);
    }
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await uploadAudioFile(fileInputRef.current!.files![0]);
    if (!response || !response.transcriptId) {
      alert("Error: No transcript ID returned from the server.");
      setError("- Error: No transcript ID returned from the server.");
      setLoading(false);
      return;
    }

    console.log("Audio file uploaded successfully:", response);
    const transcription = await getTranscription(response.transcriptId);
    if (!transcription) {
      alert("Error: No transcription data returned from the server.");
      setError("- Error: No transcription data returned from the server.");
      setLoading(false);
      return;
    }

    let mainTopics = await getMainTopics(transcription.transcriptText);
    if (!mainTopics || mainTopics.length === 0) {
      alert("Error: No main topics extracted from the transcription.");
      setError("- Error: No main topics extracted from the transcription.");
      setLoading(false);
      return;
    }

    MainTopicsData(mainTopics.mainTopics);
    console.log("Main topics result:", mainTopics);
    setFileName("");
    fileInputRef.current!.value = "";
    setError("");
    alert("Transcription completed successfully!");
    setLoading(false);
  };

  useEffect(() => {
    if (fileName && !pattern.test(fileName)) {
      setError("- Please select a valid audio file.");
    }
  }, [fileName]);

  return (
    <Container className="file-uploader-container mt-5">
      <h1>Upload</h1>
      {!loading && (
        <>
          <Form>
            <Form.Group>
              <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                required
                
              />
            </Form.Group>
            <p className="mt-3">Supported Files: {supportedFileTypes.join(", ")}</p>
          </Form>
          {error && <p className="text-danger">{error}</p>}
          <Button
            className="mt-3 file-uploader-btn"
            onClick={handleSubmit}
            disabled={fileName == ""}
          >
            Get Notes
          </Button>
        </>
      )}
      {loading && <Spinner animation="border" role="status" className="mt-3" />}
    </Container>
  );
};

export default FileUploader;
