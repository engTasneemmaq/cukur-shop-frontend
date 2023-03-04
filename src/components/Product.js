import React,{useContext} from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../store';
import Rating from './Rating';
import axios from 'axios';


function Product(props) {
    const {product}= props;
    const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;


  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`http://localhost:5000/product/${item.id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    contextDispatch({type: 'CART_ADD_ITEM',
      payload: {...item, quantity}
       });
  }


  return (
      <Card className="product" key={product.id}>
      <Link to={`/product/${product.id}`}>
     <img src={product.image} className="card-img-tap" alt={product.name}/>
     </Link>
     <Card.Body>
     <Link to={`/product/${product.id}`}>
     <Card.Title> {product.name}</Card.Title>
     </Link>
     <Rating rating={product.rating} numReviews={product.numReviews}/>
     <Card.Text> <strong>${product.price}</strong></Card.Text>
     {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
     </Card.Body>
     </Card>
  )
}

export default Product;