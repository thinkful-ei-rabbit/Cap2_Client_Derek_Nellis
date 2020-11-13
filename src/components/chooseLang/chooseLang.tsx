import React from 'react';

import './chooseLang.scss';

import { ChooseLangProps } from 'src/types/component-props.d';
import { LangContext } from 'src/context/langContext';

const ChooseLang: ChooseLangProps = () => {
  const Context = React.useContext(LangContext);
  const language = Context && Context.language;
  const words = Context && Context.words;

  const firstInput = React.createRef<HTMLAnchorElement>();

  return (
    <section className="choose-lang-container">
      <h2>{language?.name}</h2>
      <p>Total correct answers: {language?.total_score}</p>
      <a ref={firstInput} href="/learn">
        Start practicing
      </a>
      <h3>Words to practice</h3>
      <ul className="lang-words-list">
        {words?.map((word) => (
          <li key={word.id}>
            <h4>{word.original}</h4>
            <p>correct answer count: {word.correct_count}</p>
            <p>incorrect answer count: {word.incorrect_count}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChooseLang;
