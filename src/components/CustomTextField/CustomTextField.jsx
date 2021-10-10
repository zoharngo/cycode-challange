import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { InputLabel, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CustomTextField = ({ name, label, label2, onChange, onArrowDropClick, open }) => {
  const [_open, toggleOpen] = useState(false);

  useEffect(() => {
    toggleOpen(open);
  }, [open]);

  return (
    <React.Fragment>
      <InputLabel htmlFor={name}>
        <Typography component='label' variant='caption'>{label}</Typography>
      </InputLabel>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment
              onClick={() => {
                toggleOpen((prev) => !prev);
                onArrowDropClick();
              }}
              sx={{ cursor: 'pointer' }}
              position='end'
            >
              {!_open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ m: 1, minWidth: '90%' }}
        label={label2}
        name={name}
        size='small'
        onChange={onChange}
      />
    </React.Fragment>
  );
};
CustomTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  label2: PropTypes.string,
  onChange: PropTypes.func,
  onArrowDropClick: PropTypes.func,
  open: PropTypes.bool,
};
CustomTextField.defaultProps = {
  onChange: () => {},
  onArrowDropClick: () => {},
  open: false,
};

export default CustomTextField;
