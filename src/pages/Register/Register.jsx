import { useContext } from 'react';
import Box from '@mui/material/Box';
import { UserOrganizationsContext } from '../../store';
import { Button } from '../../components';

export default function Register() {
  const { setShowModal } = useContext(UserOrganizationsContext);

  return (
    <Box component='div' sx={{ width: '100%' }}>
      <Button
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        onClick={() => setShowModal(true)}
        label='Subscribe'
      />
    </Box>
  );
}
