import styles from '../style/login.module.css';
import MyInput from "../components/Form/MyInput";
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
export default function Login(){

    const[user, setUser] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUser(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: user,
            password: password,
            expiresInMins:60
        }
        fetLogIn(data, navigate)


    }
    return(
        <div className={styles.login_container}>
            <div className={styles.form_container}>
            <h1>Login</h1>
            <form className={styles.form_login} onSubmit={handleSubmit}>
                <input className={styles.login_input} type="text" name="user" placeholder="User" onChange={handleUserChange}></input>
                <input className={styles.login_input} type="password" name="password" placeholder="Password" onChange={handlePasswordChange}></input>
                <div>
                    <button className={styles.login_button}>Login</button>
                </div>
                {/* <button type="submit">Login</button> */}
            </form>
            </div>
        </div>
    )
}

function fetLogIn(data, navigate){
    fetch('https://dummyjson.com/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        const hasNoToken = data?.accessToken === undefined;

        if(hasNoToken){
            alert("Usuario y/o contraseña incorrectos")
            return;
        }

        localStorage.setItem("token", data.accessToken)
        navigate("/products")
    })
    .catch((error) => {
        console.log(error)
    })

}