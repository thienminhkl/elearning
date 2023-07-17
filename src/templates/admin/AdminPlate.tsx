//react
import { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
//component
import Footer from '~/components/footers/admin/Footer';
import Header from '~/components/headers/admin/Header';
import Loading from '~/components/loading/Loading';

//---------------------------------------------------------------------------------

function AdminPlate() {
  return (
    <Fragment>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </Fragment>
  );
}

export default AdminPlate;
