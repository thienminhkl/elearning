import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import TableControl from '~/components/form-control/TableUserControl';
import SearchBar from '~/components/search/Searchbar';
import { handleGetListUser } from '~/redux/slices/listUserSlides';
import { dispatch } from '~/redux/store';

//----------------------------------------------------------------------

function ControlUser() {
  useEffect(() => {
    dispatch(handleGetListUser());
  }, []);

  return (
    <Stack spacing={3} p={2}>
      <Stack justifyContent={'space-between'} direction={'row'} m={3}>
        <Typography variant="h2">Quản lý Người dùng</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
        >
          Thêm người dùng
        </Button>
      </Stack>

      <SearchBar labelSearch={'Nhập vào tài khoản hoặc họ tên người dùng'} />

      <TableControl />
    </Stack>
  );
}

export default ControlUser;
