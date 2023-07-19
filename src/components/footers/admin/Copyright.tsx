import { Link, Typography } from '@mui/material';
//---------------------------------------------------------------------

function Copyright(props: any) {
  return (
    <Typography variant="h6" color="text.secondary" align="center" {...props}>
      {'copyright © '}
      <Link color="inherit" href="#">
        Elearning
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
