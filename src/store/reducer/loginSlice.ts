import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {getUserInfo} from "tools/tools";
import {userInfo} from "os";

const { expires, token } =  getUserInfo()

export interface LoginState {
    value: boolean
}

const initialState: LoginState = {
    value: !!token && (Date.now() < expires)
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: state => {
            state.value = true
        },
        quit: state => {
            state.value = false
            localStorage.removeItem('userInfo')
        },
        changeLogin: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    }
})

export const { login, quit, changeLogin } = loginSlice.actions

export default loginSlice.reducer