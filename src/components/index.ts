/*
|--------------------------------------------------------------
| BARREL EXPORT FILE
|--------------------------------------------------------------
| How-To barrel-export components:
| export { default as Comp1 } from './comp1/comp1'
|
| Why? Readability and (to an extent) testing:
| import { Comp1, Comp2, Comp3, Comp4 } from 'src/components'
| import { Route1, Route2, Route3, Route4 } from 'src/routes'
*/
export {
  Label,
  Input,
  Required,
  Textarea,
} from './FormUtils/FormUtils';
export { default as Button } from './Button/Button';
export { default as Header } from './Header/Header';
export { default as LoginForm } from './LoginForm/LoginForm';
export { default as PrivateRoute } from './PrivateRoute/PrivateRoute';
export { default as PublicOnlyRoute } from './PublicOnlyRoute/PublicOnlyRoute';
export { default as RegistrationForm } from './RegistrationForm/RegistrationForm';
export { default as ChooseLang } from './chooseLang/chooseLang'
export { default as SpanishPage } from './spanishPage/spanishPage'
export { default as GuessForm } from './guessForm/guessForm'
export { default as Results } from './results/results'
