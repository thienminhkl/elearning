// @mui
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
//redux
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
// hooks
import useResponsive from '~/hooks/useResponsive';
// components
import Category from '~/components/category/Category';
import ProfileSetting from '~/components/profile-setting/ProfileSetting';
import SearchBar from '~/components/search/Searchbar';
// ----------------------------------------------------------------------

export default function Header() {
  const isDesktop = useResponsive('up', 'md');
  const { isLoggedIn, userProfile } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <AppBar
      sx={{ backgroundColor: '#181d5b', opacity: 0.8, position: 'relative' }}
    >
      <Toolbar sx={{ height: 1, placeContent: 'space-around' }}>
        <>
          {isDesktop && (
            <Stack direction={'row'} alignItems="center">
              <IconButton href="/" sx={{ color: 'white' }}>
                <LocalLibraryRoundedIcon sx={{ fontSize: '2rem' }} />
                <Typography variant="h4" sx={{ mr: 2.5, ml: 0.5 }}>
                  Elearning
                </Typography>
              </IconButton>
            </Stack>
          )}

          {!isDesktop && (
            <IconButton href="/" sx={{ color: 'white' }}>
              <LocalLibraryRoundedIcon sx={{ mr: 1.5 }} />
            </IconButton>
          )}
          <Category />
          <SearchBar labelSearch={'Tìm kiếm khóa học...'} />
          {!isLoggedIn ? (
            <IconButton href="/DangNhap">
              <LoginRoundedIcon />
            </IconButton>
          ) : (
            <ProfileSetting data={userProfile} />
          )}
        </>
      </Toolbar>
    </AppBar>
  );
}
