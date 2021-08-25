import React from 'react'
import { ToastContainer } from 'react-toastify'

import { TaxForm } from './components/Views'
function App() {
  return (
    <>
      <ToastContainer autoClose={5000} hideProgressBar />
      <TaxForm />
    </>
  )
}

export default App
