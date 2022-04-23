import { Router } from 'react-router-dom'
import clickMe from "../views/index"
import list from "../views/list"

const Routes = [
    {
        path: '/',
        exact: true,
        component: clickMe
    },
    {
        path: '/list',
        exact: true,
        component: list
    }
]

export default Routes
