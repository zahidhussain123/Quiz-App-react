import { Button } from "@material-ui/core";
import { useState } from "react";
import "./question.css";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useNavigate } from "react-router";

const Question = ({
  currQuestion,
  setCurrQuestion,
  question,
  option,
  correct,
  setScore,
  score,
 setQuestion,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currQuestion > 8) {
    navigate("/result");
    } else if (selected) {
      setCurrQuestion(currQuestion + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQuestion(0);
    setQuestion();
  };

  return (
    <div className="question">
      <h1>Question{currQuestion + 1} :</h1>

      <div className="singleQuestion">
        <h2>{question[currQuestion].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {option &&
            option.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQuestion > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;