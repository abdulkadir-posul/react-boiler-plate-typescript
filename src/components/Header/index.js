import React from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

export default function Header({ children }) {
  return (
    <header>
      <div className="container">
        <div className="left">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="right">{children}</div>
      </div>
    </header>
  );
}
