import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CartScreen from './Screen/CartScreen';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';



function App() {

  return (
    <BrowserRouter>
        <div className="d-flex flex-column site-container">
        <header>
        <Navbar bg="secondary" variant="dark">
            <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>CUKUR Book Shop</Navbar.Brand>
            </LinkContainer>
            </Container>
            </Navbar>
        </header>
        <main>
            <Routes>
            <Route path='/product/:id' element={<ProductScreen/>}></Route>
                <Route path='/' element={<HomeScreen/>}></Route>
                <Route path="/cart" element={<CartScreen/>} />
            </Routes>
            </main>
            <footer>
      <div className="text-center">
      &copy;Tasneem-Developer 2022
      </div></footer>
    </div>
    </BrowserRouter>
  )
}

export default App