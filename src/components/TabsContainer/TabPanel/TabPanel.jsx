import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

export default function TabPanel(props) {
  const { children, index, ...other } = props;

  return (
    <Box component='div' role='tabpanel' id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      <Box sx={{ minHeight: '100%', p: 3 }}>{children} </Box>
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  other: PropTypes.any,
};
