import * as Yup from 'yup';
import axios from 'axios';
import {
  Stack,
  Alert,
  InputAdornment,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, CYBER_TOKEN, defaultTheme } from '~/const/const';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../hook-form/FormProvider';
import { RHFTextField } from '../hook-form';
import Iconify from '../iconify/Iconify';
import { LoadingButton } from '@mui/lab';
import useResponsive from '~/hooks/useResponsive';
import { setLocal } from '~/untils/localStogate';

//---------------------------------------------------------------------
type FormValuesProps = {
  taiKhoan: string;
  matKhau: string;
  afterSubmit?: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md');

  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    taiKhoan: '',
    matKhau: '',
  };

  const LoginSchema = Yup.object().shape({
    taiKhoan: Yup.string()
      .min(6, 'Tài khoản ít nhất 6 ký tự')
      .required('Hãy điền Tài khoản'),
    matKhau: Yup.string()
      .min(8, 'Mật khẩu ít nhất 8 ký tự')
      .required('Hãy điền Mật khẩu'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
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
      const resp = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
        method: 'post',
        data: {
          taiKhoan: data.taiKhoan,
          matKhau: data.matKhau,
        },
        headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
      });
      setLocal(ACCESS_TOKEN, resp.data.accessToken);
      navigate('/');
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
              my: 6,
              borderRadius: 5,
              opacity: 0.9,
            }}
            width={isDesktop ? '50%' : '80%'}
            height={'80vh'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Stack spacing={3} sx={{ my: 10, mx: 3 }}>
              <RHFTextField
                name="taiKhoan"
                label="Tài khoản"
                autoComplete="userName"
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
                            showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            {!!errors.afterSubmit && (
              <Alert severity="error" style={{ placeItems: 'center' }}>
                {errors.afterSubmit.message}
              </Alert>
            )}
            <Stack sx={{ my: 2 }}>
              <NavLink
                to="/register"
                style={{ fontSize: '1.2rem', marginLeft: 'auto' }}
              >
                Bạn chưa có tài khoản? Đăng ký
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
                mt: 3,
                mb: 2,
                fontSize: '1.6rem',
              }}
            >
              Đăng nhập
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Stack>
    </ThemeProvider>
  );
}

export default LoginForm;
