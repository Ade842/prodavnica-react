
import React, {useContext} from 'react';
import {ProductsContext} from "../global/ProductsContex";
import {CartContext} from "../global/CartContext";






export const Products = ()=>{
    const {products}= useContext(ProductsContext);
    //console.log(products);
    //const data=useContext(CartContext);
    //console.log(data);
    const {dispatch}=useContext(CartContext);
    return (


        <>
            {products.length !== 0 && <h1>Proizvodi koje možete naručiti</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>Učitavamo proizvode</div>}
                {products.map(product => (
                    <div className='product-card' key={product.artikalID}>
                        <div className='product-img'>
                            <img src={product.slika} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ime}
                        </div>
                        <div className='product-price'>
                             {product.cijena}.00
                        </div>
                        <button className='addcart-btn'  onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.artikalID, product })} >DODAJ U KORPU</button>
                    </div>
                ))}
            </div>
        </>


    )
}

