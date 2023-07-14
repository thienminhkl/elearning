//@mui
import { Box, Stack, Typography } from '@mui/material';
//type
import { Course, CourseList } from '~/type/course/course';
//component
import CourseItem from '../course-item/CourseItem';
//--------------------------------------------------------------

type Props = {
  listCourse: CourseList | null;
  page: number | 1;
};

function ListCourse({ listCourse, page }: Props) {
  return (
    <Stack>
      <Typography variant="h4" sx={{ my: 2 }}>
        Các khóa học mới nhất
      </Typography>
      <Box
        gap={4}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
        {listCourse
          ?.slice((page - 1) * 8, (page - 1) * 8 + 8)
          .map((course: Course) => (
            <CourseItem course={course} key={course?.maKhoaHoc} />
          ))}
      </Box>
    </Stack>
  );
}

export default ListCourse;
