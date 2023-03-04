import React,{useState, useEffect, useReducer, useContext} from 'react'
import { Link ,useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col, Row, ListGroup , Badge, Card, Button} from 'react-bootstrap';
import {Helmet} from 'react-helmet-async';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../store';

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
    const navigate= useNavigate();
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
        const result = await
         axios.get(`http://localhost:5000/product/${id}`)
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});
      
      }catch(err){
        dispatch({type: 'FETCH_FAIL', payload: err.message});
      }
    };
    fetchData();
    }, [id]);
  
    const {state, dispatch: contextDispatch}= useContext(Store);
    const {cart} = state;

    const addToCartHandler = () =>{
      const existItem = cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
   
    contextDispatch({type: 'CART_ADD_ITEM',
  payload: {...product, quantity}
   });
   navigate('/cart');
    }

      return loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
      <Row>
       <Col md={6}>
        <img
        className='img-large'
        src={product.image}
        alt={product.name}>
        </img>
       </Col>
       <Col md={3} className="img-large">
        <ListGroup variant="flush" >
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating 
            rating={product.rating}
            numReviews={product.numReviews}>
            </Rating>
          </ListGroup.Item>
          <ListGroup.Item>
            Price : ${product.price}
          </ListGroup.Item>
          <ListGroup.Item>
           Desecription :
           <p>{product.desecription}</p>
          </ListGroup.Item>
        </ListGroup>
       </Col>
       <Col md={3} className="img-large">
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ?(
                  <Badge bg="success">In Stock</Badge>
                  ) : ( 
                  <Badge bg="danger">Unavaliable</Badge>
                )}
                </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button 
                    onClick={addToCartHandler}
                    variant="primary">
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
       </Col>
      </Row>
        </div> 
      
          
  );
    };
 
  
  

export default ProductScreen;

