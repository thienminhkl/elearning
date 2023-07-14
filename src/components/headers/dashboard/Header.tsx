// @mui
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
// hooks
import useResponsive from '~/hooks/useResponsive';
//react
import { useState } from 'react';
// components
import Category from '~/components/category/Category';
import ProfileSetting from '~/components/profile-setting/ProfileSetting';
import SearchBar from '~/components/search/Searchbar';

// ----------------------------------------------------------------------

export default function Header() {
  const isDesktop = useResponsive('up', 'md');
  const isLogin = useState(false);

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
