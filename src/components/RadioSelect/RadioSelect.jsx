import React, { useState, useCallback, useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { ClickAwayListener, Radio } from '@mui/material';
import { CustomTextField } from '..';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledList = styled(List)(({ theme }) => ({
  ...theme.typography.body2,
  height: '145px',
  overflowY: 'scroll',
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
}));

export default function RadioSelect({
  items = [],
  displayFields = [],
  onSelect = () => {},
  selectd = '',
  key = 'id',
  label = '',
}) {
  const [selectedValue, setSelectedValue] = useState(selectd);
  const [open, toggleOpen] = useState(false);
  const [elements, setElements] = useState(items);

  const handleChange = (value) => () => {
    setSelectedValue(value);
    onSelect(value);
    toggleOpen(false);
  };

  const selectedValueName = useMemo(() => {
    let displayText = '';
    const selectedElement = items.find((elem) => elem.id === selectedValue);
    if (selectedElement) {
      displayFields.forEach((field) => {
        displayText += selectedElement[field] + ' ';
      });
    }
    if (Boolean(displayText)) {
      return `${displayText} selected`;
    }
    return 'select organization:';
  }, [displayFields, items, selectedValue]);

  const onTextFieldChange = useCallback(
    (e) => {
      toggleOpen(true);
      setElements(
        items.filter((item) => {
          let displayText = '';
          displayFields.forEach((field) => {
            displayText += item[field] + ' ';
          });
          return displayText.toLowerCase().startsWith(e.target?.value.toLowerCase());
        })
      );
    },
    [displayFields, items]
  );
  console.log(selectedValueName);
  return (
    <ClickAwayListener onClickAway={() => toggleOpen(false)}>
      <Box>
        <CustomTextField
          label2={label}
          label={selectedValueName}
          name='org-search-bar'
          open={open}
          onClickAway={() => toggleOpen(false)}
          onArrowDropClick={() => toggleOpen((prev) => !prev)}
          onChange={onTextFieldChange}
        />
        <StyledList
          id='org-radio-list'
          sx={{
            display: `${open ? 'inline-block' : 'none'}`,
          }}
        >
          {elements.map((item, index) => {
            const labelId = `radio-list-label-${item[key]}`;
            let displayText = '';
            displayFields.forEach((field) => {
              displayText += item[field] + ' ';
            });
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton role={undefined} onClick={handleChange(item[key])} dense>
                  <ListItemIcon>
                    <Radio
                      checked={selectedValue === item[key]}
                      onChange={handleChange}
                      value={item[key]}
                      name='radio-buttons'
                      inputProps={{
                        'aria-label': displayText,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={displayText} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </StyledList>
      </Box>
    </ClickAwayListener>
  );
}

RadioSelect.propTypes = {
  items: PropTypes.array.isRequired,
  selectd: PropTypes.string.isRequired,
  displayFields: PropTypes.array.isRequired,
  label: PropTypes.string,
  key: PropTypes.string,
  onSelect: PropTypes.func,
};
