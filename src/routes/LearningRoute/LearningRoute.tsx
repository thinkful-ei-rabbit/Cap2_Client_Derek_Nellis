import React from 'react';

import { LearningRouteProps } from 'src/types/component-props';
import { LangContext } from 'src/context/langContext';
import { LangService, TokenService } from 'src/services';
import { GuessForm, Results } from 'src/components';

const LearningRoute: LearningRouteProps = () => {
  const [guessSub, setGuessSub] = React.useState<string>('');
  const [results, setResults] = React.useState<LC.Guess | null>(null);

  const Context = React.useContext(LangContext);

  const handleSubmit = async (ev: React.BaseSyntheticEvent) => {
    ev.preventDefault();

    const target = ev.target as typeof ev.target & {
        guess: string;
      },
      { guess } = target;

    const res = await LangService.submitGuess(guess.value);

    const error =
      Context?.getLangWords && (await Context.getLangWords());

    if (error) return console.error(error);

    setGuessSub(guess.value);
    setResults(res);
  };

  const handleNext = async () => {
    Context?.getLangWords && (await Context.getLangWords());
    setGuessSub('');
    setResults(null);
  };

  return (
    <>
      <h1>{Context?.selectedLang?.name}</h1>
      {results ? (
        <Results
          guess={guessSub}
          results={results}
          head={Context?.head || null}
          getNext={handleNext}
        />
      ) : (
        <GuessForm
          head={Context?.head || null}
          submitGuess={handleSubmit}
        />
      )}
    </>
  );
};

export default LearningRoute;
