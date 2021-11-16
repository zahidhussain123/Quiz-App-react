import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Question from "../../components/question/Question";
import "./quiz.css";

const Quiz = ({ name, score, question, setQuestion, setScore }) => {
  const [option, setOption] = useState("");
  const [currQuestion, setCurrQuestion] = useState(0);
  useEffect(() => {
    setOption(
      question &&
        handleShuffle([
          question[currQuestion]?.correct_answer,
          ...question[currQuestion]?.incorrect_answers,
        ])
    );
  }, [question,currQuestion]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  return (
    <div className="quiz">
      <span className="subtitle">Welcome ,{name}</span>
      {question ? (
        <>
          <div className="quizInfo">
            <span>{question[currQuestion].category}</span>
            <span>score : {score}</span>
          </div>
          <Question
            currQuestion={currQuestion}
            setCurrQuestion={setCurrQuestion}
            question={question}
            option={option}
            correct={question[currQuestion]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestion={setQuestion}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
