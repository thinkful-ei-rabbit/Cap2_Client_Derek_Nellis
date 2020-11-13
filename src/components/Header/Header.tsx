import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

import { HeaderProps } from 'src/types/component-props';
import { TokenService } from 'src/services';
import { UserContext } from 'src/context/userContext';

const Header: HeaderProps = () => {
  const context = React.useContext(UserContext);

  const handleLogoutClick = () => {
    context && context.processLogout();
  };

  const userName = context && context.user && context.user.name;

  const renderLogoutLink = () => {
    return (
      <div>
        <span>{userName}</span>
        <nav className="header-nav">
          <Link onClick={handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  };

  const renderLoginLink = () => {
    return (
      <nav className="header-nav">
        <Link to="/login">Login</Link>{' '}
        <Link to="/register">Sign up</Link>
      </nav>
    );
  };

  return (
    <header className="main-header">
      <Link to="/">
        <h1 className="headline">SPACED REPETITION</h1>
      </Link>
      {TokenService.hasAuthToken()
        ? renderLogoutLink()
        : renderLoginLink()}
    </header>
  );
};

export default Header;
