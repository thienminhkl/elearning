export type CategoryList = Category[];
export type Category = {
  maDanhMuc: string;
  tenDanhMuc: string;
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

export type User = {
  hoTen: string;
  maLoaiNguoiDung: string;
  taiKhoan: string;
  tenLoaiNguoiDung: string;
};
export type CategoryCourse = {
  maDanhMucKhoaHoc: string;
  tenDanhMucKhoaHoc: string;
};
