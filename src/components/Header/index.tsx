import React from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

interface HeaderProp {
  children: any
}

export default function Header({ children }: HeaderProp) {
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
