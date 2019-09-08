import React from 'react';
import './ToggleButton.scss';

const ToggleButton = ({ expanded }) => (
  <span className="toggle-btn">
    {expanded ? '-' : '+'}
  </span>
);

export default ToggleButton;