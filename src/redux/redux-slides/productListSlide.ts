import { createSlice } from '@reduxjs/toolkit'
import { setLocal, getLocal } from '../../untils/localStogate';

const listCart = getLocal('cart') ? JSON.parse(getLocal('cart')) : [];
const historyOrderList = getLocal('historyArr') ? JSON.parse(getLocal('historyArr')) : [];
const favorListArr = getLocal('favorList') ? JSON.parse(getLocal('favorList')) : [];

const initialState = {
    listProduct: [],
    productDetail: {},
    cartList: listCart,
    orderHistoryList: historyOrderList,
    favorList: favorListArr,
}

const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {
        setListProduct: (state, action) => {
            state.listProduct = action.payload;
        },
        setProductDetail: (state, action) => {
            state.productDetail = action.payload
        },
        setHistoryOrder: (state, action) => {
            state.orderHistoryList.push(action.payload)

            setLocal('historyArr',
                JSON.stringify([...state.orderHistoryList, { list: action.payload.list, date: action.payload.date }]))
        },
        setToCart: (state, action) => {
            const indexById = state.cartList.findIndex((product: any) => product.id === action.payload.id);
            if (indexById === -1) {
                state.cartList.push(action.payload)
            } else {
                state.cartList[indexById] = action.payload
            }
        },
        changeCount: (state, action) => {
            const indexById = state.cartList.findIndex((product: any) => product.id === action.payload.id);
            state.cartList[indexById].count = action.payload.value;
        },
        removeProdCart: (state, action) => {
            const indexById = state.cartList.findIndex((product: any) => product.id === action.payload);
            state.cartList.splice(indexById, 1)

            setLocal('cart', JSON.stringify(state.cartList))
        },
        setFavorList: (state, action) => {
            const indexById = state.favorList.findIndex((product: any) => product.id === action.payload.id);
            if (indexById === -1) {
                state.favorList.push(action.payload)
            } else {
                state.favorList.splice(indexById, 1)
            }
            setLocal('favorList', JSON.stringify(state.favorList))
        },
    }
});

export const {
    setListProduct,
    setProductDetail,
    setFavorList,
    setToCart,
    changeCount,
    removeProdCart,
    setHistoryOrder,

} = ProductSlice.actions

export default ProductSlice.reducer

