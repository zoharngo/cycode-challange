import { createContext } from 'react';

const UserOrganizationsContext = createContext({
  userOrganizations: {
    users: [],
    organizations: [],
  },
  showModal: false,
  selectedUsers: [],
  selectedOrganization: '',
  pushUserToSelectedList: () => {},
  setShowModal: () => {},
});

export default UserOrganizationsContext;
