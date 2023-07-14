import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//utils
import { setLocal } from '~/untils/localStogate';
//constant
import { axiosWithAuth } from '~/services/services.config';

//------------------------------------------------------
const initialState = {
  profileData: {},
  favoriteList: [],
}

export const profileThunkAction = createAsyncThunk(
  'userReduxSlides/profileThunkAction',
  async () => {
    const resp = await axiosWithAuth.post("/Users/getProfile");
    return resp;
  }
)
export const profileFavoriteThunkAction = createAsyncThunk(
  'userReduxSlides/profileFavoriteThunkAction',
  async () => {
    const resp = await axiosWithAuth.get("/Users/getproductfavorite");
    return resp;
  }
)
const userReduxSlides = createSlice({
  name: 'userReduxSlides',
  initialState,
  reducers: {
    logoutUser: (state, _) => {
      state.profileData = {}
    }
  },

  extraReducers: (builder) => {
    builder.addCase(profileThunkAction.fulfilled,
      (state, action) => {
        state.profileData = action.payload.data.content;
      }
    ),
      builder.addCase(profileFavoriteThunkAction.fulfilled,
        (state, action) => {
          state.favoriteList = action.payload.data.content.productsFavorite;
          setLocal('favorList', JSON.stringify([]))
        })
  }
});

export const { logoutUser } = userReduxSlides.actions

export default userReduxSlides.reducer