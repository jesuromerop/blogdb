import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { changeEmail, changePass, changeName, getProfile, deletePost } from '../api/crud';
import Navbar from './Navbar';

function Profile() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [posts, setPosts] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const profile = async () => {
            const result = await getProfile();
            if (result.success) {
                console.log(result)
                setEmail(result.data[0].userInfo.email);
                setName(result.data[0].userInfo.name);
                setPosts(result.data[0].userPosts);
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

    const fetchPosts = async () => {
        const result = await getProfile();
        if (result.success) {
            console.log(result)
            setPosts(result.data[0].userPosts);
        }
    }

    const handleEdit = (e) => {
        navigate(`/editpost/${e.target.value}`);
    } 

    const handleDelete = async (e) => {
        await deletePost(e.target.value);
        fetchPosts();
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-5">
                <div className="card mb-3 mx-auto p-2" style={{ maxWidth: "540px" }}>
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            <div className="card-body">
                                <div className="mx-auto w-100 mb-3" id="profile">
                                    <h2 className="text-center m-0">Perfil</h2>
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
                                        placeholder="**********"
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
                <div className="card mb-3 mx-auto p-2" style={{ maxWidth: "540px" }}>
                    <h4 className="text-center">Publicaciones</h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">Titulo</th>
                                <th scope="col" className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {Array.isArray(posts) ? posts.map((p, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td style={{ wordWrap: "break-word" }}><p>{p.title}</p></td>
                                        <td className="mr-0 text-center w-50">
                                            <button type="button" className="btn btn-warning mx-3" value={p.IDBlog} onClick={handleEdit}>Editar</button>
                                            <button type="button" className="btn btn-danger mr-0" value={p.IDBlog} onClick={handleDelete}>Eliminar</button>
                                        </td>
                                    </tr>)
                            }): 
                            <tr>
                                <td className="mr-0 text-center" colSpan={2}>
                                    <h6>No hay publicaciones para mostrar</h6>
                                </td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Profile;
