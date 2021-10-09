import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel/TabPanel';
import { Home, Register } from '../../pages';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

function a11yProps(index) {
  return {
    key: `tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsContainer() {
  const routeMatch = useRouteMatch(['/register', '/']);
  const currentTab = routeMatch?.path;
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} aria-label='tab-nav-bar'>
          <Tab label='Home' {...a11yProps(0)} value='/' to='/' component={Link} />
          <Tab label='Register' {...a11yProps(1)} value='/register' to='/register' component={Link} />
        </Tabs>
      </Box>
      <Switch>
        <Route exact path='/'>
          <TabPanel index={0}>
            <Home />
          </TabPanel>
        </Route>
        <Route exact path='/register'>
          <TabPanel index={1}>
            <Register />
          </TabPanel>
        </Route>
      </Switch>
    </Box>
  );
}
