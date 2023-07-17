import * as Yup from 'yup';
//@mui
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  ThemeProvider,
} from '@mui/material';
//react
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
//const
import { defaultTheme } from '~/const/const';
//hook-form
import { yupResolver } from '@hookform/resolvers/yup';
import useResponsive from '~/hooks/useResponsive';
//untils
import { FormProvider, RHFTextField } from '~/components/hook-form';
//iconify
import Iconify from '~/components/iconify/Iconify';
//redux
import { handleLogin } from '~/redux/slices/userSlides';
import { RootState, dispatch, useSelector } from '~/redux/store';

//---------------------------------------------------------------------
export type LogFormValuesProps = {
  taiKhoan: string;
  matKhau: string;
  afterSubmit?: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

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

  const methods = useForm<LogFormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LogFormValuesProps) => {
    const handleSetError = (error: any) => {
      setError('afterSubmit', {
        ...error,
        message: error.response.data || error,
      });
    };
    dispatch(handleLogin(data, navigate, handleSetError));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Stack
        sx={{
          backgroundImage: 'linear-gradient(to bottom right, #447A7A, #F9E866)',
          textAlign: '-webkit-center',
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              backgroundColor: 'white',
              my: 6,
              borderRadius: 5,
              opacity: 0.85,
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

            <Button
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
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
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </ThemeProvider>
  );
}

export default LoginForm;
