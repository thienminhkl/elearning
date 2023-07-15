//react
import { useState } from 'react';
//@mui
import {
  Button,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
//asset
import defaultImg from '~/assets/img/default-course.png';
//type
import { Course } from '~/type/course/course';

//------------------------------------------------------------
type Props = {
  course: Course | null;
};

function CourseSearch({ course }: Props) {
  const [value, setValue] = useState<number | null>(4.5);

  return (
    <Stack>
      <Divider />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={3}>
          <img
            style={{ height: 180, width: '100%' }}
            src={course?.hinhAnh}
            alt={course?.moTa}
            onError={(e) => ((e.target as HTMLImageElement).src = defaultImg)}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="h5">{course?.tenKhoaHoc}</Typography>
          <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
            <Typography variant="h6">{course?.moTa}</Typography>
            <Stack spacing={2} sx={{ placeItems: 'flex-end' }}>
              <Stack direction={'row'} alignItems={'center'}>
                <Rating
                  precision={0.5}
                  value={value}
                  onChange={(_, newValue) => {
                    setValue(newValue);
                  }}
                />
                <Typography variant="subtitle2">{value}</Typography>
              </Stack>
              <Typography variant="subtitle2">
                ({course?.soLuongHocVien}) học viên
              </Typography>
              <Button
                variant={'contained'}
                size="medium"
                sx={{ width: 10, mt: 5 }}
                href={`/ChiTiet/${course?.maKhoaHoc}`}
              >
                Xem
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CourseSearch;
