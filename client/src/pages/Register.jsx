import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username:"", email:"", password:"" });
  const navigate = useNavigate();

  const register = async () => {
    const { data } = await API.post("/auth/register", form);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e)=>setForm({...form,username:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button className="btn" onClick={register}>Register</button>
    </div>
  );
}