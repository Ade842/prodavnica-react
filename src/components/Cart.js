import React, {useContext, useEffect, useState} from 'react'
import { CartContext } from '../global/CartContext'
import { Navbar } from './Navbar';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { auth } from '../config/config'

export const Cart = ({ user }) => {


    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const history = useHistory();
    const [ showTable, setShowTable ] = useState(false);

    useEffect(() => {

        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })



    return (

        <>
            <Navbar user={user} />
            <>
                {shoppingCart.length !== 0 && <h1>Vaša korpa</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>USPJEŠNO OBAVLJENO!</div>
                            <div><Link to="/">Vrati se nazada</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ArtikalID}>

                            <div className='cart-img'>
                                <img src={cart.slika} alt="not found" />
                            </div>

                            <div className='cart-name'>{cart.ime}</div>

                            <div className='cart-price-orignal'> {cart.cijena}.00</div>


                            <div className='cart-price'>
                                 {cart.TotalProductPrice}.00
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ArtikalID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))
                    }
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Vaš račun:
                        </div>

                        <div className='cart-summary-price'>

                            <span>Ukupno za plaćanje: </span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Broj artikala: </span>
                            <span>{totalQty}</span>
                        </div>


                        <br/>
                        <br/>
                        <button className='btn btn-success btn-md' onClick={() => setShowTable(!showTable)} style={{ marginTop: 5 + 'px' }}>
                            PLATI
                        </button>
                        {showTable &&
                        <form className="new-form table-form">
                            <div className='login-form'>
                                <br/>
                                Ime i prezime:
                                <div>
                                    <br />
                                    <input type="text"/>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <br/>
                                    Broj računa: <br />
                                    <input type="text"/>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    Kontakt telefon: <br />
                                    <input type="text"/>

                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <br/>
                                    Grad i adresa: <br />
                                    <input type="text"/>
                                </div>

                                  <br/>
                                <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                    ZAVRŠI PLAĆANJE
                                </button>



                            </div>
                        </form>
                        }
                    </div>}
                </div>
            </>
        </>
    )
}