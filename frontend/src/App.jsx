import Dashboard from "./pages/Dashboard"
import Send from "./pages/Send"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path='/signup' element={<SignUp/>} />
              <Route path='/signin' element={<SignIn/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/send' element={<Send/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
