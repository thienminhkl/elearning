import './Home.scss';
//component
import Courses from '../Courses/Courses';
import Carousel from '~/components/carousel/Carousel';

//---------------------------------------------------------------------

function Home() {
  return (
    <>
      <Carousel />
      <Courses />
    </>
  );
}

export default Home;
