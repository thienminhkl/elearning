// @mui
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// @types
import { IUserProfileCover } from '~/type/avatar/avatar';
// components
import CustomAvatar from '../avatar/CustomAvatar';

// ----------------------------------------------------------------------

const StyledInfo = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function ProfileCover({ name, role, cover }: IUserProfileCover) {
  return (
    <>
      <StyledInfo>
        <CustomAvatar
          src={name}
          alt={name}
          name={name}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            mb: 1,
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{name}</Typography>

          <Typography sx={{ opacity: 0.72 }}>
            {role === 'HV' ? 'Học viên' : 'Giáo viên'}
          </Typography>
        </Box>
      </StyledInfo>
      <img
        alt="cover"
        src={cover}
        style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute' }}
      />
    </>
  );
}
