/* eslint-disable react-hooks/exhaustive-deps */
// src/App.tsx
import React, { useEffect, useState } from 'react';
import QuestionCard from './components/QuestionCard';
import ResultsPage from './components/ResultsPage';
import LoadingFullScreen from './components/LoadingFullScreen';

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
  incorrect_answers: []
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Array<Question>>([]); // Explicitly define the type
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(0);

  const fetchData = () => {
    fetch('https://opentdb.com/api.php?amount=10').then(res => {
      res.json().then(data => {
        setQuestions(data.results);
      });
    }).catch(err => {
      setTimeout(fetchData, 2000);
    })
  }

  useEffect(() => {
    return () => fetchData();
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const tryAgian = (): void => {
    setQuestions([]);
    fetchData();
    setCorrectQuestions(0);
    setIncorrectQuestions(0);
    setCurrentQuestionIndex(0);
  }

  const handleAnswerResult = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectQuestions((prev) => prev + 1);
    } else {
      setIncorrectQuestions((prev) => prev + 1);
    }
  };
  const isGameOver = currentQuestionIndex === questions?.length;
  return (
    <div>
      {questions?.length === 0 ? <LoadingFullScreen loadingText='Loading...' /> :
        isGameOver ? (
          <ResultsPage
            totalQuestions={questions?.length}
            correctQuestions={correctQuestions}
            incorrectQuestions={incorrectQuestions}
            tryAgian={tryAgian}
          />
        ) : questions && (
          <QuestionCard
            questionNo={correctQuestions + 1}
            question={questions[currentQuestionIndex]?.question || ''}
            options={[...questions[currentQuestionIndex]?.incorrect_answers, questions[currentQuestionIndex].correct_answer] || []}
            correctAnswer={questions[currentQuestionIndex]?.correct_answer || ''}
            onNext={handleNextQuestion}
            onAnswerResult={handleAnswerResult}
          />
        )}
    </div>
  );
};

export default App;
