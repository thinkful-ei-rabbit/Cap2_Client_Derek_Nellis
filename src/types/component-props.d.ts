import { History, Location } from 'history';

type AppProps = () => JSX.Element;

type FormInputProps = Partial<{
  children: React.ReactNode;
  className: string;
  htmlFor: string;
  id: string;
  name: string;
  required: boolean;
  type: string;
}>;

type FormUtilProps = (props: FormInputProps) => JSX.Element;

type GuessFormProps = (props: {
  head: LC.Head | null;
  submitGuess(ev: React.BaseSyntheticEvent): void;
}) => JSX.Element;

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?(): void;
};

type UseLang = {
  name: string;
  id: number;
};

type ChooseLangProps = () => JSX.Element;

type LoginFormProps = (props: {
  onLoginSuccess(): void;
}) => JSX.Element;

type PrivatePublicRouteProps = (props: {
  exact?: boolean;
  component: any;
  path: string;
  lang?: true;
}) => JSX.Element;

type RegistrationFormProps = (props: {
  onRegistrationSuccess(username: string, password: string): void;
}) => JSX.Element;

type ResultsProps = (props: {
  guess: { original: string; guess: string };
  results: LC.Guess | null;
  getNext(): void;
}) => JSX.Element;

type SpanishPageProps = (props: {
  onRegistrationSuccess(): void;
}) => JSX.Element;

type DashboardRouteProps = () => JSX.Element;

type LearningRouteProps = () => JSX.Element;

type LoginRouteProps = (props: {
  location: Location<{ from: string }>;
  history: History;
}) => JSX.Element;

type NotFoundRouteProps = () => JSX.Element;

type RegistrationRouteProps = (props: {
  location: Location<{ from: string }>;
  history: History;
}) => JSX.Element;

export {
  AppProps,
  FormInputProps,
  FormUtil,
  FormUtilProps,
  GuessFormProps,
  ButtonProps,
  UseLang,
  ChooseLangProps,
  HeaderProps,
  HeaderProps,
  LoginFormProps,
  PrivatePublicRouteProps,
  PublicOnlyRouteProps,
  RegistrationFormProps,
  ResultsProps,
  SpanishPageProps,
  DashboardRouteProps,
  LearningRouteProps,
  LoginRouteProps,
  NotFoundRouteProps,
  RegistrationRouteProps,
};
