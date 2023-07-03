//react
import { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
//component
import Footer from '~/components/Footer/admin/Footer';
import Header from '~/components/Header/admin/Header';
import Loading from '~/components/loading/Loading';

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
