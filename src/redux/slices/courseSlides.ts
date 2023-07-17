import { createSlice } from '@reduxjs/toolkit'
import { setLocal, getLocal } from '../../untils/localStogate';

interface CourseType{
  a: string
};

const initialState: CourseType = {
  a: 'e'
}

const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {
      nothing(state){
        state.a = 'b'
      }
    }
});

export const {
  nothing
} = ProductSlice.actions

export default ProductSlice.reducer

