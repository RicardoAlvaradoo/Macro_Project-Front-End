import react from 'react'
import  {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Register from "./pages/Register"
import Landing from "./pages/Landing"
import NotFound from "./pages/NotFound"
import './styles/App.css'
function Logout(){
  localStorate.clear()
  return <Navigate to ="/login"/>
}
function RegisterAndLogout(){
  localStorate.clear()
  return <Register/>
}
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing /> } />
      <Route path="/login" element={<Login />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="/register" element={<RegisterAndLogout/>}/>
      <Route path="*" element={<NotFound/>}></Route>
      
     </Routes>
    </BrowserRouter>
  
  )  
}

export default App
