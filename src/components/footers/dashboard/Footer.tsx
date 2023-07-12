import './Footer.scss';
//@mui
import {
  LocalLibraryRounded as LocalLibraryRoundedIcon,
  LocationOn as LocationOnIcon,
  LocalPhone as LocalPhoneIcon,
} from '@mui/icons-material';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
//assets
import reCaptcha from '~/assets/img/reCaptcha.png';
//hooks
import useResponsive from '~/hooks/useResponsive';
//react
import { useState, useEffect } from 'react';
//---------------------------------------------------------------------

export default function Footer() {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');
  const [width, setWidth] = useState(300);
  const [url, setUrl] = useState(
    'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet&tabs=timeline&width=300&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
  );

  useEffect(() => {
    if (isDesktop && !isMobile) {
      setWidth(300);
      setUrl(
        'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet&tabs=timeline&width=300&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
      );
    } else if (!isDesktop && !isMobile) {
      setWidth(250);
      setUrl(
        'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet&tabs=timeline&width=250&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
      );
    } else if (isMobile) {
      setWidth(350);
      setUrl(
        'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet&tabs=timeline&width=350&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
      );
    }
  }, [isDesktop, isMobile]);
  return (
    <Stack sx={{ bgcolor: '#090b26', m: 0, color: 'white' }}>
      <Grid container spacing={3} sx={{ mt: 0, mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Stack spacing={2} mx={2}>
            <Stack>
              <Stack
                direction={'row'}
                alignItems="center"
                sx={{ color: 'yellow' }}
              >
                <LocalLibraryRoundedIcon sx={{ fontSize: '2rem' }} />
                <Typography variant="h3" sx={{ mr: 2.5, ml: 0.5 }}>
                  Elearning
                </Typography>
              </Stack>
              <Typography variant="h6">
                CyberSoft Acedemy - Hệ thống đào tạo lập trình chuyên sâu theo
                dự án thực tế
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h5">
                NHẬN TIN SỰ KIỆN & KHUYẾN MÃI
              </Typography>
              <Typography variant="h6">
                CyberSoft sẽ gửi các khóa học trực tuyến & và các chương trình
                CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp
                dẫn đến các bạn.
              </Typography>
              <Stack direction={'row'} spacing={2}>
                <TextField
                  defaultValue={'your.address@email.com'}
                  size="medium"
                  sx={{
                    color: 'black',
                    bgcolor: 'white',
                    borderRadius: '5px',
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    fontSize: '1.6rem',
                    bgcolor: '#caae14',
                    '&:hover': {
                      bgcolor: '#a89112',
                    },
                  }}
                >
                  Đăng ký
                </Button>
              </Stack>
            </Stack>
            <Stack>
              <Stack direction={'row'} spacing={2}>
                <LocationOnIcon />
                <Typography variant="h6">
                  Cơ sở 1: 376 Võ Văn Tần - Quận 3
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <LocationOnIcon />
                <Typography variant="h6">
                  Cơ sở 2: 459 Sư Vạn Hạnh - Quận 10
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <LocationOnIcon />
                <Typography variant="h6">
                  Cơ sở 3: 82 Ung Văn Khiêm - Bình Thạch
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <LocalPhoneIcon />
                <Typography variant="h6">
                  096.105.1014 - 098.047.5838
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1} mx={2}>
            <Typography variant="h5">ĐĂNG KÝ TƯ VẤN</Typography>
            <Stack spacing={2}>
              <TextField
                sx={{ bgcolor: 'white', borderRadius: 2 }}
                placeholder="Họ và tên *"
                size="medium"
              />
              <TextField
                sx={{ bgcolor: 'white', borderRadius: 2 }}
                placeholder="Email liên hệ *"
                size="medium"
              />
              <TextField
                sx={{ bgcolor: 'white', borderRadius: 2 }}
                placeholder="Điện thoại liên hệ *"
                size="medium"
              />
            </Stack>
            <Typography variant="h6">Nhấn vào ô bên dưới</Typography>
            <Stack
              width={'80%'}
              direction={'row'}
              sx={{ bgcolor: 'white', borderRadius: 1 }}
              justifyContent={'space-between'}
            >
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Checkbox color="primary" />
                <Typography sx={{ color: 'black' }}>
                  I&apos;m not a robot
                </Typography>
              </Stack>
              <Button size="small">
                <img
                  src={reCaptcha}
                  alt="..."
                  style={{ width: '1.6rem', height: '1.6rem' }}
                />
              </Button>
            </Stack>
            <Stack width={'30%'}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  fontSize: '1.6rem',
                  bgcolor: '#caae14',
                  '&:hover': {
                    bgcolor: '#a89112',
                  },
                }}
              >
                Đăng ký
              </Button>
            </Stack>

            <Typography>
              Lập trình Front End &nbsp; Lập trình ReactJS &nbsp; Lập trình
              React Angular &nbsp; Lập trình tư duy &nbsp; Lập trình NodeJS
              &nbsp; Lập trình Back End &nbsp; Lập trình Java Web &nbsp; Lập
              trình Java Spring - Java Boot &nbsp; Tôi đi Code dạo &nbsp; Học
              SEO Hà Nội ở Vietmoz &nbsp; Học lập trình trực tuyền
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack alignItems={'center'} mx={2}>
            <iframe title="fb" src={url} width={width} height="300" />
            <Typography sx={{ mt: 2 }}>
              Anh ngữ giao tiếp - Khởi động Anh ngữ giao tiếp - Lấy đà Anh ngữ
              giao tiếp - Bật nhảy Anh ngữ giao tiếp - Bay lên không Anh ngữ
              giao tiếp - Tiếp đất
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
