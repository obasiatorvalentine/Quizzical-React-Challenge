import React from "react";
import QuizzicalQuestions from "./components/QuizzicalQuestion";

function App() {
  const [start, setStart] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [answers, setAnswers] = React.useState([1, 2, 3, 4, 5]);
  const [score, setScore] = React.useState(0);
  const [quizData, setQuizData] = React.useState([]);

  //console.log(quizData)
  React.useEffect(() => {
      if(start){
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) => setQuizData(data.results));
      }
  }, [start]);

  function correctAnswers() {
    const ans = quizData;
    const newArr = [];
    if (quizData === undefined) {
    } else {
      for (let i = 0; i < ans.length; i++) {
        newArr.push(ans[i].correct_answer);
      }
      return newArr;
    }
  }

  function checkAnwers() {
    const questionItemMain =
      document.getElementsByClassName("question-item-main");
    for (let i = 0; i < questionItemMain.length; i++) {
      const answerItem = answers[i];
      const questionOptions = questionItemMain[i].children[1].children;

      for (let i = 0; i < questionOptions.length; i++) {
        if (questionOptions[i].attributes[1].value === "true") {
          if (correctAnswers().indexOf(questionOptions[i].innerHTML) > -1) {
            questionOptions[i].style.backgroundColor = "#94D7A2";
            setScore((prevValue) => {
              prevValue = prevValue + 1;
              return prevValue;
            });
          } else {
            questionOptions[i].style.backgroundColor = "#F8BCBC";
          }
        }
      }
      for (let i = 0; i < questionOptions.length; i++) {
        if (correctAnswers().indexOf(questionOptions[i].innerHTML) > -1) {
          questionOptions[i].style.backgroundColor = "#94D7A2";
          questionOptions[i].style.color = "black";
        }
      }
    }
    setFinished(true);
  }

  return (
    <main>
      <div className="top-right"></div>
      <div className="bottom-left"></div>
      {start ? (
        <div className="questions">
          <QuizzicalQuestions
            data={quizData}
            setanswers={setAnswers}
            answers={answers}
          />
          <div className={finished ? "score" : ""}>
            {finished && <p>You scored {score} out of 5</p>}
            {finished ? (
              <button
                className="check-answer-btn"
                onClick={() => {
                  setStart(false)
                  setFinished(false);
                  setScore(0);
                  setQuizData([])
                }}
              >
                Play Again
              </button>
            ) : (
              <button className="check-answer-btn" onClick={checkAnwers}>
                Check Answer
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-content">
          <h2 className="quizzical">Quizzical</h2>
          <p>Some description if needed</p>
          <button
            className="start-btn"
            onClick={() => {
              setStart(true);
            }}
          >
            Start Quiz
          </button>
        </div>
      )}
    </main>
  );
}
//The markup below is for the first/ welcome epage

export default App;
