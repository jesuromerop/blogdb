import React, { useState, useEffect } from 'react';
import { getPost } from '../api/crud';
import { useParams } from "react-router-dom";
import Navbar from './Navbar';

function PostView() {
    const [post, setPost] = useState("");
    const [date, setDate] = useState("");
    const [ months ] = useState(["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"])
    const params = useParams();

    useEffect( () => {
        const post = async () => {
            let { id } = params;
            const result = await getPost(id);
            if (result.success) {
              console.log(result)
              setPost(result.data);
              setDate(new Date(result.data.regDate))
            }
        }
        post()
      }, [params]);

    return (
        <>
            <Navbar />
            {post &&
                <div className="card mb-4 pb-4 mx-auto p-3 shadow mt-4" style={{maxWidth: "540px"}}>
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            <div className="card-body m-0 p-0">
                                <h3 className="card-title mb-1 ml-3">{post.title}</h3>
                                <p className="card-text mb-0 ml-4"><small className="text-muted blockquote-footer">{post.name}</small></p>
                                <p className="card-text ml-4 mt-0"><small className="text-muted">{date.getDate()} {months[parseInt(date.getMonth())]} {date.getFullYear()}</small></p>
                                <p className="card-text text mx-4">{post.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </>
    );
}

export default PostView;