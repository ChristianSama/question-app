import { ChangeEvent, SyntheticEvent } from "react";
import { useState } from "react";

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState<string>("");
  const [choiceFields, setChoiceFields] = useState([
    {text: ""},
  ]);

  const handleQuestionTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionText(event.target.value);
  };

  const handleChoiceInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const data = [...choiceFields]
    data[index]['text'] = event.target.value
    setChoiceFields(data);
  } 

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8000/api/questions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: questionText,
        choices: choiceFields,
      }),
    });
    let json = await res.json();
    if (res.status === 200) {
      setQuestionText("");
      setChoiceFields([]);
    }
  };

  const addChoiceField = () => {
    setChoiceFields(prev => [...prev, {text: ""}])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={questionText}
        onChange={handleQuestionTextChange}
        placeholder="Question Text"
      />

      <button onClick={addChoiceField}>Add Choice</button>

      {choiceFields.map((choice, index) => (
        <input 
          key={index}
          name="text"
          type="text"
          value={choice.text}
          onChange={(event) => handleChoiceInputChange(event, index)}
          placeholder="Choice Text"
        />
      ))}

      <input type="submit" value="SUBMIT" />
    </form>
  );
};

export default QuestionForm