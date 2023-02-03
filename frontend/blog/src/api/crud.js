import axios from 'axios';

export const createPost = async (title, description) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post("http://localhost:3002/post", {
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
        const res = await axios.get("http://localhost:3002/user", {'headers': { 'auth': token }})
        
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
        const res = await axios.patch("http://localhost:3002/user/emailChange", {email},
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
        const res = await axios.patch("http://localhost:3002/user/passChange", {pass},
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
        const res = await axios.patch("http://localhost:3002/user/nameChange", {name},
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