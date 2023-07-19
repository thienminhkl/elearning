import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { ACCESS_TOKEN, CYBER_TOKEN } from '~/const/const';
import { CourseControl } from '~/type/course/course';
import { getLocal } from '~/untils';
import TableRegisted from './TableRegisted';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
type Props = {
  id: string;
  open: boolean;
  handleClose: VoidFunction;
};
export default function UserModal({ id, open, handleClose }: Props) {
  const [listAwait, setListAwait] = React.useState<CourseControl[]>([]);
  const [listRegisted, setListRegisted] = React.useState<CourseControl[]>([]);
  const [listUnRegisted, setListUnRegisted] = React.useState<CourseControl[]>(
    []
  );

  const [idCourse, setIdCourse] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setIdCourse(event.target.value as string);
  };

  const signCourse = async () => {
    try {
      await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKyKhoaHoc',
        method: 'post',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
          Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
        },
        data: {
          taiKhoan: id,
          maKhoaHoc: idCourse,
        },
      });
    } catch (error: any) {
      alert(error.data);
    }
  };
  const handleGetAwaitCourse = async () => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet',
        method: 'post',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
          Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
        },
        data: {
          taiKhoan: id,
        },
      });
      setListAwait(resp.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleGetResgistedCourse = async () => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet',
        method: 'post',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
          Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
        },
        data: {
          taiKhoan: id,
        },
      });
      setListRegisted(resp.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleGetUnResgistedCourse = async () => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh',
        method: 'post',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
          Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
        },
        data: {
          taiKhoan: id,
        },
      });
      setListUnRegisted(resp.data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (id && open) {
      handleGetAwaitCourse();
      handleGetResgistedCourse();
      handleGetUnResgistedCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  const handleCancelCourse = async (maKhoaHoc: string, isAwait: boolean) => {
    try {
      await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/HuyGhiDanh',
        method: 'post',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
          Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
        },
        data: {
          taiKhoan: id,
          maKhoaHoc: maKhoaHoc,
        },
      });
      if (isAwait) {
        setListAwait(listAwait.filter((item) => item.maKhoaHoc !== maKhoaHoc));
      } else {
        setListRegisted(
          listAwait.filter((item) => item.maKhoaHoc !== maKhoaHoc)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleGegisterCourse = async (item: CourseControl) => {
    try {
      await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/HuyGhiDanh',
        method: 'post',
        headers: {
          TokenCybersoft: ` ${CYBER_TOKEN}`,
          Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
        },
        data: {
          taiKhoan: id,
          maKhoaHoc: item.maKhoaHoc,
        },
      });
      setListAwait(listAwait.filter((x) => x.maKhoaHoc !== item.maKhoaHoc));
      const list = [...listAwait, item];
      setListRegisted(list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h3">Chọn khóa học</Typography>
          <Stack direction={'row'} justifyContent={'space-between'} m={3}>
            <Box sx={{ width: '80%' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Danh sách khóa học chưa ghi danh
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idCourse}
                  label="Danh sách khóa học chưa ghi danh"
                  onChange={handleChange}
                >
                  {listUnRegisted.map((item) => (
                    <MenuItem key={item.maKhoaHoc} value={item.maKhoaHoc}>
                      {item.tenKhoaHoc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              disabled={!idCourse}
              variant="contained"
              onClick={signCourse}
            >
              Ghi danh
            </Button>
          </Stack>
          {listAwait.length !== 0 && (
            <Stack spacing={1} mb={2}>
              <Typography variant="h6">Khóa học chờ xác thực</Typography>
              <TableRegisted
                list={listAwait}
                handleGegisterCourse={(item) => handleGegisterCourse(item)}
                handleCancelCourse={(id, isAwait) =>
                  handleCancelCourse(id, isAwait)
                }
              />
            </Stack>
          )}
          {listRegisted.length !== 0 && (
            <Stack spacing={1} mb={2}>
              <Typography variant="h6">Khóa học đã ghi danh</Typography>
              <TableRegisted
                list={listRegisted}
                handleCancelCourse={(id, isAwait) =>
                  handleCancelCourse(id, isAwait)
                }
              />
            </Stack>
          )}
        </Box>
      </Modal>
    </div>
  );
}
