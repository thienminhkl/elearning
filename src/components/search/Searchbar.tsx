import { Autocomplete, InputAdornment, InputBase } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CYBER_TOKEN } from '~/const/const';
import Iconify from '../iconify/Iconify';
import { Search } from './Seachbar';
import { Course, CourseList } from '~/type/course/course';

export default function SearchBar() {
  const [listCourse, setListCourse] = useState<CourseList>([]);
  const [courseSel, setCourseSel] = useState<Course | null>();

  const handleGetCourseNameList = async () => {
    try {
      const resp = await axios({
        url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`,
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      setListCourse(
        resp.data.sort(
          (a: any, b: any) => -b.tenKhoaHoc.localeCompare(a.tenKhoaHoc)
        )
      );
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    handleGetCourseNameList();
  }, []);

  const handleCourseSel = (newInputValue: Course | null) => {
    setCourseSel(newInputValue);
  };

  return (
    <Box sx={{ flexGrow: 0.8, mx: 3 }}>
      <Search>
        <Autocomplete
          options={listCourse}
          getOptionLabel={(option: Course) => `${option.tenKhoaHoc}`}
          isOptionEqualToValue={(option, value) =>
            option.maKhoaHoc === value.maKhoaHoc
          }
          onChange={(_, newInputValue: Course | null) => {
            handleCourseSel(newInputValue);
          }}
          renderInput={(params: any) => (
            <InputBase
              {...params.InputProps}
              inputProps={params.inputProps}
              fullWidth
              placeholder="Tìm kiếm khóa học..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{
                      color: 'text.disabled',
                      ml: 0.5,
                    }}
                  />
                </InputAdornment>
              }
              sx={{ typography: 'h6', justifyContent: 'center' }}
            />
          )}
        />
      </Search>
    </Box>
  );
}
