import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    asset: [],
    assetById: {},
    assetByUser : []
}

export const assetSlice = createSlice({
    name: 'asset',
    initialState: initialState,
    reducers: {
        setAsset: (state, action) => {
            state.asset = action.payload
        },
        setAssetById: (state, action) => {
            state.assetById = action.payload
        },
        setAssetByUser: (state, action) => {
            state.assetByUser = action.payload
        }
    }
})

export const { setAsset, setAssetById, setAssetByUser } = assetSlice.actions

export default assetSlice.reducer