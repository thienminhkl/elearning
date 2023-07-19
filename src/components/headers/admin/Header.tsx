import { AppBar, IconButton, Toolbar } from '@mui/material';
import Iconify from '~/components/iconify/Iconify';
import { Stack } from '@mui/system';
import { RootState, useSelector } from '~/redux/store';
import ProfileSetting from '~/components/profile-setting/ProfileSetting';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
//---------------------------------------------------------------------------------
interface Props {
  handleDrawerToggle: VoidFunction;
  open: boolean;
}

function Header({ handleDrawerToggle, open }: Props) {
  const navigate = useNavigate();
  const { userProfile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userProfile === null) {
      alert('Bạn chưa đăng nhập');
      navigate('/DangNhap');
    }
    if (userProfile?.maLoaiNguoiDung === 'HV') {
      navigate('/');
      alert('Người dùng không phải là Giáo viên');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <AppBar
      sx={{ backgroundColor: '#181d5b', opacity: 0.8, position: 'relative' }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ mr: 1, color: 'text.primary' }}
        >
          <Iconify
            icon={!open ? 'carbon:text-indent-less' : 'carbon:text-indent-more'}
          />
        </IconButton>

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <ProfileSetting data={userProfile} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
