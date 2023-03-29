import React from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import Router from './components/pages/Router'
function App() {
    const Token = localStorage.getItem('accessToken')
    const AuthToken = `Bearer ${Token}`
   
    if(Token != null ){
        axios.defaults.headers.common['Authorization'] = AuthToken
    }

    return (
        <div className="App">
            <BrowserRouter>
              <Router />
            </BrowserRouter>
        </div>
    )
}

export default App
