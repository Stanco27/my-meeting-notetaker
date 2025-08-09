import React from "react";
import { Button, Card, Stack } from "react-bootstrap";
import FlashCard from "./flash-card";
import "./flash-card.css";

interface FlashCardProps {
    question: string;
    options: string[];
    answer: string;
}

interface HandleFlashCardsProps {
    flashCards: FlashCardProps[];
}

const HandleFlashCards: React.FC<HandleFlashCardsProps> = ({ flashCards }) => {

  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [hasAnswered, setHasAnswered] = React.useState(false);

  const handlePrevClick = () => {
    if (currentCardIndex > 0) {
      setHasAnswered(false);
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentCardIndex < flashCards.length - 1) {
      setHasAnswered(false);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onAnswerSelected = () => {
    setHasAnswered(true);
  };

  const currentCard = flashCards[currentCardIndex];

  return (
    <Card className="flash-card">
      <FlashCard
        key={currentCardIndex}
        question={currentCard.question}
        answer={currentCard.answer}
        options={currentCard.options}
        onAnswerSelected={onAnswerSelected}
      ></FlashCard>
      <Stack
        direction="horizontal"
        gap={3}
        className="justify-content-center mt-3"
      >
        <Button
          variant="secondary"
          onClick={handlePrevClick}
          disabled={currentCardIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={handleNextClick}
          disabled={
            !hasAnswered || currentCardIndex >= flashCards.length - 1
          }
        >
          Next
        </Button>
      </Stack>
    </Card>
  );
};

export default HandleFlashCards;
