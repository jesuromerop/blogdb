import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const [ isAuth, setIsAuth ] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [])               

    const gotoHomePage = () => navigate("/");
    const gotoSignUpPage = () => navigate("/signup");
    const gotoLoginPage = () => navigate("/login");
    const gotoProfilePage = () => navigate("/profile");
    const gotoPostPage = () => navigate("/post");

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand onClick={gotoHomePage}>Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {!isAuth &&
                        <>
                            <Nav.Link onClick={gotoHomePage}>Inicio</Nav.Link>
                            <Nav.Link onClick={gotoLoginPage}>Iniciar sesión</Nav.Link>
                            <Nav.Link onClick={gotoSignUpPage}>Registro</Nav.Link>
                        </>
                    }
                        
                    {isAuth &&
                        <>
                            <Nav.Link onClick={gotoPostPage}>Agregar publicación</Nav.Link>
                            <NavDropdown title="Usuario" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={gotoProfilePage}>Perfil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleSignOut}>
                                    Cerrar sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;