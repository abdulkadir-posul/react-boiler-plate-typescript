import React from 'react';
import PropTypes from 'prop-types';

export default function Logo({ altText = 'Seven Senders' }) {
  return (
    <div className="logo">
      <img src={require('./logo.png')} alt={altText} />
    </div>
  );
}

Logo.propTypes = {
  altText: PropTypes.string,
};
