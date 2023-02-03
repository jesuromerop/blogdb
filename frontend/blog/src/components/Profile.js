import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { changeEmail, changePass, changeName, getProfile } from '../api/crud';
import Navbar from './Navbar';

function Profile() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect( () => {
        const profile = async () => {
            const result = await getProfile();
            if (result.success) {
                setEmail(result.data[0].userInfo.email);
                setName(result.data[0].userInfo.name);
            }
        }
        profile()
    }, []);

    const handleSubmit = async (e) => {
        if (e.target.value === "emailBtn") await changeEmail(email)
        else if (e.target.value === "nameBtn") await changeName(name)
        else if (e.target.value === "passBtn") {
            let res = await changePass(password);
            if (res) {
                alert("Inicia sesión nuevamente");
                localStorage.removeItem('token');
                navigate("/");
            }
        }
    }

    return (
        <>
            <Navbar /> 
            <div className="container mx-auto mt-5">
                <div className="card mb-3 mx-auto p-2" style={{maxWidth: "540px"}}>
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            <div className="card-body">
                                <div className="mx-auto w-100 mb-3" id="profile">
                                    <h1 className="text-center">Perfil</h1>
                                    <label htmlFor="name">Nombre</label>
                                    <input 
                                        type="text" 
                                        className="form-control my-1"
                                        id="name" 
                                        name="name"
                                        value={name}
                                        required
                                        placeholder="Nombre" 
                                        onChange={(e) => setName(e.target.value)}    
                                    />
                                    <label htmlFor="email">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        className="form-control my-1"
                                        id="email" 
                                        name="email"
                                        value={email}
                                        required
                                        placeholder="Correo electrónico" 
                                        onChange={(e) => setEmail(e.target.value)}    
                                    />
                                    <label htmlFor="pass">Contraseña</label>
                                    <input 
                                        type="password" 
                                        className="form-control my-1"
                                        id="pass" 
                                        name="pass"
                                        value={password}
                                        required
                                        minLength={8}
                                        placeholder="Contraseña" 
                                        onChange={(e) => setPassword(e.target.value)}    
                                    />
                                </div>
                                <div className="container mx-auto">
                                    <button className="btn btn-dark" value="nameBtn" onClick={handleSubmit}>
                                        Cambiar nombre
                                    </button>
                                    <button className="btn btn-dark mx-1" value="emailBtn" onClick={handleSubmit}>
                                        Cambiar correo
                                    </button>
                                    <button className="btn btn-dark" value="passBtn" onClick={handleSubmit}>
                                        Cambiar contraseña
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
    