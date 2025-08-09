import React, { useEffect } from "react";
import HandleFlashCards from "../flash-card/handle-flash-cards";
import { Button, Container } from "react-bootstrap";
import FileUploader from "../file-uploader/FileUploader";
import UrlUpload from "../url-uploader/UrlUpload";
import { createFlashCards } from "../APIs/api";

const TranscriptHandler = () => {
  const [flashCards, setFlashCards] = React.useState([]);
  const [mainTopics, setMainTopics] = React.useState([""]);
  const [flashCreated, setFlashCreated] = React.useState(false);

  const sendMainTopics = (mTopics: string[]) => {
    setMainTopics(mTopics);
    console.log("Main topics sent:", mTopics);
  };

  const createCards = async () => {
    const response = await createFlashCards(mainTopics);
    if (response) {
      setFlashCards(response.flashCards);
      console.log("Flash cards created:", response.flashCards);
    } else {
      console.log("No flash cards returned from the server.");
      alert("Error: No flash cards returned from the server.");
      console.log("Flash cards fetched:", response);
    }
  };

  useEffect(() => {
    if (flashCards.length === 0) {
      console.log("No flash cards available.");
      setFlashCreated(false);
    } else {
      console.log("Flash cards available:", flashCards);
      setFlashCreated(true);
    }
  }, [flashCards]);

  const handleCreateNewFlashCards = () => {
    setFlashCreated(false);
    setFlashCards([]);
    setMainTopics([""]);
  };

  return (
    <Container>
      {!flashCreated && (
        <>
          <FileUploader MainTopicsData={sendMainTopics} />
          <UrlUpload MainTopicsData={sendMainTopics} />
          {mainTopics.length > 0 && mainTopics[0] !== "" && (
            <>
              <p>Main Topics are: {mainTopics}</p>
              <Button className="mt-3" onClick={createCards}>
                Create Flash Cards
              </Button>
            </>
          )}
        </>
      )}
      {flashCreated && (
        <>
          <HandleFlashCards flashCards={flashCards} />
          <Button className="mt-3" onClick={handleCreateNewFlashCards}>
            Create New Flash Cards
          </Button>
        </>
      )}
    </Container>
  );
};

export default TranscriptHandler;
