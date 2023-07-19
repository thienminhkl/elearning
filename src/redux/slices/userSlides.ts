import axios from 'axios';
import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { UpdateFormValuesProps } from '~/components/profile/ProfileUser';
import { ACCESS_TOKEN, CYBER_TOKEN, PROFILE_DATA } from '~/const/const';
import { LogFormValuesProps } from '~/pages/Login/Login';
import { RegisFormValuesProps } from '~/pages/Register/Register';
import { CourseDetail } from '~/type/course/course';
import { UserProfile } from '~/type/user/user';
import { deleteLocalStrgKey, getLocal, setLocal } from '~/untils/localStogate';

//------------------------------------------------------
interface ProfileData{
  userProfile: UserProfile | null,
  isLoggedIn: boolean
};

const profile = getLocal(PROFILE_DATA);
const isLog = Boolean(getLocal(ACCESS_TOKEN));

const initialState: ProfileData = {
  userProfile: profile,
  isLoggedIn: isLog
};


const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userProfile = action.payload      
    },
    logout(state){
      state.isLoggedIn = false;
      state.userProfile = null;
      deleteLocalStrgKey(ACCESS_TOKEN);
      deleteLocalStrgKey(PROFILE_DATA);
    }, 
    updateProfileData(state, action){
      state.userProfile = action.payload
    }
  },
})

export default slice.reducer;

export const { updateProfileData, login, logout} = slice.actions;


//-------------------------------------------------------------------

export function handleGetProfile() {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinNguoiDung',
        method: 'post',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
          Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
        },
      });
      setLocal(PROFILE_DATA, resp.data)
      dispatch(slice.actions.login(resp.data));
    } catch (error) {
      console.error(error);
    }
  };
};
export function handleLogin(
  data: LogFormValuesProps,
  navigate: (nav: string)  => void,
  handleSetError:(error: any) => void
 ) {
  return async (dispatch: any) => {    
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
        method: 'post',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
        data: {
          taiKhoan: data.taiKhoan,
          matKhau: data.matKhau,
        }
      });
      setLocal(ACCESS_TOKEN, resp.data.accessToken);      
      dispatch(handleGetProfile());
      alert('Đăng nhập thành công');
      navigate('/HoSo');
    } catch (error) {
      console.error(error);
      handleSetError(error)
    }
  };
};
export function handleRegister(
  data: RegisFormValuesProps,
  navigate: (nav: string)  => void,
  handleSetError:(error: any) => void
 ) {
  return async () => {    
    try {
      await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
        method: 'post',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
        data: {
          email: data.email,
          hoTen: data.hoTen,
          matKhau: data.matKhau,
          taiKhoan: data.taiKhoan,
          soDT: data.soDT,
          maNhom: data.maNhom,
        }
      });
      alert('Đăng ký thành công');
      navigate('/DangNhap');
    } catch (error) {
      console.error(error);
      handleSetError(error)
    }
  };
};
export function handleUpdateUserProfile(
  data: UpdateFormValuesProps,
  restVal: {
    maNhom: string | undefined,
    maLoaiNguoiDung: string | undefined,
    chiTietKhoaHocGhiDanh: CourseDetail[] | undefined
  },
  handleSetError:(error: any) => void
 ) {
  return async (dispatch: any) => {   
    const values = {
      email: data.email,
      hoTen: data.hoTen,
      matKhau: data.matKhau,
      taiKhoan: data.taiKhoan,
      soDT: data.soDT,
      maNhom: restVal.maNhom,
      maLoaiNguoiDung: restVal.maLoaiNguoiDung,
    }; 
    try {
      await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        method: 'put',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}`,          
        Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
      },
        data: values
      });

      setLocal(PROFILE_DATA,{
        ...values,
        chiTietKhoaHocGhiDanh: restVal.chiTietKhoaHocGhiDanh,
      })
      dispatch(updateProfileData({
        ...values,
        chiTietKhoaHocGhiDanh: restVal.chiTietKhoaHocGhiDanh,
      }));
      alert('Cập nhật tài khoản thành công');
    } catch (error) {
      console.error(error);
      handleSetError(error)
    }
  };
};
export function handleUnregistrationCourse(
  data: UserProfile | null | undefined, 
  id: string | undefined
  ) {
  return async (dispatch: any) => {   
    const newKHGD =  data?.chiTietKhoaHocGhiDanh.filter(
      (x) => x.maKhoaHoc !== id
    );
      
    try {
      if(window.confirm('Bạn có muốn hủy khóa học này không?')){
        await axios({
          url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh`,
          method: 'post',
          headers: {
            TokenCybersoft: ` ${CYBER_TOKEN}`,
            Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
          },
          data: {
            maKhoaHoc: id,
            taiKhoan: profile?.taiKhoan,
          },
        });
        setLocal(PROFILE_DATA,{
          ...data,
          chiTietKhoaHocGhiDanh: newKHGD,
        })
        dispatch(updateProfileData({
          ...data,
          chiTietKhoaHocGhiDanh: newKHGD,
        }));
      }
    } catch (error: any) {
      console.error(error);
    }
  } 
};
export function handleRegistrationCourse(
  data: UserProfile | null , 
  course: any,
  ) {
  return async (dispatch: any) => {  
    const newArr = [...<[]>data?.chiTietKhoaHocGhiDanh,course]
    
    try {
      if(window.confirm('Bạn có muốn đăng ký khóa học này không?')){
        await axios({
          url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc`,
          method: 'post',
          headers: {
            TokenCybersoft: ` ${CYBER_TOKEN}`,
            Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
          },
          data: {
            maKhoaHoc: course.maKhoaHoc,
            taiKhoan: profile?.taiKhoan,
          },
        });
        setLocal(PROFILE_DATA,{
          ...data,
          chiTietKhoaHocGhiDanh: newArr,
        })
        dispatch(updateProfileData({
          ...data,
          chiTietKhoaHocGhiDanh: newArr,
        }));
      }
      alert('Đăng ký khóa học thành công')
    } catch (error: any) {
      console.error(error);
      alert(error.response.data)
    }
  } 
};