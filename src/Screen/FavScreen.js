import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { api } from "../api";
import { getItem, setItem } from "../sessionStorage";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const deleteHandler = async (item) => {
   
    await api(
      `http://localhost:5000/fav/${item.id}`,
      "delete",
      getItem("userInfo").token,
      ""
    ).then((data) => {
      const favorites = getItem("favorites") || [];
     
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.itemId !== item.id
      );
     
      setItem("favorites", updatedFavorites);
      setDeleted(!deleted);
    });
  };

  useEffect(() => {
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
  }, [deleted]);

  return (
    <div className="favorites">
      <h2 className="mx-5">Favorite Products</h2>
      {favorites.length === 0 ? (
        <p>You haven't favorited any products yet.</p>
      ) : (
        <Row>
          <div className="d-flex flex-wrap justify-content-center">
            {favorites.map((product) => (
              <Col sm={6} md={4} lg={3} className="mb-3">
                <Card key={product.id} className="product">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  ></img>
                  <br />

                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>

                    <Card.Text>JD{product.price}</Card.Text>
                    <Card.Text>{product.description}</Card.Text>

                    <Button
                      className="general-btn"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        </Row>
      )}
    </div>
  );
}


