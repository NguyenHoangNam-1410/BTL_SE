// import { useState } from 'react'
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import HomePage from "./Page/Home/Home.jsx";
import ChooseRole from "./Page/Role/Role.jsx";
import Login from "./Page/Login/Login.jsx";
import User_HomePage from "./Page/Home_User/Home_User.jsx";
import PrintPage from "./Page/Print/PrintPage.jsx";
import PrintConfig from "./Page/Print/PrintConfig.jsx";
import Login_Admin from "./Page/Login/Login_Admin.jsx";
import Admin_HomePage from "./Page/Home_Admin/Home_Admin.jsx";

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/chooseRole" element={<ChooseRole/>}/>
      <Route path="/login/user" element={<Login/>}/>
      <Route path="/Homepage/User" element={<User_HomePage/>}/>
      <Route path="/Print" element={<PrintPage/>}/>
      <Route path="/Print/PrintConfig" element={<PrintConfig/>}/>
      <Route path="/login/admin" element={<Login_Admin />} />
<Route path="/Homepage/Admin" element={<Admin_HomePage />} />
    </Routes>
    </Router>
  );
}

export default App
