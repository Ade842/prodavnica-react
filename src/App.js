import React, {Component} from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom";
import {Home} from "./components/Home";
import '../src/index.css'
import {AddProducts} from "./components/AddProducts";
import {ProductsContextProvider} from "./global/ProductsContex";
import {Singup} from "./components/Singup";
import {Login} from "./components/Login";
import {auth, db} from "./config/config";
import {CartContextProvider} from "./global/CartContext";
import {Cart} from "./components/Cart";

export  class App extends Component{

    state = {
        user: null,
    }

    componentDidMount() {

        // uzima info od usera za navbar
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SingedUpUserData').doc(user.uid).
                get().then(snapshot => {
                    this.setState({
                       user: snapshot.data().ime
                   })
                })
            }
            else {
                this.setState({
                    user: null
                })
            }
        })

    }


  render(){
    return(
        <div>

        <ProductsContextProvider>
            <CartContextProvider>

          <BrowserRouter>
              <Switch>
                  <Route exact path ='/' component={() => <Home user={this.state.user} />}/>
                  <Route path ='/addproducts' component={AddProducts}/>
                  <Route path ='/singup' component={Singup}/>
                  <Route path ='/login' component={Login}/>
                  <Route path="/cartproducts" component={() => <Cart user={this.state.user} />} />
                  {/* add products */}
                  <Route path="/addproducts" component={AddProducts} />
                  {/* cashout */}




              </Switch>
          </BrowserRouter>
            </CartContextProvider>
        </ProductsContextProvider>
        </div>
    )
  }
}
export default App;
