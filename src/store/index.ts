import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer/counterSlice'
import loginReducer from './reducer/loginSlice'
import UserReducer from './reducer/userSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        isLogin: loginReducer,
        userInfo: UserReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch