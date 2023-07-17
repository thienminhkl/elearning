//@mui
import { Box, Card, Container, Tab, Tabs } from '@mui/material';
//react
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//components
import Iconify from '~/components/iconify/Iconify';
import ProfileCourses from '~/components/profile/ProfileCourses';
import ProfileCover from '~/components/profile/ProfileCover';
import ProfileUser from '~/components/profile/ProfileUser';
//redux
import { RootState } from '~/redux/store';
//assets
import cover from '~/assets/img/profile-cover.jpg';
//---------------------------------------------------------------------

function Profile() {
  const navigate = useNavigate();

  const { userProfile, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const [currentTab, setCurrentTab] = useState('profile');
  const TABS = [
    {
      value: 'profile',
      label: 'Thông tin Cá nhân',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <ProfileUser profile={userProfile} />,
    },
    {
      value: 'course',
      label: 'Thông tin khóa học',
      icon: <Iconify icon="bi:book" />,
      component: <ProfileCourses profile={userProfile} />,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      style={{ padding: 0, backgroundColor: '#cadefc63' }}
    >
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: 'relative',
        }}
      >
        <ProfileCover
          name={userProfile?.hoTen}
          role={userProfile?.maLoaiNguoiDung}
          cover={cover}
        />

        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            '& .MuiTabs-flexContainer': {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Card>

      {TABS.map(
        (tab) =>
          tab.value === currentTab && (
            <Box sx={{ p: 3 }} key={tab.value}>
              {tab.component}
            </Box>
          )
      )}
    </Container>
  );
}

export default Profile;
