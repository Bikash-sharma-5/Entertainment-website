import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div  className='min-h-screen min-w-full bg-gradient-to-r from-[#4d4855] to-[#000000]" flex=1 flex-wrap content-between backdrop-blur-sm ' >
      <div className='min-w-full'>
        <Header />
        <main className='flex=1'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
