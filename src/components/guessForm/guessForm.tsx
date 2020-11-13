import React from 'react';

import './guessForm.scss';

import { GuessFormProps } from 'src/types/component-props';
import { Label, Input, Button } from 'src/components';

const GuessForm: GuessFormProps = ({ head, submitGuess }) => {
  const firstInput = React.createRef<HTMLInputElement>();

  return (
    <div className="guess-form-container">
      <h2>Translate the word:</h2>
      <span className="next-word">{head?.nextWord}</span>
      <p>Your total score is: {head?.totalScore}</p>
      <p>
        You have answered this word correctly {head?.wordCorrectCount}{' '}
        times.
      </p>
      <p>
        You have answered this word incorrectly{' '}
        {head?.wordIncorrectCount} times.
      </p>
      <form className="guess-form" onSubmit={(ev) => submitGuess(ev)}>
        <Label htmlFor="learn-guess-input">
          What&apos;s the translation for this word?
        </Label>
        <Input
          ref={firstInput}
          id="learn-guess-input"
          type="text"
          name="guess"
          required
        />
        <Button type="submit">Submit your answer</Button>
      </form>
    </div>
  );
};

export default GuessForm;
