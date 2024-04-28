import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    userMe: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUserMe: (state, action) => {
            state.userMe = action.payload
        }
    }
})

export const { setUser, setUserMe } = userSlice.actions

export default userSlice.reducer