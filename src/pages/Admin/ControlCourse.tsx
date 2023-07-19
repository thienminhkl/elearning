import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import TableCourseControl from '~/components/form-control/TableCourseControl';
import SearchBar from '~/components/search/Searchbar';
import { handleGetListCourse } from '~/redux/slices/courseSlides';
import { dispatch } from '~/redux/store';

//----------------------------------------------------------------------

function ControlCourse() {
  useEffect(() => {
    dispatch(handleGetListCourse());
  }, []);

  return (
    <Stack spacing={3} p={2}>
      <Stack justifyContent={'space-between'} direction={'row'} m={3}>
        <Typography variant="h2">Quản lý Khóa học</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
        >
          Thêm khóa học
        </Button>
      </Stack>

      <SearchBar labelSearch={'Nhập vào tên khóa học...'} />

      <TableCourseControl />
    </Stack>
  );
}

export default ControlCourse;
