//react
import { Stack } from '@mui/system';
import React, { Fragment, Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Drawer from '~/components/drawer/Drawer';
//component
import Footer from '~/components/footers/admin/Footer';
import Header from '~/components/headers/admin/Header';
import Loading from '~/templates/Loading';

//---------------------------------------------------------------------------------

function AdminPlate() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('QuanLyNguoiDung')) {
      navigate('/admin/QuanLyNguoiDung');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Fragment>
      <Header handleDrawerToggle={handleDrawerToggle} open={open} />
      <Stack pl={3}>
        <Drawer handleDrawerToggle={handleDrawerToggle} open={open} />
      </Stack>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </Fragment>
  );
}

export default AdminPlate;
