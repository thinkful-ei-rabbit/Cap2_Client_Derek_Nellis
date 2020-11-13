import React from 'react';

import { LangService } from 'src/services';

export const LangContext = React.createContext<LC.LangContextValue | null>(
  null,
);

const LangProvider: LC.LangProviderProps = ({ idle, children }) => {
  const [language, setLanguage] = React.useState<LC.Lang | null>(
    null,
  );
  const [words, setWords] = React.useState<LC.Word[] | null>(null);
  const [head, setHead] = React.useState<LC.Head | null>(null);
  // const [langIdx, setLangIdx] = React.useState<number>(0);

  const getLangWords = async () => {
    const data = await LangService.getLanguage();
    const head = await LangService.getHead();

    if ('error' in data) {
      return data.error;
    } else if ('language' in data) {
      const words = data.words;
      const langs = Array.isArray(data.language)
        ? data.language[0]
        : data.language;

      setLanguage(langs);
      setWords(words);
      setHead(head);
    }
  };

  React.useEffect(() => {
    if (idle === false) {
      getLangWords();
    }
  }, [idle]);

  const value: LC.LangContextValue = {
    language,
    words,
    head,
    getLangWords,
    // selectLang(id: number) {
    //   setLangIdx(id);
    // },
    // selectedLang: language && language[langIdx],
  };

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
