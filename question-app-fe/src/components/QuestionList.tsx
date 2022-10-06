import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import { Question } from "../types";

const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [updating, setUpdating] = useState<boolean>(false);

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

  const handleUpdate = async (Qindex: number) => {
    await fetch(`http://localhost:8000/api/questions/${questions[Qindex].pk}/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: questions[Qindex].text,
        choices: questions[Qindex].choices
      }),
    })
    setUpdating(prev => !prev) 
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>, Qindex: number, Cindex: number) => {
    const data = [...questions]
    data[Qindex].choices[Cindex]['text'] = event.target.value
    setQuestions(data);
  }

  return (
    <>
      {questions.map((question, Qindex) => (
        <div key={question.pk}>
          {updating 
          ? <input type="text" value={question.text} onChange={(event) => handleChange(event, Qindex, -1)}></input>
          : <h2>{question.text}</h2>}
          <ol>
            {question.choices.map((choice, Cindex) => {
              return updating
                ? <input type="text" value={choice.text} onChange={(event) => handleChange(event, Qindex, Cindex)}/>
                : <li key={choice.pk}>{choice.text}</li>
            })}
          </ol>
          <button onClick={() => handleDelete(question.pk)}>DELETE</button>
          <button onClick={() => handleUpdate(Qindex)}>
            {updating ? 'SAVE' : 'UPDATE'}
          </button>
        </div>
      ))}
    </>
  );
};

export default QuestionList;
