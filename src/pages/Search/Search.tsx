//axios
import axios from 'axios';
//react
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//@mui
import { Pagination, Stack, Typography } from '@mui/material';
//component
import CourseSearch from '~/components/course-item/CourseSearch';
//const
import { CYBER_TOKEN } from '~/const/const';
//type
import { Course, CourseList } from '~/type/course/course';

//-------------------------------------------------
export default function Search() {
  const { TenKhoaHoc } = useParams();
  const [page, setPage] = useState(1);
  const [err, setErr] = useState<boolean>(false);
  const [listCourse, setListCourse] = useState<CourseList>([]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleGetCourses = async () => {
    try {
      const resp = await axios({
        url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${TenKhoaHoc}`,
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      setListCourse(resp.data);
      setErr(false);
    } catch (error: any) {
      console.error(error);
      setErr(true);
    }
  };

  useEffect(() => {
    if (TenKhoaHoc) {
      handleGetCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TenKhoaHoc]);

  return (
    <>
      {err ? (
        <Stack minHeight={300} padding={3}>
          <Typography variant="h3">
            Không tìm thấy khóa học nào trùng với: {TenKhoaHoc}
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2} p={5} minHeight={300}>
          <Typography variant="h3">
            Tìm thấy {listCourse?.length} khóa học: {TenKhoaHoc}
          </Typography>
          {listCourse
            ?.slice((page - 1) * 5, (page - 1) * 5 + 5)
            .map((course: Course) => (
              <CourseSearch course={course} key={course?.maKhoaHoc} />
            ))}
          <Stack sx={{ placeItems: 'center' }}>
            <Pagination
              count={listCourse ? Math.ceil(listCourse?.length / 5) : 1}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
}
