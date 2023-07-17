//yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//react
import { useForm } from 'react-hook-form';
//@mui
import { Alert, Button, Grid, Stack } from '@mui/material';
//redux
import { dispatch } from '~/redux/store';
import { handleUpdateUserProfile } from '~/redux/slices/userSlides';
//hook-form
import { RHFTextField } from '../hook-form';
import FormProvider from '../hook-form/FormProvider';
//type
import { UserProfile } from '~/type/user/user';
//------------------------------------------------------------------
type Props = {
  profile: UserProfile | null;
};

export type UpdateFormValuesProps = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  email: string;
  afterSubmit?: string;
};

export default function ProfileUser({ profile }: Props) {
  const defaultValues = {
    taiKhoan: profile?.taiKhoan,
    matKhau: profile?.matKhau,
    hoTen: profile?.hoTen,
    soDT: profile?.soDT,
    email: profile?.email,
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
  });

  const methods = useForm<UpdateFormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: UpdateFormValuesProps) => {
    const restVal = {
      maNhom: profile?.maNhom,
      maLoaiNguoiDung: profile?.maLoaiNguoiDung,
      chiTietKhoaHocGhiDanh: profile?.chiTietKhoaHocGhiDanh,
    };
    const handleSetError = (error: any) => {
      setError('afterSubmit', {
        ...error,
        message: error.response.data || error,
      });
    };
    dispatch(handleUpdateUserProfile(data, restVal, handleSetError));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        sx={{
          backgroundColor: 'white',
          borderRadius: 5,
          opacity: 0.85,
        }}
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
            </Grid>
          </Grid>
        </Stack>
        {!!errors.afterSubmit && (
          <Alert severity="error" style={{ placeItems: 'center' }}>
            {errors.afterSubmit.message}
          </Alert>
        )}

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
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
            my: 2,
            fontSize: '1.6rem',
          }}
        >
          Cập nhật
        </Button>
      </Stack>
    </FormProvider>
  );
}
