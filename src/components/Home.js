import React, {useEffect} from 'react';
import '../components/Home.css'
import {Navbar} from "./Navbar";
import {Products} from "./Products";
import {useHistory} from "react-router";
import {auth} from "../config/config";

export const Home = ({ user }) => {

    const history = useHistory();

    useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })

    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <Products />
        </div>
    )
}