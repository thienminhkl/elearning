import {
  AutoStories as AutoStoriesIcon,
  LocalLibraryRounded as LocalLibraryRoundedIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { RouteType } from '~/type/drawer/nav';

const drawerWidth = 240;

interface Props {
  handleDrawerToggle: VoidFunction;
  open: boolean;
}

const navItem: RouteType[] = [
  {
    path: '/admin/QuanLyNguoiDung',
    displayText: 'Quản lý Người dùng',
    icon: <ManageAccountsIcon />,
  },
  {
    path: '/admin/QuanLyKhoaHoc',
    displayText: 'Quản lý Khóa học',
    icon: <AutoStoriesIcon />,
  },
];
open;
export default function ResponsiveDrawer({ handleDrawerToggle, open }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Stack direction={'row'} justifyContent="center" width={'100%'}>
            <IconButton href="/">
              <LocalLibraryRoundedIcon sx={{ fontSize: '2rem' }} />
              <Typography variant="h4" sx={{ mr: 2.5, ml: 0.5 }}>
                Elearning
              </Typography>
            </IconButton>
          </Stack>
          <Divider />
          <List>
            {navItem.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton href={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.displayText} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
}
