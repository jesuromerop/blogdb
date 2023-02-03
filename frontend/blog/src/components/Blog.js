import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { getPosts } from '../api/crud';
import { Link } from "react-router-dom";

function Blog() {
  const [ data, setData ] = useState([]);
  const [ months ] = useState(["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"])

  useEffect( () => {
    const posts = async () => {
        const result = await getPosts();
        if (result.success) {
          setData(result);
        }
    }
    posts()
  }, []);

  return (
    <div>
      <Navbar />
      {data.data ? data.data.map((d, idx) => {
        let date = new Date(d.regDate);
        return (
          <div className="card my-3 mx-auto shadow" key={idx} style={{maxWidth: "540px"}}>
            <div className="row no-gutters">
                <div className="col-md-12">
                    <div className="card-body">
                        <Link to={`/postview/${d.IDBlog}`} style={{textDecoration: "none", color: "inherit"}}>
                            <h3 className="card-title mb-1">{d.title}</h3>
                            <p className="card-text mb-0" style={{fontSize: "20px"}}><small className="text-muted blockquote-footer">{d.name}</small></p>
                            <p className="card-text ml-4 mt-0" style={{fontSize: "14px"}}><small className="text-muted">{date.getDate()} {months[parseInt(date.getMonth())]} {date.getFullYear()}</small></p>
                        </Link>
                    </div>
                </div>
            </div>
          </div>
        )
      }) :
      <div className="p-5 bg-secondary">
        <div className="align-center text-center"><h3 className="align-middle ">No hay publicaciones para mostrar :(</h3></div>
      </div>
    }
      
    </div>
  );
}

export default Blog;