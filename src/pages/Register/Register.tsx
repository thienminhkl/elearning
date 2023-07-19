import * as Yup from 'yup';
//axios
//react
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
//@mui
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  ThemeProvider,
} from '@mui/material';
//const
import { defaultTheme } from '~/const/const';
//hook-form
import { yupResolver } from '@hookform/resolvers/yup';
import useResponsive from '~/hooks/useResponsive';
//components
import { FormProvider, RHFTextField } from '~/components/hook-form';
//iconify
import Iconify from '~/components/iconify/Iconify';
import { handleRegister } from '~/redux/slices/userSlides';
import { dispatch } from '~/redux/store';
//---------------------------------------------------------------------
export type RegisFormValuesProps = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
  afterSubmit?: string;
};

function Register() {
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

  const methods = useForm<RegisFormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: RegisFormValuesProps) => {
    const handleSetError = (error: any) => {
      setError('afterSubmit', {
        ...error,
        message: error.response.data || error,
      });
    };
    dispatch(handleRegister(data, navigate, handleSetError));
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
                to="/DangNhap"
                style={{ fontSize: '1.2rem', marginLeft: 'auto' }}
              >
                Bạn đã tài khoản? Đăng nhập
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
                my: 2,
                fontSize: '1.6rem',
              }}
            >
              Đăng ký
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </ThemeProvider>
  );
}

export default Register;
