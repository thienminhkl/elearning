import { Dispatch, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCESS_TOKEN, CYBER_TOKEN, LIST_USER } from '~/const/const';
import { User } from '~/type/list-user/list-user';
import { getLocal, setLocal } from '~/untils/localStogate';

//------------------------------------------------------
interface UserList{
  listUser: User[],
};

const listUser = getLocal(LIST_USER);

const initialState: UserList = {
  listUser: listUser,
};


const slice = createSlice({
  name: 'listUser',
  initialState,
  reducers: {
   setListUser(state, action){
    state.listUser = action.payload
   }, 
   delUser(state, action){
    const indexById = state.listUser.findIndex((user) => user.taiKhoan === action.payload);
    state.listUser.splice(indexById, 1)
    setLocal(LIST_USER, state.listUser)
   }
  },
})

export default slice.reducer;

export const {setListUser, delUser} = slice.actions;


//-------------------------------------------------------------------

export function handleGetListUser() {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung',
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
        },
      });      
      setLocal(LIST_USER, resp.data)
      dispatch(slice.actions.setListUser(resp.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export function handleDeleteUser(
  id: string | undefined
  ) {
  return async (dispatch: any) => {   
    try {
      if(window.confirm('Bạn có muốn xóa người dùng này không?')){
        await axios({
          url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`,
          method: 'delete',
          headers: {
            TokenCybersoft: ` ${CYBER_TOKEN}`,
            Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
          },
        });
       dispatch(delUser(id))
       alert('Đã xóa người dùng!')
      }
    } catch (error: any) {
      console.error(error);
      alert('Không thể xóa người dùng vì đã đăng ký khóa học!')
    }
  } 
};