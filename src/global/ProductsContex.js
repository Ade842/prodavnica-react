import React,{createContext} from 'react';
import {db} from '../config/config';

export const ProductsContext=createContext();
export class ProductsContextProvider extends React.Component{

    state={
        products:[]
    }
    componentDidMount() {
        const prevProducts=this.state.products;
        db.collection('artikli').onSnapshot(snapshot => {
            let changes=snapshot.docChanges();
            changes.forEach(change=>{
                if(change.type==='added'){
                    prevProducts.push({
                        artikalID: change.doc.id,
                        ime: change.doc.data().ime,
                        cijena: change.doc.data().cijena,
                        slika: change.doc.data().slika,
                    })
                }
                this.setState({
                    products:prevProducts
                })
            })
        })
    }
    render() {
        return (
            <ProductsContext.Provider value={{products: [...this.state.products]}}>
                {this.props.children}
            </ProductsContext.Provider>
        )

    }
}


