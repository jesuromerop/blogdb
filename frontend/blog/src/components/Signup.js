import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import { postSignup } from '../api/auth';

function Login() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
          if (localStorage.getItem("token")) {
            navigate("/blog");
          }
        };
        checkUser();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await postSignup(name, email, password);
        setName("");
        setPassword("");
        setEmail("");

        if(result) {
            navigate("/login");
        }
    };

    const gotoSignUpPage = () => navigate("/signup");

    return (
        <div>
            <Navbar />
            <div className="card my-5 mx-auto shadow p-2" style={{maxWidth: "540px", height: "100%"}}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h2 className="mb-3 text-center">Registrate</h2>
                        <div className="mb-3 form-group">
                            <label htmlFor="name">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="name" 
                                name="name"
                                value={name}
                                required
                                placeholder="Nombre completo" 
                                onChange={(e) => setName(e.target.value)}    
                            />
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                className="form-control"
                                id="email" 
                                name="email"
                                value={email}
                                required
                                placeholder="Correo" 
                                onChange={(e) => setEmail(e.target.value)}    
                            />
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="pass">Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="pass" 
                                name="pass"
                                value={password}
                                required
                                minLength={8}
                                placeholder="Contraseña" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" onClick={gotoSignUpPage} className="btn btn-primary mr-0">Registrarme</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;