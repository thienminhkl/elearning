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
//redux
import { dispatch } from '~/redux/store';
import { handleUnregistrationCourse } from '~/redux/slices/userSlides';
//asset
import defaultImg from '~/assets/img/default-course.png';
//type
import { Course } from '~/type/course/course';
import { UserProfile } from '~/type/user/user';

//------------------------------------------------------------
type Props = {
  course: Course | null;
  unregistration?: boolean;
  profile?: UserProfile | null;
};

function CourseSearch({ course, unregistration, profile }: Props) {
  const [value, setValue] = useState<number | null>(4.5);

  const handleUnregis = async () => {
    dispatch(handleUnregistrationCourse(profile, course?.maKhoaHoc));
  };

  return (
    <Stack width={'100%'}>
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
          <Typography variant="h4">{course?.tenKhoaHoc}</Typography>
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
              {unregistration ? (
                <Button
                  onClick={handleUnregis}
                  variant={'contained'}
                  size="medium"
                  sx={{ width: 10, mt: 5 }}
                >
                  Hủy
                </Button>
              ) : (
                <Button
                  variant={'contained'}
                  size="medium"
                  sx={{ width: 10, mt: 5 }}
                  href={`/ChiTiet/${course?.maKhoaHoc}`}
                >
                  Xem
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CourseSearch;
