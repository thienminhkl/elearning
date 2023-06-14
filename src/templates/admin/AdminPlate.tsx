//react
import { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
//component
import Footer from '~/components/Footer/Admin/Footer';
import Header from '~/components/Header/Admin/Header';
import Loading from '~/components/Loading/Loading';

//---------------------------------------------------------------------------------

function AdminPlate() {
  return (
    <Fragment>
      <Header />
      <Suspense
        fallback={
          <>
            <Loading />
          </>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </Fragment>
  );
}

export default AdminPlate;
