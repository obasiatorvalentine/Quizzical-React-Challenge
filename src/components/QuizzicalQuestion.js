import React from "react";
import QuizOption from "./QuizOptions";
import { nanoid } from "nanoid";

function QuizzicalQuestions(props) {
  const UserAnswersArray = props.answers;
  //this function highlights selected option
  //and pushes the users answers into an array
  //called answersArray
  function selectedOption(event) {
    let elementId = event.target.id;
    const elements = event.target.parentElement.children;
    const questionsElements = event.target.parentElement;

    for (let i = 0; i < elements.length; i++) {
      if (elementId === elements[i].id) {
        props.setanswers((prevArray) => {
          UserAnswersArray.splice(
            questionsElements.parentElement.id,
            1,
            elements[i].innerHTML
          );
          return UserAnswersArray;
        });

        elements[i].attributes.clicked.value = "true";
        elements[i].style.backgroundColor = "#ccd0e6";
        elements[i].style.color = "#293264";
        elements[i].style.outline = "none";
      } else {
        elements[i].attributes.clicked.value = "false";
        elements[i].style.backgroundColor = "transparent";
        elements[i].style.color = "#959cbe";
        elements[i].style.outline = "solid .5px #959cbe";
      }
    }
  }
  if (props.data == undefined) {
  } else {
    const quizQuestion = props.data.map((item, index, array) => {
      if (item.incorrect_answers.length < 4) {
        item.incorrect_answers.push(item.correct_answer);
        item.incorrect_answers.sort();
      }
      return (
        <div id={index} className="question-item-main">
          <h5 className="question-item">{item.question}</h5>
          <div className="question-option">
            <QuizOption
              props={item.incorrect_answers}
              realProps={props.data}
              handleClick={selectedOption}
            />
          </div>
          <hr />
        </div>
      );
    });

    return <>{quizQuestion}</>;
  }
}
export default QuizzicalQuestions;
