import React from 'react';
import PropTypes from 'prop-types';


interface IconProp {
  children: any,
  icon: string,
  onClick: any
}

export function IconButton({ children, icon, onClick = () => {} }: IconProp) {
  return (
    <button className="icon-button" onClick={onClick}>
      <i className={`fas ${icon}`} /> {children}
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
