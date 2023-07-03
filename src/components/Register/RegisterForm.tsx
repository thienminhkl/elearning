import * as Yup from 'yup';
//axios
import axios from 'axios';
//react
import { useNavigate } from 'react-router-dom';
//@mui
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
//const
import { CYBER_TOKEN } from '~/const/const';
//formik
import { useFormik } from 'formik';
//---------------------------------------------------------------------

const defaultTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root, & .MuiInputLabel-root, & .MuiFormHelperText-root.Mui-error':
            {
              fontSize: '1.6rem',
            },
        },
      },
    },
  },
});

const defaultValue = {
  taiKhoan: '',
  matKhau: '',
  hoTen: '',
  soDT: '',
  maNhom: '',
  email: '',
  submit: null,
};

const registerSchema = Yup.object({
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
//---------------------------------------------------------------------

function RegisterForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: registerSchema,
    onSubmit: async (values, helpers) => {
      try {
        const resp = await axios({
          url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
          method: 'post',
          data: {
            email: values.email,
            hoTen: values.hoTen,
            matKhau: values.matKhau,
            taiKhoan: values.taiKhoan,
            soDT: values.soDT,
            maNhom: values.maNhom,
          },
          headers: { TokenCybersoft: ` ${CYBER_TOKEN}` },
        });
        console.log(resp);

        navigate('/login');
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Đăng ký
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* TODO: RHFTextField */}
                <TextField
                  {...formik.getFieldProps('taiKhoan')}
                  error={!!(formik.touched.taiKhoan && formik.errors.taiKhoan)}
                  helperText={formik.touched.taiKhoan && formik.errors.taiKhoan}
                  label="Tài khoản"
                  name="taiKhoan"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('matKhau')}
                  error={!!(formik.touched.matKhau && formik.errors.matKhau)}
                  helperText={formik.touched.matKhau && formik.errors.matKhau}
                  label="Mật Khẩu"
                  name="matKhau"
                  type="password"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('email')}
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Địa chỉ Email"
                  name="email"
                  type="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('hoTen')}
                  error={!!(formik.touched.hoTen && formik.errors.hoTen)}
                  helperText={formik.touched.hoTen && formik.errors.hoTen}
                  label="Họ tên"
                  name="hoTen"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('soDT')}
                  error={!!(formik.touched.soDT && formik.errors.soDT)}
                  helperText={formik.touched.soDT && formik.errors.soDT}
                  label="Số điện thoại"
                  name="soDT"
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('maNhom')}
                  error={!!(formik.touched.maNhom && formik.errors.maNhom)}
                  helperText={formik.touched.maNhom && formik.errors.maNhom}
                  label="Mã nhóm"
                  name="maNhom"
                  fullWidth
                />
              </Grid>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: '1.6rem' }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="h5">
                  Bạn đã có tài khoản? Đăng nhập!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterForm;
