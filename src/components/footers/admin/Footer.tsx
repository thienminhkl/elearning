import { Stack } from '@mui/material';
import Copyright from '~/components/copyright/Copyright';

//---------------------------------------------------------------------------------

function Footer() {
  return (
    <Stack
      sx={{ backgroundColor: '#202cc3bd', opacity: 0.8, position: 'relative' }}
    >
      <Copyright />
    </Stack>
  );
}

export default Footer;
