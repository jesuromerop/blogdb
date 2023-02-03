import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { postLoginDetails } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
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
        console.log({ email, password });
        let result = await postLoginDetails(email, password);
        setPassword("");
        setEmail("");

        if(result) {
            navigate("/blog");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="card m-5 ">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h1 className="mb-3 text-center">Iniciar Sesión</h1>
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
                                placeholder="Contraseña" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mr-0">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;