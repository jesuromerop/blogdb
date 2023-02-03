import React, { useState } from 'react';
import { createPost } from '../api/crud';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

function Post() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ title, description });
        let result = await createPost(title, description);
        setTitle("");
        setDescription("");

        if(result.success) {
            alert(result.msg);
            navigate("/blog");
        }
    };

    return (
        <>
            <Navbar />
            <div className="mt-5 mx-auto container">
                <div className="card mb-3 mx-auto" style={{width: "32rem"}}>
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            <div className="card-body">
                                <h3 className="mx-auto mb-4">Crear publicacion</h3>
                                <form>
                                        
                                    <div className="form-group mb-3">
                                        <label htmlFor="title" className="mb-2">Ingresa el titulo</label>
                                        <input 
                                            type="nombre" 
                                            className="form-control" 
                                            id="title" 
                                            name="title"
                                            value={title}
                                            required
                                            placeholder="Titulo" 
                                            onChange={(e) => setTitle(e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2">Decripción</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                            </div>
                                            <textarea 
                                                className="form-control rounded" 
                                                aria-label="Decripción" 
                                                id="description" 
                                                name="description" 
                                                value={description} 
                                                required
                                                onChange={(e) => setDescription(e.target.value)} 
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" onClick={handleSubmit} id="bt" className="btn btn-primary mr-0">Crear</button>                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    );
}

export default Post;