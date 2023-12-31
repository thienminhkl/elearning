import { createTheme } from "@mui/material";

export const CYBER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.z53DwWShTQ-NYmv_cyVwxzyaarjOV3xiMrElt3gwl8M"
export const ACCESS_TOKEN = 'accessToken';
export const PROFILE_DATA = 'profileData';
export const LIST_USER = 'listUser';
export const LIST_COURSE = 'listCourse';

export const defaultTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root, & .MuiInputLabel-root, & .MuiFormHelperText-root.Mui-error':
            {
              fontSize: '100%',
            },
        },
      },
    },
  },
});
