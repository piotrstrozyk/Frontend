import { useState } from "react";
import LoginForm from "./components/Login/LoginForm";
import RegistrationForm from "./components/Login/RegistrationForm";
import MainPage from "./components/MainPage/MainPage";
import { Routes, Route, useLocation, Link, useNavigate, BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import LoginPage from "./components/Login/LoginPage";
import Navbar from "./components/NavBar";
import Profile from "./components/Profile";
import './assets/main.css';
import BookDetails from './components/Details/BookDetails';
import AdminAdd from "./components/Admin/Admin";
import Stats from "./components/Statistics/Stats";
import UsersTable from "./components/Admin/UserDelete";
import CommentsTable from "./components/Admin/CommentsDelete";
import { UserProvider } from './components/Context.jsx';

function App() {
  return (
    <div>
      <UserProvider>
      <Navbar/>
    <Routes>
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path='/' element={<MainPage/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<LoginPage/>}/>
      <Route path="/admin/add" element={<AdminAdd/>}/>
      <Route path="/admin/edit" element={<AdminAdd/>}/>
      <Route path="/admin/delete" element={<AdminAdd/>}/>
      <Route path="/admin/users" element={<UsersTable/>}/>
      <Route path="/admin/comments" element={<CommentsTable/>}/>
      <Route path="/stats" element={<Stats/>}/>


    </Routes>
    </UserProvider>
  </div>
  );
}

export default App;
