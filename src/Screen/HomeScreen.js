import axios from 'axios';
import React,{useState, useEffect, useReducer} from 'react'
import { Col, Row } from 'react-bootstrap';
import logger from 'use-reducer-logger';
import Product from '../components/Product';
import {Helmet} from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


//define reducer function

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  //replace state hook to reducer hook>>>>>>>>>>>>>>
  //use reducer>>>
  const [{loading, error, products},
    dispatch]= useReducer(logger(reducer),{
   products:[],
   loading: true,
   error: '',
 } )

 //use dispstch to update state>>>>
 useEffect(() => {
 const fetchData = async ()=>{
   dispatch({type: 'FETCH_REQUEST'});
   try{
     const result = await axios.get ('http://localhost:5000/product')
     dispatch({type: 'FETCH_SUCCESS', payload: result.data});
   
   }catch(err){
     dispatch({type: 'FETCH_FAIL', payload: err.message});
   }
 };
 fetchData();
 }, []);

    
  return (
    <div>
      <Helmet>
        <title>CUKUR Store</title>
      </Helmet>
      <img src="https://mostly-books.co.uk/wp-content/uploads/2022/01/Mostly-Books-7-scaled-1640x634.jpg" />
      <h1 className='title'>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
          {products.map((product, index) => (
            <Col sm={3} md={5} lg={3} className="mb-3">
           <Product product={product} id={index}></Product>
            </Col>
          ))}
        </Row>
  )}
      </div>
    </div>
  )
}

export default HomeScreen