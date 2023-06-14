//react
import { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
//component
import Footer from '~/components/Footer/Dashboard/Footer';
import Header from '~/components/Header/Dashboard/Header';
import Loading from '~/components/Loading/Loading';

//---------------------------------------------------------------------------------

function HomePlate() {
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

export default HomePlate;
