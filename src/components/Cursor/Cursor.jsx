import React from 'react';
import PropTypes from 'prop-types';

export default function Cursor({ color, x, y, isView }) {
  return isView ? (
    <svg
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        fill: color,
        transition: '0.1s',
        // mixBlendMode: 'difference',
      }}
      height="11pt"
      viewBox="-95 0 511 511.6402"
      width="11pt"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* eslint-disable */}
      <path d="m315.710938 292.25-288.894532-288.792969c-10.582031-8.402343-26.496094-.382812-26.496094 12.183594v394.667969c0 8.832031 7.167969 16 16 16 4.160157 0 8.148438-1.601563 10.433594-3.90625l80.039063-69.738282 65.28125 152.511719c1.109375 2.601563 3.199219 4.652344 5.824219 5.71875 1.28125.488281 2.625.746094 3.96875.746094 1.429687 0 2.859374-.300781 4.203124-.875l68.691407-29.441406c5.417969-2.300781 7.9375-8.574219 5.613281-13.992188l-63.191406-147.691406h107.136718c8.832032 0 16-7.167969 16-16 0-2.582031-.660156-6.464844-4.609374-11.390625zm0 0" />
      {/* eslint-enable  */}
    </svg>
  ) : null;
}
Cursor.propTypes = {
  color: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isView: PropTypes.bool.isRequired,
};
