import { Button, ButtonGroup } from "react-bootstrap";
import React from "react";
import "./flash-card.css";

interface FlashCardProps {
  question: string;
  options: string[];
  answer: string;
  reason: string;
  userAnswer: string;
  onAnswerSelected: (answerLetter: string) => void;
}

const FlashCard: React.FC<FlashCardProps> = ({
  question,
  options,
  answer,
  reason,
  userAnswer,
  onAnswerSelected,
}) => {
  const cardHasBeenAnswered = userAnswer !== "";

  const handleOptionClick = (index: number) => {
    if (cardHasBeenAnswered) {
      return;
    }
    const selectedLetter = String.fromCharCode(65 + index);
    onAnswerSelected(selectedLetter);
  };

  const getButtonClass = (index: number) => {
    const optionLetter = String.fromCharCode(65 + index);
    if (cardHasBeenAnswered) {
      if (optionLetter === answer) {
        return "correct-option flash-card-options mb-4";
      } else if (optionLetter === userAnswer) {
        return "incorrect-option flash-card-options mb-4";
      } else {
        return "disabled-options flash-card-options mb-4";
      }
    } else {
      return "no-answer flash-card-options mb-4";
    }
  };

  const getAnswerText = (answerLetter: string): string => {
    const index = answerLetter.charCodeAt(0) - 65;
    return options[index];
  };

  return (
    <>
      <h2 className="mb-4 text-center">{question}</h2>
      <ButtonGroup vertical className="mt-3">
        {options.map((option, index) => (
          <Button
            key={index}
            className={getButtonClass(index)}
            variant="outline-primary"
            onClick={() => handleOptionClick(index)}
            disabled={cardHasBeenAnswered}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
      {cardHasBeenAnswered && (
        <>
          <p className="flash-text">
            {userAnswer === answer
              ? "Correct! Well done."
              : `Incorrect. The correct answer is: ${getAnswerText(answer)}.`}
          </p>
          {userAnswer !== answer && (
            <p className="flash-text">Reason: {reason}</p>
          )}
        </>
      )}
    </>
  );
};

export default FlashCard;