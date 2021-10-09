import { useContext } from 'react';
import Box from '@mui/material/Box';
import { default as CoreModal } from '@mui/material/Modal';
import { UserOrganizationsContext } from '../../store';
import PropTypes from 'prop-types';
import { Slide } from '@mui/material';

const style = {
  position: 'relative',
  top: '25%',
  left: '25%',
  maxWidth: '50%',
  minHeight: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Modal(props) {
  const { children, containerRef, ...other } = props;

  const { showModal, setShowModal } = useContext(UserOrganizationsContext);

  return (
    <CoreModal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      {...other}
    >
      <Slide container={containerRef} direction='up' in={showModal} mountOnEnter unmountOnExit>
        <Box sx={style}>{children}</Box>
      </Slide>
    </CoreModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  containerRef: PropTypes.object,
  other: PropTypes.any,
};
