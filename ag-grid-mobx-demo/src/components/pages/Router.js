import React from 'react'
import Attractions from './Attractions'
import Dash from './Dash'
import Dashboard from './Dashboard'
import Login from './Login'
import NotFound from './NotFound'
import UserTable from './UserTable'
import { useRoutes } from 'react-router-dom'
import UnAuthorized from './UnAuthorized'

export default function Router() {
    let element = useRoutes([
        { path: '/', element: <Login /> },
        {
            path: 'dash',
            element: <Dash />,
            children: [
                { path: '', element: <Dashboard /> },
                { path: 'usertable', element: <UserTable /> },
                { path: 'attract', element: <Attractions /> },
            ],
        },
        { path: '/*', element: <NotFound /> },
        { path: '/unauth', element: <UnAuthorized /> },
    ])
    return element
}
