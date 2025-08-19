import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../main-page/mainPage'
import ContactPage from '../contact-page/contactPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/Home' element={<MainPage />} />
        <Route path='Contact' element={<ContactPage />} />
    </Routes>
  )
}

export default AppRoutes