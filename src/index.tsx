import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'unfetch/polyfill';

//? import layout: modules(\n\n) styles(\n\n) locals(\n\n)
import './styles/global-styles.scss';
import './setup-icons';

//? paths: './' when able, if not use alias 'src/...'
import UserProvider from './context/userContext';
import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

/*
* Component types:

? Don't use React.FC, instead: children?: React.ReactNode
? Component types naming convention: 'CompName' + 'Props'
? All comps should be typed as follows:

!  type CompProps = (props: {
!    prop1: string;
!    children?: React.ReactNode
!  }) => JSX.Element (relevent return type)
!
!  const Comp: CompProps = ({prop1, children}) => {}

* File/Directory Structure

? index, config, and setupTests are only files in src/

? app/ should only contain the 'App' component

? routes/ should only contain route entry-points, rendering child components
  * routes/utils/ for Private/PublicOnly and/or PageNotFound components

? services/ are anything server-related, aka async fetches/data processing

? optional:
  * constants/ for endpoints, schemas, etc - mainly to prevent typos
  * hooks/ for custom hooks
  * context/ specifically for useContext hooks/providers
  * helpers/ any off-loaded logic functions

? components/ basically everything else
  ! all files should use camel-case!
  * all components should be withing their own folder containing:
    * compName.js
    * compName.test.js
    * compName.scss
  * all component exports should be 'default' and piped into a barrel (index.js)
  * component construction convention:
    ! const CompName = ({ prop1, prop2 }) => {}
    ! export default CompName

  ! Barrels: if you have < 3 or 4 files, don't use one! (...or do 🤷‍♂️)
    > for more info on how they work, just ask!
    > TL;DR Node reads index.js by default when pointed at a folder
*/
