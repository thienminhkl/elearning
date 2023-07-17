//react
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
//redux
import { logout } from '~/redux/slices/userSlides';
import { dispatch } from '~/redux/store';
//components
import CustomAvatar from '../avatar/CustomAvatar';
//------------------------------------------------------------------
type Props = {
  name: string | undefined;
};

const settings = [
  { label: 'Người dùng', nav: '/profile' },
  { label: 'Đăng xuất', nav: '/login' },
];

function ProfileSetting({ name }: Props) {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNav = (nav: string) => {
    if (nav === '/login') {
      dispatch(logout());
    }
    setAnchorElUser(null);
    navigate(nav);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <CustomAvatar
            src={name}
            alt={name}
            name={name}
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
            }}
          />{' '}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={() => handleNav(setting.nav)}>
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default ProfileSetting;
