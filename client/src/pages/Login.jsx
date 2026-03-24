import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    const { data } = await API.post("/auth/login", form);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button className="btn" onClick={login}>Login</button>
    </div>
  );
}