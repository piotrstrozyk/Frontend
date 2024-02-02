import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
//import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
//import "./login.module.css";
function LoginPage() {
  const [view, setView] = useState("login");
  return (
    <div className="login-form">
      <nav>
        <h3
          onClick={() => setView("login")}
          style={{ color: view === "login" ? "#fff" : "" }}
        >
          Login
        </h3>
        <h3
          onClick={() => setView("register")}
          style={{ color: view === "register" ? "#fff" : "" }}
        >
          Register
        </h3>
      </nav>
      {view === "login" ? <LoginForm /> : <RegistrationForm />}
    </div>

  );
}

export default LoginPage;
