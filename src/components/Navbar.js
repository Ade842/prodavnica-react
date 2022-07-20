import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth} from "../config/config";
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import {CartContext} from "../global/CartContext";

export const Navbar= ({ user }) => {

    const history = useHistory();
    const { totalQty } = useContext(CartContext);

    const logout =() =>{
        auth.signOut().then(()=>{
         history.push('/login');
    })
}


    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }
    return (
        <div className='navbox'>
            <div className='lijevastrana'>
                <img src="/slike/korpazanaslova.jpg" alt="" />
            </div>
            {!user && <div className='desnastrana'>
                <span><Link to="singup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>}
            {user && <div className='desnastrana'>
                <span><Link to="/" className='navlink'>{user}</Link></span>
                <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                <span className='no-of-products'>{totalQty}</span>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>


    )
}