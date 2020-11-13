/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace UC {
  type User = { id: number; name: string; username: string };

  type UserState = {
    user: User | null;
    error: string | null;
    idle: boolean;
  };

  type UserContextValue = {
    user: User | null;
    error: string | null;
    idle: boolean;
    setError(error: string): void;
    clearError(): void;
    setUser(user: User | null): void;
    processLogin(authToken: string): void;
    processLogout(): void;
  };

  type UserProviderProps = (props: {
    children: React.ReactNode;
  }) => JSX.Element;
}

declare namespace LC {
  type Lang = {
    id: number;
    name: string;
    user_id: number;
    head: number;
    total_score: number;
  };

  type Word = {
    id: number;
    language_id: number;
    original: string;
    translation: string;
    next: number | null;
    memory_value: number;
    correct_count: number;
    incorrect_count: number;
  };

  type Res =
    | { language: LC.Lang | LC.Lang[]; words: LC.Word[] }
    | { error: string };

  type GetLangWords = (id: number) => Promise<Res>;

  type SetLangWords = (data: {
    language: Lang;
    words: Word[];
  }) => void;

  type Head = {
    currentWord: string;
    nextWord: string;
    wordCorrectCount: number;
    wordIncorrectCount: number;
    totalScore: number;
  };

  type Guess = {
    nextWord: string;
    wordCorrectCount: number;
    wordIncorrectCount: number;
    totalScore: number;
    answer: string;
    isCorrect: boolean;
  };

  type LangContextValue = {
    language: Lang | null;
    words: Word[] | null;
    head: Head | null;
    getLangWords(): Promise<string | undefined>;
    selectLang(id: number): void;
    selectedLang?: Lang | null;
  };

  type LangProviderProps = (props: {
    idle?: boolean;
    children: React.ReactNode;
  }) => JSX.Element;
}
