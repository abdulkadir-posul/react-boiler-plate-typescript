import React from 'react';
import PropTypes from 'prop-types';


interface LogoProp {
  altText?: string
}

export default function Logo({ altText = 'Seven Senders' }: LogoProp) {
  return (
    <div className="logo">
      <img src={require('./logo.png')} alt={altText} />
    </div>
  );
}

Logo.propTypes = {
  altText: PropTypes.string,
};
