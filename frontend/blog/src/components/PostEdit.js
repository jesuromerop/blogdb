import React, { useEffect, useState } from 'react';
import { getPost, editPost } from '../api/crud';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar';

function PostEdit() {
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const post = async () => {
            let { id } = params;
            const result = await getPost(id);
            if (result.success) {
                setPost(result.data);
            }
        }
        post();
    }, [params]);

    const handleSubmit = async (e) => {
        let { id } = params;
        e.preventDefault();
        let result = await editPost(id, post);
        if(result.success) {
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
                                <h3 className="mx-auto mb-4 text-center">Editar publicación</h3>
                                <form>
                                        
                                    <div className="form-group mb-3">
                                        <label htmlFor="title" className="mb-2">Título</label>
                                        <input 
                                            type="nombre" 
                                            className="form-control" 
                                            id="title" 
                                            name="title"
                                            value={post.title}
                                            required
                                            placeholder="Titulo" 
                                            onChange={(e) => setPost({...post, title: e.target.value})} 
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
                                                value={post.description} 
                                                required
                                                onChange={(e) => setPost({...post, description: e.target.value})} 
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" onClick={handleSubmit} id="bt" className="btn btn-primary mr-0">Actualizar</button>                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    );
}

export default PostEdit;