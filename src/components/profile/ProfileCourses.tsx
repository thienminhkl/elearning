import axios from 'axios';
//@mui
import { Pagination, Stack, Typography } from '@mui/material';
//react
import { useEffect, useState } from 'react';
//const
import { CYBER_TOKEN } from '~/const/const';
import { UserProfile } from '~/type/user/user';
//type
import { CourseDetail, CourseList } from '~/type/course/course';
//components
import CourseSearch from '../course-item/CourseSearch';
//--------------------------------------------------------------------------------------------
type Props = {
  profile: UserProfile | null;
};

function ProfileCourses({ profile }: Props) {
  const [page, setPage] = useState(1);
  const [listCourses, setListCourses] = useState<CourseList>([]);
  const [listCourse, setListCourse] = useState<CourseDetail[]>([]);

  const handleGetCourses = async () => {
    try {
      const resp = await axios({
        url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc`,
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      setListCourses(resp.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCourses();
  }, []);

  useEffect(() => {
    setListCourse(profile?.chiTietKhoaHocGhiDanh || []);
  }, [profile]);

  const test = listCourses.filter(function (obj1) {
    return (
      listCourse.map((obj2) => obj2.maKhoaHoc).indexOf(obj1.maKhoaHoc) !== -1
    );
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack
      sx={{
        backgroundColor: 'white',
        borderRadius: 5,
        opacity: 0.85,
        padding: 2,
      }}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={3}
    >
      <Typography variant="h3">Các khóa học tham gia</Typography>
      {test?.slice((page - 1) * 3, (page - 1) * 3 + 3).map((course) => (
        <CourseSearch
          unregistration
          profile={profile}
          course={course}
          key={course?.maKhoaHoc}
        />
      ))}
      <Stack sx={{ placeItems: 'center' }}>
        <Pagination
          count={listCourse ? Math.ceil(listCourse?.length / 3) : 1}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Stack>
  );
}

export default ProfileCourses;
