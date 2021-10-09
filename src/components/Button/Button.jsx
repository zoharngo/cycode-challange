import React from 'react';
import { Button as CoreButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function Button({ onClick = () => {}, label = '', enabled = true, ...other }) {
  return (
    <CoreButton disabled={!enabled} {...other} variant='contained' onClick={onClick}>
      <Typography variant='button' component='span'>
        {label}
      </Typography>
    </CoreButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  enabled: PropTypes.bool,
  other: PropTypes.any,
};
