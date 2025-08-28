import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ menuItems }) => {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
      <List>
        {menuItems.map(item => (
          <ListItem
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{ '&.active': { bgcolor: 'action.selected' } }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;