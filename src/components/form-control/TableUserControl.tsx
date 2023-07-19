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
import { User } from '~/type/list-user/list-user';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'center' | 'left';
}
const columns: Column[] = [
  { id: '1', label: 'STT', minWidth: 20 },
  { id: '2', label: 'Tài khoản', minWidth: 100 },
  {
    id: '3',
    label: 'Mật khẩu',
    minWidth: 50,
    align: 'left',
  },
  {
    id: '4',
    label: 'Họ tên',
    minWidth: 170,
    align: 'left',
  },
  {
    id: '5',
    label: 'email',
    minWidth: 170,
    align: 'left',
  },
  {
    id: '6',
    label: 'Số điện thoại',
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

export default function TableControl() {
  const { listUser } = useSelector((state: RootState) => state.listUser);
  const [rows, setRows] = React.useState<User[]>([]);

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
    if (listUser) {
      setRows(listUser);
    }
  }, [listUser]);

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
                <TableRow hover tabIndex={-1} key={row.taiKhoan}>
                  <TableCell sx={{ fontSize: '1.6rem' }} align="center">
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1.6rem' }} align="left">
                    {row.taiKhoan}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.6rem' }}>
                    _
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: '1.6rem' }}>
                    {row.hoTen}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: '1.6rem' }}>
                    {row.email}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: '1.6rem' }}>
                    {row.soDt}
                  </TableCell>
                  <TableCell align="center">
                    <MenuButton id={row.taiKhoan} />
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
