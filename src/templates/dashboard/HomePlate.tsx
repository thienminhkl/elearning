//react
import { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
//component
import Footer from '~/components/footers/dashboard/Footer';
import Header from '~/components/headers/dashboard/Header';
import Loading from '~/components/loading/Loading';

//---------------------------------------------------------------------------------

function HomePlate() {
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

export default HomePlate;
