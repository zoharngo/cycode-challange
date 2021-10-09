import { useState, useMemo, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, GridLayout, Modal, MultipleSelect, RadioSelect, Tabs } from './components';
import userOrganizationsData from './userOrg.json';
import { UserOrganizationsContext } from './store';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [userOrganizations] = useState(userOrganizationsData);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, updateSelectedUsers] = useLocalStorage('selectedUsers', []);
  const [selectedOrganization, updateSelectedOrganization] = useLocalStorage('selectedOrganization', '');
  const containerRef = useRef(null);
  const history = useHistory();

  const selectedOrganizationUsers = useMemo(() => {
    const selectedOrganizationUsers = userOrganizations.users.filter((user) => {
      return user.organizationId === selectedOrganization;
    });

    return selectedOrganizationUsers.length > 0 ? selectedOrganizationUsers : userOrganizations.users;
  }, [selectedOrganization, userOrganizations.users]);

  const submitEnabled = useMemo(() => {
    return !!selectedOrganization && selectedUsers.length > 0;
  }, [selectedOrganization, selectedUsers.length]);

  const onSubmit = () => {
    history.replace('/');
    setShowModal(false);
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh' }} ref={containerRef}>
      <CssBaseline />
      <UserOrganizationsContext.Provider
        value={{
          userOrganizations,
          selectedUsers,
          selectedOrganization,
          showModal,
          setShowModal,
        }}
      >
        <Tabs />
        <Modal container={containerRef.current}>
          <GridLayout>
            <RadioSelect
              label='Organization'
              displayFields={['name']}
              onSelect={updateSelectedOrganization}
              items={userOrganizations.organizations}
              selectd={selectedOrganization}
            />
            <MultipleSelect
              label='Users'
              displayFields={['firstName', 'lastName']}
              onSelect={updateSelectedUsers}
              items={selectedOrganizationUsers}
              selectd={selectedUsers}
            />
          </GridLayout>
          <Button onClick={onSubmit} enabled={submitEnabled} sx={{ position: 'absolute', bottom: 15 }} label='Submit' />
        </Modal>
      </UserOrganizationsContext.Provider>
    </Box>
  );
}
