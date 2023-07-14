import { Pagination, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListCourse from '~/components/list-course/ListCourse';
import { CYBER_TOKEN } from '~/const/const';
import { Category, CourseList } from '~/type/course/course';
import { getLocal } from '~/untils/localStogate';
//---------------------------------------------------------------------------------

function CoursesCatalog() {
  const { MaDanhMuc } = useParams();
  const listCategory = getLocal('category');
  const [page, setPage] = useState<number>(1);
  const [listCourse, setListCourse] = useState<CourseList | null>([]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleGetCourse = async () => {
    try {
      const resp = await axios({
        url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${MaDanhMuc}`,
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      setListCourse(resp.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MaDanhMuc]);

  return (
    <Stack bgcolor={'#cadefc63'}>
      <Stack
        sx={{ bgcolor: '#6078f4bd' }}
        height={'10vh'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant="h2" color={'white'} px={2}>
          {listCategory
            .find((category: Category) => category.maDanhMuc === MaDanhMuc)
            .tenDanhMuc.toUpperCase()}
        </Typography>
      </Stack>
      <Stack m={3}>
        <ListCourse listCourse={listCourse} page={page} />
      </Stack>
      <Stack sx={{ placeItems: 'center' }}>
        <Pagination
          count={listCourse ? Math.ceil(listCourse?.length / 8) : 1}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Stack>
  );
}

export default CoursesCatalog;
