import { CourseDetail } from "../course/course";

export type User = {
  hoTen: string;
  maLoaiNguoiDung: string;
  taiKhoan: string;
  tenLoaiNguoiDung: string;
};

export type DataUser = {
  email: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  matKhau: string;
  soDT: string;
  taiKhoan: string;
};

export type UserProfile = DataUser & {
  chiTietKhoaHocGhiDanh:CourseDetail[]
};

