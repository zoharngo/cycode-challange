import React, { useState, useCallback, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import { CustomTextField } from '..';
import { Box } from '@mui/system';
import { ClickAwayListener } from '@mui/material';

export default function MultipleSelect({
  items = [],
  selectd = [],
  displayFields = [],
  onSelect = () => {},
  key = 'id',
  label = '',
}) {
  const [checked, setChecked] = useState(selectd);
  const [elements, setElements] = useState(items);
  const [open, toggleOpen] = useState(false);

  useEffect(() => {
    setElements(items);
  }, [items]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    onSelect(newChecked);
    toggleOpen(true);
  };

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
  function renderRow(props) {
    const { index, style } = props;
    const item = elements[index];
    const labelId = `checkbox-list-label-${item[key]}`;
    let displayText = '';
    displayFields.forEach((field) => {
      displayText += item[field] + ' ';
    });
    return (
      <ListItem style={style} key={index} disablePadding>
        <ListItemButton role={undefined} onClick={handleToggle(item[key])} dense>
          <ListItemIcon>
            <Checkbox
              edge='start'
              checked={checked.indexOf(item[key]) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={displayText} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ClickAwayListener onClickAway={() => toggleOpen(false)}>
      <Box>
        <CustomTextField
          label2={label}
          label={`${checked.length} selected`}
          name='user-search-bar'
          open={open}
          onArrowDropClick={() => toggleOpen((prev) => !prev)}
          onChange={onTextFieldChange}
        />
        <FixedSizeList height={open ? 145 : 0} width='100%' itemSize={46} itemCount={elements.length} overscanCount={5}>
          {renderRow}
        </FixedSizeList>
      </Box>
    </ClickAwayListener>
  );
}

MultipleSelect.propTypes = {
  items: PropTypes.array.isRequired,
  selectd: PropTypes.array.isRequired,
  displayFields: PropTypes.array.isRequired,
  label: PropTypes.string,
  key: PropTypes.string,
  onSelect: PropTypes.func,
};
