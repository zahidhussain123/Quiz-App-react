import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import Result from "./pages/result/Result";

function App() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState();
  const [score, setScore] = useState(0);
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    setQuestion(data.results);
  };
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              />
            }
          ></Route>
          <Route
            path="/quiz"
            element={
              <Quiz
                name={name}
                question={question}
                score={score}
                setQuestion={setQuestion}
                setScore={setScore}
              />
            }
          ></Route>
          <Route path="/result" element={<Result score={score} />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
