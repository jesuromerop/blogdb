import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;

export const createPost = async (title, description) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${REACT_APP_BACKEND_URL}/post`, {
            title,
            description
        }, {'headers': { 'auth': token }     
        })
        
        console.log(res.data)
        if(res.status === 200) {
            if (res.data.success) {
                return res.data
            }
            else {
                alert(res.data.msg)
            }
            return res.data
        } else {
            return false
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};

export const getProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${REACT_APP_BACKEND_URL}/user`, {'headers': { 'auth': token }})
        
        console.log(res.data)
        if(res.status === 200) {
            if (res.data.success) {
                return res.data
            }
            else {
                alert(res.data.msg)
            }
            return res.data
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};

export const changeEmail = async (email) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.patch(`${REACT_APP_BACKEND_URL}/user/emailChange`, {email},
        {'headers': { 'auth': token }})
        
        console.log(res.data)
        if(res.status === 200) {
            alert(res.data.msg)
            if(res.data.success) localStorage.setItem('token', res.data.token)
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};

export const changePass = async (pass) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.patch(`${REACT_APP_BACKEND_URL}/user/passChange`, {pass},
        {'headers': { 'auth': token }})
        
        console.log(res.data)
        if(res.status === 200) {
            alert(res.data.msg)
            if(res.data.success) {
                return true
            }
            else return false
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};

export const changeName = async (name) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.patch(`${REACT_APP_BACKEND_URL}/user/nameChange`, {name},
        {'headers': { 'auth': token }})
        
        console.log(res.data)
        if(res.status === 200) {
            alert(res.data.msg)
            if(res.data.success) localStorage.setItem('token', res.data.token);
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};

export const getPosts = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${REACT_APP_BACKEND_URL}/posts`,
        {'headers': { 'auth': token }})
        
        console.log(res.data)
        if(res.status === 200) {
            return res.data;
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};

export const getPost = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${REACT_APP_BACKEND_URL}/post/${id}`,
        {'headers': { 'auth': token }})
        
        console.log(res.data)
        if(res.status === 200) {
            return res.data;
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};

export const deletePost = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${REACT_APP_BACKEND_URL}/post/${id}`,
        {'headers': { 'auth': token }})
        
        console.log(res.data)
        if(res.status === 200) {
            alert(res.data.msg)
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};