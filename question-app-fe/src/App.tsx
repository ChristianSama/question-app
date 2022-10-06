import React from 'react';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';

function App() {
  return (
    <>
      <h1>Super Quiz app</h1>
      <QuestionList />
      <QuestionForm />
    </>
  );
}

export default App;
