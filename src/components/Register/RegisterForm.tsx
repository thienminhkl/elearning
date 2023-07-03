import * as Yup from 'yup';
//axios
import axios from 'axios';
//react
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//@mui
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  ThemeProvider,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
//const
import { CYBER_TOKEN, defaultTheme } from '~/const/const';
//hook-form
import { yupResolver } from '@hookform/resolvers/yup';
import useResponsive from '~/hooks/useResponsive';
import { RHFTextField } from '../hook-form';
import FormProvider from '../hook-form/FormProvider';
//iconify
import Iconify from '../iconify/Iconify';

//---------------------------------------------------------------------
type FormValuesProps = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
  afterSubmit?: string;
};

//---------------------------------------------------------------------

function RegisterForm() {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md');
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    taiKhoan: '',
    matKhau: '',
    hoTen: '',
    soDT: '',
    maNhom: 'GP01',
    email: '',
  };

  const RegisterSchema = Yup.object({
    email: Yup.string().email('email không hợp lệ').required('Hãy điền Email'),
    hoTen: Yup.string().required('Hãy điền Họ tên'),
    matKhau: Yup.string()
      .min(8, 'Mật khẩu ít nhất 8 ký tự')
      .required('Hãy điền Mật khẩu'),
    taiKhoan: Yup.string()
      .min(6, 'Tài khoản ít nhất 6 ký tự')
      .required('Hãy điền Tài khoản'),
    soDT: Yup.string().required('Hãy điền Số điện thoại'),
    maNhom: Yup.string().required('Hãy điền Mã nhóm'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
        method: 'post',
        data: {
          email: data.email,
          hoTen: data.hoTen,
          matKhau: data.matKhau,
          taiKhoan: data.taiKhoan,
          soDT: data.soDT,
          maNhom: data.maNhom,
        },
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      navigate('/login');
    } catch (error: any) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.response.data || error,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Stack
        sx={{
          textAlign: '-webkit-center',
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        height={'100vh'}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              backgroundColor: 'white',
              my: 5,
              borderRadius: 5,
              opacity: 0.85,
            }}
            width={isDesktop ? '60%' : '80%'}
            height={'90vh'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Stack spacing={2} sx={{ my: 5, mx: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="taiKhoan"
                    label="Tài khoản"
                    autoComplete="account"
                  />
                  <RHFTextField
                    name="email"
                    label="Email"
                    autoComplete="email"
                    sx={{ my: 2 }}
                  />
                  <RHFTextField
                    name="matKhau"
                    label="Mật Khẩu"
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <Iconify
                              icon={
                                showPassword
                                  ? 'eva:eye-fill'
                                  : 'eva:eye-off-fill'
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="hoTen" label="Họ tên" />
                  <RHFTextField
                    name="soDT"
                    label="Số điện thoại"
                    type="number"
                    sx={{ my: 2 }}
                  />
                  <RHFTextField name="maNhom" label="Mã nhóm" />
                </Grid>
              </Grid>
            </Stack>
            {!!errors.afterSubmit && (
              <Alert severity="error" style={{ placeItems: 'center' }}>
                {errors.afterSubmit.message}
              </Alert>
            )}
            <Stack>
              <NavLink
                to="/login"
                style={{ fontSize: '1.2rem', marginLeft: 'auto' }}
              >
                Bạn đã tài khoản? Đăng nhập
              </NavLink>
            </Stack>

            <LoadingButton
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitSuccessful || isSubmitting}
              sx={{
                bgcolor: 'text.primary',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                '&:hover': {
                  bgcolor: 'text.primary',
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'common.white'
                      : 'grey.800',
                },
                my: 2,
                fontSize: '1.6rem',
              }}
            >
              Đăng ký
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Stack>
    </ThemeProvider>
  );
}

export default RegisterForm;
