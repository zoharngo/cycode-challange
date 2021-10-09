import { Paper } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function PageWrapper(props) {
  const { children } = props;

  return <Paper  elevation={3}>{children}</Paper>;
}

PageWrapper.propTypes = {
  children: PropTypes.node,
};
