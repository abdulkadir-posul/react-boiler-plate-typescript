import React from 'react';
import PropTypes from 'prop-types';

export function IconButton({ children, icon, onClick = () => {} }) {
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
