import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NavComponent from './components/NavComponent';
import CartScreen from './Screen/CartScreen';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import SigninScreen from './Screen/SigninScreen';
import SignupScreen from './Screen/SignupScreen';
import FavScreen from './Screen/FavScreen'
import ShippingScreen from './Screen/ShippingScreen';



function App() {

  return (
    <BrowserRouter>
        <div className="d-flex flex-column site-container">
    <NavComponent/>
        <main>
            <Routes>
            <Route path='/product/:id' element={<ProductScreen/>}></Route>
                <Route path='/' element={<HomeScreen/>}></Route>
                <Route path="/cart" element={<CartScreen/>} />
                <Route path="/signin" element={<SigninScreen/>} />
                <Route path="/signup" element={<SignupScreen/>} />
                <Route path="/fav" element={<FavScreen/>} />
                <Route path="/shipping" element={<ShippingScreen/>} />



            </Routes>
            </main>
            <footer>
      <div className="text-center">
      &copy;Tasneem-Developer 2023
      </div></footer>
    </div>
    </BrowserRouter>
  )
}

export default App
