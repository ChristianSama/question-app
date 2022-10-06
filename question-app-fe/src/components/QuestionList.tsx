import React, { useEffect, useReducer, useState } from "react";
import { Question } from "../types";

const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/questions/")
      .then((res) => res.json())
      .then((result) => {
        setQuestions(result);
      });
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/api/questions/${id}/`, {
        method: 'DELETE'
      }
    )
    const newQuestions = [...questions].filter(q => q.pk !== id)
    setQuestions(newQuestions)
  }

  return (
    <>
      {questions.map((question) => (
        <div key={question.pk}>
          <h2>{question.text}</h2>
          <ol>
            {question.choices.map(choice => (
              <li key={choice.pk}>{choice.text}</li>  
            ))}
          </ol>
          <button onClick={() => handleDelete(question.pk)}>DELETE</button>
        </div>
      ))}
    </>
  );
};

export default QuestionList;
