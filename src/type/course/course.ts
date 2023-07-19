import { User } from "../user/user";
//---------------------------------------------------------------
export type CategoryList = Category[];
export type Category = {
  maDanhMuc: string;
  tenDanhMuc: string;
};

export type CourseControl = {
  biDanh: string;
  maKhoaHoc: string;
  tenKhoaHoc: string;
};

export type CourseList = Course[];
export type Course = {
  biDanh: string;
  danhMucKhoaHoc: CategoryCourse;
  hinhAnh: string;
  luotXem: number;
  maKhoaHoc: string;
  maNhom: string;
  moTa: string;
  ngayTao: string;
  nguoiTao: User;
  soLuongHocVien: string;
  tenKhoaHoc: string;
};

export type CategoryCourse = {
  maDanhMucKhoaHoc: string;
  tenDanhMucKhoaHoc: string;
};

export type CourseDetail = {
  maKhoaHoc: string,
  tenKhoaHoc: string,
  biDanh: string,
  moTa: string,
  luotXem: number,
  hinhAnh: string,
  ngayTao: string | number | Date,
  danhGia: number
};
