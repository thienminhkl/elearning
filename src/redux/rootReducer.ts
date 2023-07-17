import { combineReducers } from 'redux';
// slices
import productSlices from './slices/courseSlides';
import userSlice from './slices/userSlides';

// ----------------------------------------------------------------------
const rootReducer = combineReducers({
  user: userSlice,
  product: productSlices,
});

export default rootReducer;
