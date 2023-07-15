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

  return (
    <Stack position={'relative'}>
      <img
        className="img"
        src={imgCarousel}
        alt={'elearning-carousel'}
        style={{
          objectFit: 'fill',
          height: '50%',
          width: '100%',
        }}
      />
      {isDesktop
        ? !isMobile && (
            <Stack
              width={'30%'}
              spacing={3}
              sx={{
                position: 'absolute',
                top: '20%',
                right: '10%',
              }}
            >
              <Typography variant="h2" color={'#05a8ff'}>
                KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
              </Typography>
              <Typography variant="h4" color={'white'}>
                Trở thành lập trình chuyên nghiệp tại CyberSoft
              </Typography>
              <Stack direction={'row'} spacing={2} mr={2}>
                <Button
                  variant="contained"
                  sx={{ fontSize: '1.6rem', color: 'white' }}
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
            <Stack
              width={'40%'}
              spacing={2}
              sx={{
                position: 'absolute',
                top: '20%',
                right: '10%',
              }}
            >
              <Typography variant="h4" color={'#05a8ff'}>
                KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
              </Typography>
              <Typography variant="h5" color={'white'}>
                Trở thành lập trình chuyên nghiệp tại CyberSoft
              </Typography>
              <Stack direction={'row'} spacing={1}>
                <Button
                  variant="contained"
                  sx={{ fontSize: '1.2rem', color: 'white' }}
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
        <Stack
          width={'60%'}
          spacing={1}
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
          }}
        >
          <Typography variant="h5" color={'#05a8ff'}>
            KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
          </Typography>
          <Typography variant="h6" color={'white'}>
            Trở thành lập trình chuyên nghiệp tại CyberSoft
          </Typography>
          <Stack direction={'row'} spacing={1}>
            <Button
              size="small"
              variant="contained"
              sx={{ fontSize: '0.7rem', color: 'white' }}
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
