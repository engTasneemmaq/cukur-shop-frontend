import React,{useContext,useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../store';
import Rating from './Rating';
import axios from 'axios';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getItem, setItem } from "../sessionStorage";
import { api } from "../api";
import { toast, ToastContainer } from "react-toastify";

function Product(props) {
    const {product}= props;
    const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const [isFavorite, setIsFavorite] = useState(
    favorites?.some((favorite) => favorite.productId === product.id)
  );

  const newFav = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    description: product.description,
    productId: product.id,
  };

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
       navigate('/cart');
  }



  const handleAddFavoriteClick = async () => {
    if (getItem("userInfo")) {
      await api(
        `http://localhost:5000/fav`,
        "post",
        getItem("userInfo").token,
        newFav
      ).then((data) => {
        setIsFavorite(!isFavorite);
        const favorites = getItem("favorites") || [];
        setItem("favorites", [...favorites, newFav]);
      });
    } else navigate("/signin");
  };
  
  const handleDelFavoriteClick = async () => {
    let favId;

    favorites.forEach((element) => {
      if (element.productId === product.id) favId = element.id;
    });

    await api(
      `http://localhost:45000/fav/${favId}`,
      "delete",
      getItem("userInfo").token,
      ""
    ).then((data) => {
      const favorites = getItem("favorites") || [];
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.productId !== product.id
      );
      setItem("favorites", updatedFavorites);
    });
    setIsFavorite(!isFavorite);
  };


  useEffect(() => {
    const favorites = getItem("favorites") || [];
    setIsFavorite(favorites.some((favorite) => favorite.productId === product.id));
    const fetchFavorites = async () => {
      try {
        await api(
          `http://localhost:5000/fav?userId=${getItem("userInfo").id}`,
          "get",
          getItem("userInfo").token,
          ""
        ).then((data) => {
          setFavorites(data);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [isFavorite]);

  return (
    <>
    <Card key={product.id} className="product">
      <ToastContainer/>
      <div className="favorite-icon">
        {isFavorite ? (
          <FaHeart
            color="red"
            size={30}
            className="mx-3"
            onClick={handleDelFavoriteClick}
          />
        ) : (
          <FaRegHeart
            style={{ color: "#FF577F" }}
            className="mx-3"
            size={30}
            onClick={handleAddFavoriteClick}
          />
        )}
      </div>
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
          <Button onClick={() => addToCartHandler(product)}>
          Add to cart
        
          </Button>
        )}
     </Card.Body>
          </Card>
    </Card>
  </>
  )
}

export default Product;