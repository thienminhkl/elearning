// @mui
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
// hooks
import useResponsive from '~/hooks/useResponsive';
//react
import { useState } from 'react';
// components
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Category from '~/components/category/Category';
import SearchBar from '~/components/search/Searchbar';
import ProfileSetting from '~/components/profile-setting/ProfileSetting';

// ----------------------------------------------------------------------

export default function Header() {
  const isDesktop = useResponsive('up', 'md');
  const isLogin = useState(false);

  return (
    <AppBar
      sx={{ backgroundColor: '#7ba6a6', opacity: 0.8, position: 'relative' }}
    >
      <Toolbar sx={{ height: 1, placeContent: 'space-around' }}>
        <>
          {isDesktop && (
            <Stack direction={'row'} alignItems="center">
              <LocalLibraryRoundedIcon sx={{ fontSize: '2rem' }} />
              <Typography variant="h4" sx={{ mr: 2.5, ml: 0.5 }}>
                Elearning
              </Typography>
            </Stack>
          )}

          {!isDesktop && <LocalLibraryRoundedIcon sx={{ mr: 1.5 }} />}
          <Category />
          <SearchBar />
          {isLogin ? (
            <IconButton>
              <LoginRoundedIcon />
            </IconButton>
          ) : (
            <ProfileSetting />
          )}
        </>
      </Toolbar>
    </AppBar>
  );
}
