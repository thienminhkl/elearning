//@mui
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
//react
import * as React from 'react';
//type
import { CategoryList } from '~/type/course/course';
import axios from 'axios';
import { CYBER_TOKEN } from '~/const/const';
//----------------------------------------------------------------------------

export default function Category() {
  const [category, setCategory] = React.useState<CategoryList>([]);

  const handleGetCategoryList = async () => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc',
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      setCategory(resp.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const [anchorCategory, setAnchorCategory] =
    React.useState<null | HTMLElement>(null);

  const handleOpenCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCategory(event.currentTarget);
    handleGetCategoryList();
  };

  const handleCloseCategoryMenu = () => {
    setAnchorCategory(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Danh mục khóa học">
        <IconButton onClick={handleOpenCategoryMenu}>
          <ViewListRoundedIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorCategory}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorCategory)}
        onClose={handleCloseCategoryMenu}
      >
        {category.map((course) => (
          <MenuItem key={course.maDanhMuc} onClick={handleCloseCategoryMenu}>
            <Typography textAlign="center" variant="h6">
              {course.tenDanhMuc}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
