import { Button, ButtonGroup } from "react-bootstrap";
import React from "react";
import "./flash-card.css";

interface FlashCardProps {
  question: string;
  options: string[];
  answer: string;
  onAnswerSelected: () => void;
}

const FlashCard: React.FC<FlashCardProps> = ({
  question,
  options,
  answer,
  onAnswerSelected,
}) => {
  console.log("FlashCard component rendered with:", {
    question,
    options,
    answer,
  });

  const [OptionClick, setHandleOptionClick] = React.useState<string | null>(
    null
  );
  const [feedback, setFeedback] = React.useState("");

  const handleOptionClick = (option: string) => {
    if (feedback != "") {
      return;
    }
    setHandleOptionClick(option);
    if (option === answer) {
      setFeedback("correct");
      console.log("Correct option clicked:", option);
    } else {
      setFeedback("incorrect");
      console.log("Incorrect option clicked:", option);
    }

    onAnswerSelected();

  };

  return (
    <>
      <h2 className="mb-3">{question}</h2>
      <ButtonGroup vertical>
        {options.map((option, index) => (
          <Button
            key={index}
            className={
              OptionClick === option && feedback == "correct"
                ? "correct-option flash-card-options mb-4"
                : OptionClick === option && feedback == "incorrect"
                ? "incorrect-option flash-card-options mb-4"
                : feedback != "" && OptionClick !== option
                ? "disabled-options flash-card-options mb-4"
                : "no-answer flash-card-options mb-4"
            }
            variant="outline-primary"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <p className={feedback != "" ? "flash-text" : ""}>
        {feedback === "correct"
          ? "Correct! Well done."
          : feedback === "incorrect"
          ? `Incorrect. The correct answer is: ${answer}`
          : ""}
      </p>
    </>
  );
};

export default FlashCard;
