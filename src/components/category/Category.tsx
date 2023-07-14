//@mui
import {
  Box,
  Button,
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
import { useNavigate } from 'react-router-dom';
import { setLocal } from '~/untils/localStogate';
import useResponsive from '~/hooks/useResponsive';
//----------------------------------------------------------------------------

export default function Category() {
  const [category, setCategory] = React.useState<CategoryList>([]);
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md');

  const handleGetCategoryList = async () => {
    try {
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc',
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      setCategory(resp.data);
      setLocal('category', resp.data);
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

  const handleCloseCategoryMenu = (id: string) => {
    if (typeof id === 'string') {
      navigate(`/DanhMucKhoaHoc/${id}`);
    }
    setAnchorCategory(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {isDesktop ? (
        <Button
          sx={{
            fontSize: '1.6rem',
            bgcolor: '#6259c1c2',
            '&:hover': {
              bgcolor: '#3b2dcffc',
            },
          }}
          variant="contained"
          onClick={handleOpenCategoryMenu}
        >
          Danh mục khóa học
        </Button>
      ) : (
        <Tooltip title="Danh mục khóa học">
          <IconButton onClick={handleOpenCategoryMenu}>
            <ViewListRoundedIcon />
          </IconButton>
        </Tooltip>
      )}

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
          <MenuItem
            key={course.maDanhMuc}
            onClick={() => handleCloseCategoryMenu(course.maDanhMuc)}
          >
            <Typography textAlign="center" variant="h6">
              {course.tenDanhMuc}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
