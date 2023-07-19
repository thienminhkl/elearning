import { Dispatch, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCESS_TOKEN, CYBER_TOKEN, LIST_COURSE } from '~/const/const';
import { CourseList } from '~/type/course/course';
import { getLocal, setLocal } from '~/untils/localStogate';

//------------------------------------------------------
interface CoursesList{
  listCourses: CourseList,
};

const listCourse = getLocal(LIST_COURSE);

const initialState: CoursesList = {
  listCourses: listCourse,
};

const slice = createSlice({
  name: 'listCourse',
  initialState,
  reducers: {
   setListCourse(state, action){
    state.listCourses = action.payload
   }, 
   delCourse(state, action){
    const indexById = state.listCourses.findIndex((course) => course.maKhoaHoc === action.payload);
    state.listCourses.splice(indexById, 1)
    setLocal(LIST_COURSE, state.listCourses)
   }
  },
})

export default slice.reducer;

export const {setListCourse, delCourse} = slice.actions;


//-------------------------------------------------------------------

export function handleGetListCourse() {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc',
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
        },
      });      
      setLocal(LIST_COURSE, resp.data)
      dispatch(slice.actions.setListCourse(resp.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export function handleDeleteCourse(
  id: string | undefined
  ) {
  return async (dispatch: any) => {   
    try {
      if(window.confirm('Bạn có muốn xóa khóa học này không?')){
        await axios({
          url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaKhoaHoc?MaKhoaHoc=${id}`,
          method: 'delete',
          headers: {
            TokenCybersoft: ` ${CYBER_TOKEN}`,
            Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
          },
        });
       dispatch(delCourse(id))
       alert('Đã xóa khóa học !')
      }
    } catch (error: any) {
      console.error(error);
    }
  } 
};