import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Gridlayout = (props) => {
  const { children } = props;

  return (
    <Grid container spacing={2}>
      {React.Children.map(children, (child) => {
        return (
          <Grid item xs={12} md>
            <Item>{child}</Item>
          </Grid>
        );
      })}
    </Grid>
  );
};

Gridlayout.propTypes = {
  children: PropTypes.node,
};
export default Gridlayout;
