import React, { useEffect } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import FlashCard from "./flash-card";
import "./flash-card.css";
import type { flashCardProps } from "../transcript-handler/TranscriptHandler";

interface HandleFlashCardsProps {
  flashCards: flashCardProps[];
}

const HandleFlashCards: React.FC<HandleFlashCardsProps> = ({ flashCards }) => {
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [hasAnswered, setHasAnswered] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState<string[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);

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

  useEffect(() => {
    console.log("userAnswers:", userAnswers);
    if (userAnswers[currentCardIndex] !== "") {
      setHasAnswered(true);
    }
  }, [currentCardIndex, userAnswers]);

  const onAnswerSelected = (user_answer: string) => {
    setHasAnswered(true);
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentCardIndex] = user_answer;
      if (flashCards[currentCardIndex].answer === user_answer) {
        setCorrectAnswersCount((prevCount) => prevCount + 1);
      }
      return newAnswers;
    });
  };

  const currentCard = flashCards[currentCardIndex];

  return (
    <Card className="flash-card">
      <FlashCard
        key={currentCardIndex}
        question={currentCard.question}
        answer={currentCard.answer}
        options={currentCard.options}
        reason={currentCard.reason}
        userAnswer={userAnswers[currentCardIndex] || ""}
        onAnswerSelected={onAnswerSelected}
      ></FlashCard>
      <Stack
        direction="horizontal"
        gap={3}
        className="justify-content-center mt-2 mb-3"
      >
        <Button
          className="prev-button-flash-card"
          variant="secondary"
          onClick={handlePrevClick}
          disabled={currentCardIndex === 0}
        >
          Previous
        </Button>
        {currentCardIndex !== flashCards.length - 1 && (
          <Button
            className="next-button-flash-card"
            onClick={handleNextClick}
            disabled={!hasAnswered || currentCardIndex >= flashCards.length - 1}
          >
            Next
          </Button>
        )}
      </Stack>
      <Card.Text className="flash-text">Correct Answers: {correctAnswersCount}/{flashCards.length}</Card.Text>
    </Card>
  );
};

export default HandleFlashCards;
