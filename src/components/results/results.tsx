import React from 'react';

import './results.scss';

import { ResultsProps } from 'src/types/component-props';
import { Button } from 'src/components';

const Results: ResultsProps = ({ guess, results, getNext }) => {
  const firstInput = React.createRef<HTMLButtonElement>();

  return (
    <>
      <div className="DisplayScore">
        <p>Your total score is: {results?.totalScore}</p>
        <h2>
          {results?.isCorrect
            ? 'You were correct! :D'
            : 'Good try, but not quite right :('}
        </h2>
      </div>
      <div className="DisplayFeedback">
        <p>
          The correct translation for{' '}
          <strong>{guess.original}</strong> was{' '}
          <strong>{results?.answer}</strong> and you chose{' '}
          <strong>{guess.guess}</strong>!
        </p>
      </div>
      <Button ref={firstInput} onClick={() => getNext()}>
        Try another word!
      </Button>
    </>
  );
};

export default Results;
