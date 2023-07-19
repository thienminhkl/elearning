import * as React from 'react';
import { CourseControl } from '~/type/course/course';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
interface Column {
  id: 'stt' | 'name' | 'await';
  label: string;
}

const columns: Column[] = [
  { id: 'stt', label: 'STT' },
  { id: 'name', label: 'Tên khóa học' },
  {
    id: 'await',
    label: 'Chờ xác nhận',
  },
];

type Props = {
  list: CourseControl[];
  handleCancelCourse: (id: string, isAwait: boolean) => void;
  handleGegisterCourse?: (item: CourseControl) => void;
};
export default function TableRegisted({
  list,
  handleCancelCourse,
  handleGegisterCourse,
}: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ top: 57 }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.maKhoaHoc}>
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell>{row.tenKhoaHoc}</TableCell>
                    <TableCell>
                      {handleGegisterCourse && (
                        <Button onClick={() => handleGegisterCourse(row)}>
                          Xác nhận
                        </Button>
                      )}

                      <Button
                        onClick={() => handleCancelCourse(row.maKhoaHoc, true)}
                      >
                        Hủy
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
