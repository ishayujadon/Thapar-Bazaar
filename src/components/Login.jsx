import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import './Login.css'

function Login(){

    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi=()=>{
        const url = 'http://localhost:4000/login';
        const data = {username,password};
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) { 
                    alert(res.data.message);
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/')
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }

    return(
        <div>
            <Header/>
            <div className="login-form justify-content-center">
                <h3>Welcome to Login Page</h3>
                <br></br>
                <h4 className=".login-title">USERNAME:</h4> 
                <input className="login-input " type="text" value={username}
                    onChange={(e) => {
                    setusername(e.target.value)
                }} />
                <br></br>
                <h4 className=".login-title">PASSWORD:</h4> 
                <input className="login-input " type="text" value={password}
                    onChange={(e) => {
                    setpassword(e.target.value)
                }} />
                <br></br>
                <button className="login-button" onClick={handleApi}>LOGIN</button>
                <Link to="/signup"><button className="login-button">SIGNUP</button></Link>
            </div>
        </div>
    )
}

export default Login;