import './Carousel.scss';
//@mui
import { Button, Stack, Typography } from '@mui/material';
//hooks
import useResponsive from '~/hooks/useResponsive';
//assets
import imgCarousel from '~/assets/img/carousel.jpg';

//-----------------------------------------------------

function Carousel() {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');
  console.log({ isDesktop, isMobile });

  return (
    <Stack className="carousel">
      <img className="img" src={imgCarousel} alt={'elearning-carousel'} />
      {isDesktop
        ? !isMobile && (
            <Stack width={'30%'} spacing={3} className="carousel-text">
              <Typography variant="h2" color={'#f8f403'}>
                KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
              </Typography>
              <Typography variant="h4" color={'#ffffff'}>
                Trở thành lập trình chuyên nghiệp tại CyberSoft
              </Typography>
              <Stack direction={'row'} spacing={2} mr={2}>
                <Button
                  variant="contained"
                  sx={{ fontSize: '1.6rem', color: '#f8f403' }}
                >
                  Xem khóa học
                </Button>
                <Button
                  variant="outlined"
                  sx={{ fontSize: '1.6rem', color: 'white' }}
                >
                  Tư vẫn học
                </Button>
              </Stack>
            </Stack>
          )
        : !isMobile && (
            <Stack width={'40%'} spacing={2} className="carousel-text">
              <Typography variant="h4" color={'#f8f403'}>
                KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
              </Typography>
              <Typography variant="h5" color={'#ffffff'}>
                Trở thành lập trình chuyên nghiệp tại CyberSoft
              </Typography>
              <Stack direction={'row'} spacing={1}>
                <Button
                  variant="contained"
                  sx={{ fontSize: '1.2rem', color: '#f8f403' }}
                >
                  Xem khóa học
                </Button>
                <Button
                  variant="outlined"
                  sx={{ fontSize: '1.2rem', color: 'white' }}
                >
                  Tư vẫn học
                </Button>
              </Stack>
            </Stack>
          )}
      {isMobile && (
        <Stack width={'60%'} spacing={1} className="carousel-text">
          <Typography variant="h5" color={'#f8f403'}>
            KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
          </Typography>
          <Typography variant="h6" color={'#ffffff'}>
            Trở thành lập trình chuyên nghiệp tại CyberSoft
          </Typography>
          <Stack direction={'row'} spacing={1}>
            <Button
              size="small"
              variant="contained"
              sx={{ fontSize: '0.7rem', color: '#f8f403' }}
            >
              Xem khóa học
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', color: 'white' }}
            >
              Tư vẫn học
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default Carousel;
