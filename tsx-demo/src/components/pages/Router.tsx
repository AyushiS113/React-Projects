import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import NotFound from './NotFound'
import Attractions from './Attractions'
import Users from './UserTable'
import CommonContent from './CommonContent'
import UserProfile from './UserProfile'

export default function Router() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route element={<CommonContent/>}>
        <Route path="dashboard" element={<Dashboard/>}></Route>
        <Route path="profile" element={<UserProfile/>}></Route>
        <Route path="users" element={<Users/>}></Route>
        <Route path="attractions" element={<Attractions/>}></Route>
      </Route>
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
    </>
  )
}
