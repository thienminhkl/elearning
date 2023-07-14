import { Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CYBER_TOKEN } from '~/const/const';
import { CourseList } from '~/type/course/course';
import ListCourse from '../list-course/ListCourse';

//---------------------------------------------------------------------

export default function HomeCourses() {
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
    <Stack bgcolor={'#cadefc63'}>
      <Stack m={3}>
        <ListCourse listCourse={listCourse} page={1} />
      </Stack>
    </Stack>
  );
}
