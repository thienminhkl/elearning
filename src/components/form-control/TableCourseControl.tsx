import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useSelector } from 'react-redux';
import MenuButton from '~/components/form-control/MenuButton';
import { RootState } from '~/redux/store';
import { Course } from '~/type/course/course';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'center' | 'left';
}
const columns: Column[] = [
  { id: '1', label: 'STT', minWidth: 20 },
  { id: '2', label: 'Mã khóa học', minWidth: 100 },
  {
    id: '3',
    label: 'Tên khóa học',
    minWidth: 50,
    align: 'left',
  },
  {
    id: '4',
    label: 'Hình ảnh',
    minWidth: 170,
    align: 'left',
  },
  {
    id: '5',
    label: 'Lượt xem',
    minWidth: 170,
    align: 'left',
  },
  {
    id: '6',
    label: 'Người tạo',
    minWidth: 100,
    align: 'left',
  },
  {
    id: '7',
    label: 'Thao tác',
    minWidth: 170,
    align: 'center',
  },
];

export default function TableCourseControl() {
  const { listCourses } = useSelector((state: RootState) => state.course);
  const [rows, setRows] = React.useState<Course[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (listCourses) {
      setRows(listCourses);
    }
  }, [listCourses]);

  return (
    <Paper sx={{ width: '100%', minHeight: '65vh' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  sx={{ fontSize: '1.6rem' }}
                  key={col.id}
                  align={col.align}
                  style={{ top: 57, minWidth: col.minWidth }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell sx={{ fontSize: '1.6rem' }} align="center">
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1.6rem' }} align="left">
                    {row.maKhoaHoc}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.6rem' }}>
                    {row.tenKhoaHoc}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: '1.6rem' }}>
                    _
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: '1.6rem' }}>
                    {row.luotXem}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: '1.6rem' }}>
                    {row.nguoiTao.hoTen}
                  </TableCell>
                  <TableCell align="center">
                    <MenuButton id={row.maKhoaHoc} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
