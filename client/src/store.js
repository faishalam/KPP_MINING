import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import assetReducer from './features/asset/assetSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        asset: assetReducer
    }
})