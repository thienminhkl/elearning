import { combineReducers } from 'redux';
// slices
import courseSlides from './slices/courseSlides';
import userSlice from './slices/userSlides';
import listUserSlides from './slices/listUserSlides';

// ----------------------------------------------------------------------
const rootReducer = combineReducers({
  user: userSlice,
  course: courseSlides,
  listUser: listUserSlides,
});

export default rootReducer;
