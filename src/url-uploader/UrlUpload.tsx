import React from "react";
import "./UrlUploader.css";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { getTranscription, startTranscription } from "../APIs/api";

const UrlUpload = () => {
  const [url, setUrl] = React.useState<string>("");
  const [URLError, setURLError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;

  const handleSubmit = async () => {
    if (!urlRegex.test(url)) {
      alert("Please enter a valid URL");
      return;
    }
    setLoading(true);
    const response = await startTranscription(url);
    console.log("Audio file transcription result:", response);
    if (response.status == "error") {
      alert("Error: " + response.error);
      setURLError("Error: Invalid URL or transcription failed.");
      setLoading(false);
      return;
    } else if (!response.transcriptId) {
      alert("Error: No transcript ID returned from the server.");
      setURLError("Error: No transcript ID returned from the server.");
      setLoading(false);
      return;
    }
    const transcription = await getTranscription(response.transcriptId);
    console.log("Transcription result:", transcription);
    console.log("URL submitted:", url);
    setURLError("");
    setUrl("");
    setLoading(false);
  };

  return (
    <Container className="url-uploader-container">
      <h1>Enter Audio URL</h1>
      {!loading && (
        <>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter audio file URL"
                value={url}
                onChange={handleUrlChange}
              />
            </Form.Group>
            {URLError && (
              <p className="mt-3 text-danger text-center">- {URLError}</p>
            )}
            {url && !urlRegex.test(url) && (
              <p className="mt-3 text-danger text-center">
                - Please enter a valid URL.
              </p>
            )}
          </Form>
          <Button
            className="mt-3"
            onClick={handleSubmit}
            disabled={!urlRegex.test(url)}
          >
            Get Notes
          </Button>
        </>
      )}
      {loading && (
        <Spinner animation="border" role="status" className="mt-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default UrlUpload;
