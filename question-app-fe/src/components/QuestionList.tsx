import React, { useEffect, useState } from "react";

interface Choice {
  pk: number,
  text: string,
}

interface Question {
  pk: number;
  text: string;
  choices: Choice[];
}

const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/questions/")
      .then((res) => res.json())
      .then((result) => {
        setQuestions(result);
      });
  }, []);

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
        </div>
      ))}
    </>
  );
};

export default QuestionList;
