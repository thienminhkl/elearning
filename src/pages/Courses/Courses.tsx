import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CourseItem from '~/components/course-item/CourseItem';
import { CYBER_TOKEN } from '~/const/const';
import { Course, CourseList } from '~/type/course/course';
import './Courses.scss';

//---------------------------------------------------------------------

export default function Courses() {
  const [listCourse, setListCourse] = useState<CourseList | null>([]);

  const handleGetCourse = async () => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=1&pageSize=8&MaNhom=GP01',
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });

      setListCourse(resp.data.items);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCourse();
  }, []);

  return (
    <Stack m={3}>
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
        {listCourse?.map((course: Course) => (
          <CourseItem course={course} key={course?.maKhoaHoc} />
        ))}
      </Box>
    </Stack>
  );
}
