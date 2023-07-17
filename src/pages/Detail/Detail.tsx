import axios from 'axios';
//@mui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
//react
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
//const
import { CYBER_TOKEN } from '~/const/const';
//hooks
import useResponsive from '~/hooks/useResponsive';
//redux
import { handleRegistrationCourse } from '~/redux/slices/userSlides';
import { RootState, dispatch } from '~/redux/store';
//type
import { Course } from '~/type/course/course';
//assets
import defaultImg from '~/assets/img/default-course.png';
import backGroundImg from '~/assets/img/detail-carou.jpg';
//---------------------------------------------------------------------

function Detail() {
  const navigate = useNavigate();
  const { MaKhoaHoc } = useParams();
  const isDesktop = useResponsive('up', 'md');
  const [course, setCourse] = useState<Course>();
  const [value, setValue] = useState<number | null>(4.5);
  const { userProfile, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const handleGetCourse = async () => {
    try {
      const resp = await axios({
        url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${MaKhoaHoc}`,
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      setCourse(resp.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (MaKhoaHoc) {
      handleGetCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MaKhoaHoc]);

  const registerCourse = () => {
    if (!isLoggedIn) {
      if (
        window.confirm(
          'Bạn chưa đăng nhập, bấm OK để chuyển đến trang đăng nhập'
        )
      ) {
        navigate('/login');
      }
    }
    dispatch(handleRegistrationCourse(userProfile, course));
  };

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 0,
        bgcolor: '#cadefc63',
      }}
    >
      <CardMedia
        sx={{
          height: 300,
          width: '100%',
          backgroundPosition: 'bottom',
          opacity: 0.99,
        }}
        image={backGroundImg}
        title="elearning"
      />

      <CardContent
        sx={{
          color: 'white',
          position: 'absolute',
          top: '30%',
          transform: 'translateY(-80%)',
          width: '100%',
        }}
      >
        {isDesktop ? (
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >
            <Stack alignItems={'center'}>
              <Stack>
                <Typography gutterBottom variant="h3">
                  {course?.tenKhoaHoc}
                </Typography>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <Typography variant="h6">Đánh giá khóa học:</Typography>
                  <Rating
                    precision={0.5}
                    value={value}
                    onChange={(_, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Stack>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    mt: 1,
                    fontSize: '1.2rem',
                    maxWidth: 150,
                  }}
                  onClick={() => registerCourse()}
                >
                  Đăng ký
                </Button>
              </Stack>
            </Stack>
            <Stack alignItems={'center'}>
              <img
                style={{
                  height: 200,
                  objectFit: 'contain',
                  borderRadius: 5,
                  opacity: 0.9,
                }}
                src={course?.hinhAnh}
                alt={course?.moTa}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = defaultImg)
                }
              />
            </Stack>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} alignSelf={'center'}>
              <Stack alignItems={'center'}>
                <Stack>
                  <Typography gutterBottom variant="h5">
                    {course?.tenKhoaHoc}
                  </Typography>
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Typography variant="body1">Đánh giá khóa học:</Typography>
                    <Rating
                      size="small"
                      precision={0.5}
                      value={value}
                      onChange={(_, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Stack>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      mt: 1,
                      fontSize: '1rem',
                      width: 150,
                    }}
                    onClick={() => registerCourse()}
                  >
                    Đăng ký
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack alignItems={'center'}>
                <img
                  style={{
                    width: 150,
                    objectFit: 'contain',
                    borderRadius: 5,
                    opacity: 0.9,
                  }}
                  src={course?.hinhAnh}
                  alt={course?.moTa}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = defaultImg)
                  }
                />
              </Stack>
            </Grid>
          </Grid>
        )}
      </CardContent>

      <CardContent sx={{ m: 5 }}>
        <Typography variant="h2" mb={3}>
          Giới thiệu khóa học
        </Typography>
        <Typography variant="h5" minHeight={200}>
          {course?.moTa}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Detail;
