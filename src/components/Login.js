import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {auth} from "../config/config";



export const Login = (props)=>{

    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, Password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            props.history.push('/');
        }).catch(err => setError(err.message));
    }
    return (

            <div className='container'>
                <br />
                <h2>PRIJAVA</h2>
                <br />
                <form autoComplete="off" className='form-group' onSubmit={login}>

                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                           onChange={(e) => setEmail(e.target.value)} value={email} />
                    <br />
                    <label htmlFor="passowrd">Šifra</label>
                    <input type="password" className='form-control' required
                           onChange={(e) => setPassword(e.target.value)} value={Password} />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>PRIJAVA</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
                <br />
                <span>Ukoliko želite napraviti račun idite
                <Link to="singup"> Ovdje</Link>
            </span>

        </div>
    )
}