import React from 'react'
import { Routes, Route } from 'react-router-dom';  // ✅ Router HATA DIYA!
import FirstPage from './Components/FirstPage/FirstPage'
import UserReg from './Components/UserReg/UserReg'
import Admin from './Components/Adminlogin/Admin'
import DashboardPage from './Components/AdminPage/Admin'
import ClientPage from './Components/ClientPage/ClientPage'
import List from './Components/ListofClientData/List'
import UploadPage from './Components/UploadPage/UploadPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<FirstPage />} />
      <Route path='/user-register' element={<UserReg />} />
      <Route path='/admin-login' element={<Admin />} />
      <Route path='/admin-dashboard' element={<DashboardPage />} />
      <Route path='/client-page' element={<ClientPage />} />
      <Route path='/list/:userId' element={<List />} />
      <Route path='/upload-page/:userId' element={<UploadPage />} />
    </Routes>
  )
}

export default App;
