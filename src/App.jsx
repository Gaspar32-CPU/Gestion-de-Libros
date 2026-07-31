import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
