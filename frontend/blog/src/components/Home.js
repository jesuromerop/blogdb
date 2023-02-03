import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (localStorage.getItem("token")) {
        navigate("/blog");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="p-5 bg-secondary">
        <h1 className="text-center fs-4">Inicia sesión para ver las publicaciones</h1>
      </div>
    </div>
  );
}

export default Home;