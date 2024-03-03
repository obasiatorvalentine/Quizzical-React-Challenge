import React from "react";
import { nanoid } from "nanoid";

export default function QuizOption(props) {
  const selectedOption = props.handleClick;

  const options = props.props.map((item, index, array) => {
    return (
      <button
        id={index}
        clicked={"false"}
        onClick={selectedOption}
        style={{ backgroundColor: "transparent" }}
      >
        {item}
      </button>
    );
  });

  return <>{options}</>;
}
