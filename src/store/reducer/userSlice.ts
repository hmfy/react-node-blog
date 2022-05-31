import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {getUserInfo} from "tools/tools";

type Value = {
    name: string
    ID: number
    token: string
    expires: number
}

type initialState = {
    value: Value
}

const initialState:initialState = {
    value: getUserInfo()
}

const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<Value>) => {
            state.value = action.payload
        }
    }
})

export const { setInfo } = userSlice.actions

export default userSlice.reducer

