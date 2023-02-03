import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;

export const postLoginDetails = async (email, password) => {
    try {
        const res = await axios.post(`${REACT_APP_BACKEND_URL}/login`, {
            email: email,
            pass: password
        })
        
        console.log(res.data)
        if(res.status === 200) {
            if (res.data.success) {
                localStorage.setItem('token', res.data.token)
            }
            else {
                alert(res.data.msg)
            }
            return res.data.success
        } else {
            return false
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};

export const postSignup = async (name, email, password) => {
    try {
        const res = await axios.post(`${REACT_APP_BACKEND_URL}/register`, {
            name: name,
            email: email,
            pass: password
        })
        
        console.log(res.data)
        if(res.status === 200) {
            if (res.data.success) {
                alert(res.data.msg);
                return true
            }
            else {
                alert(res.data.msg)
            }
            
        } else {
            return false
        }
            
    } catch (e) {
        console.log(e);
        alert("Ha ocurrido un error");
    }
        
};