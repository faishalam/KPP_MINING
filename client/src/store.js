import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import assetReducer from './features/asset/assetSlice'


// konfigurasi redux store dari reduxjs/toolkit -> membuat store redux
export default configureStore({
    reducer: { //konfigurasi store dengan reducer 
        user: userReducer, //Reducer ini bertanggung jawab untuk memperbarui state dari user dan asset di store global.
        asset: assetReducer
    }
})