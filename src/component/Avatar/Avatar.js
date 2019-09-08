import React from 'react';
import './Avatar.scss';

const Avatar = ({ name }) => (
  <span className="avatar">
    { name.charAt(0).toUpperCase() }
  </span>
);

export default Avatar;