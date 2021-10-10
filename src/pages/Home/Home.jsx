import React, { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Button } from '../../components';
import { useHistory } from 'react-router-dom';
import { UserOrganizationsContext } from '../../store';

export default function Home() {
  const history = useHistory();
  const { userOrganizations, selectedUsers, selectedOrganization } = useContext(UserOrganizationsContext);

  const selectedUsersObjects = useMemo(() => {
    return userOrganizations.users.filter((user) => selectedUsers.includes(user.id));
  }, [userOrganizations, selectedUsers]);

  const selectedOrganizationObject = useMemo(() => {
    return userOrganizations.organizations.find((org) => org.id === selectedOrganization);
  }, [userOrganizations.organizations, selectedOrganization]);

  return (
    <>
      <Box component='header'>
        {!!selectedOrganization ? (
          <Typography variant='h2' component='h2' gutterBottom>
            Selected organization {selectedOrganizationObject.name}
          </Typography>
        ) : (
          <Typography variant='h2' component='h2' gutterBottom>
            Wellcome Page
          </Typography>
        )}
        {selectedUsers.length > 0 ? (
          <List>
            {selectedUsersObjects.map((user, index) => {
              return (
                <ListItem key={index}>
                  <ListItemText>
                    <Typography variant='subtitle1'>
                      {`${user.firstName} ${user.lastName} `}
                      <strong>Subscribed!</strong>
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant='p' component='p' gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sunt sequi deserunt distinctio reiciendis!
            Repudiandae necessitatibus veniam ad pariatur autem.
          </Typography>
        )}
      </Box>
      <Box component='main'>
        <Button onClick={() => history.push('/register')} label='Register' />
      </Box>
    </>
  );
}
