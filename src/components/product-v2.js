import React,{useState, useEffect, useReducer} from 'react'
import { Link ,useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Skeleton from "react-loading-skeleton";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
    //to git id from URL use a hook >> useParams from react router dom
    const params = useParams();
    const {id}= params;
   


    const [{loading, error, product},
      dispatch]= useReducer(reducer,{
     product:[],
     loading: true,
     error: '',
   } )

    //use dispstch to update state>>>>
    
  useEffect(() => {
    const fetchData = async ()=>{
      dispatch({type: 'FETCH_REQUEST'});
      try{
        const result = await axios.get(`https://e-commerce-backend-production-913d.up.railway.app/product/${id}`)
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});
      
      }catch(err){
        dispatch({type: 'FETCH_FAIL', payload: err.message});
      }
    };
    fetchData();
    }, [id]);
  
  
    const Loading = () => {
      return (
        <>
          <div className="col-md-6">
            <Skeleton height={400} />
          </div>
          <div className="col-md-6" style={{ lineHeight: 2 }}>
            <Skeleton height={50} width={300} />
            <Skeleton height={75} />
            <Skeleton height={25} width={150} />
            <Skeleton height={50} />
            <Skeleton height={150} />
            <Skeleton height={150} width={100} style={{ marginLeft: 6 }} />
          </div>
        </>
      );
    };
    const ShowProduct = () => {
      return (
        <>
          <div className="col-md-5">
            <img
             src={product.image} className="img-large" alt={product.name}
            />
          </div>
          
        </>
      );
    };
    return (
      <div className="container py-5">
        <div className="row py-4">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    );
  }
  

export default ProductScreen;


