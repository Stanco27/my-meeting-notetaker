import React from "react";
import { Button, Card, Stack } from "react-bootstrap";
import FlashCard from "./flash-card";
import "./flash-card.css";

interface FlashCardData {
  question: string;
    options: string[];
    answer: string;
}

const HandleFlashCards = () => {
  const tempFlashCards = [
    {
      question: "What is React?",
      options: ["Library", "Framework", "Language", "Tool"],
      answer: "Library",
    },
    {
      question: "What is JSX?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "JavaScript Xtreme",
        "JavaScript X",
      ],
      answer: "JavaScript XML",
    },
  ];
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [hasAnswered, setHasAnswered] = React.useState(false);

  const handlePrevClick = () => {
    if (currentCardIndex > 0) {
      setHasAnswered(false);
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentCardIndex < tempFlashCards.length - 1) {
      setHasAnswered(false);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onAnswerSelected = () => {
    setHasAnswered(true);
  };

  const currentCard = tempFlashCards[currentCardIndex];

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
            !hasAnswered || currentCardIndex >= tempFlashCards.length - 1
          }
        >
          Next
        </Button>
      </Stack>
    </Card>
  );
};

export default HandleFlashCards;
