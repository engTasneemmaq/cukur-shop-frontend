import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";
import { Store } from '../store';
import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getError } from '../getError';
import axios from 'axios';

function NavComponent() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/product/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return(
    <Navbar bg="secondary" variant="dark" expand="lg">
    <Container>
      <Button
        variant="dark"
        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
      >
        <i className="fas fa-bars"></i>
      </Button>

      <LinkContainer to="/">
        <Navbar.Brand>Cukur Book Shop</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto "></Nav>
          <Nav className="d-flex align-items-center">
          <Nav.Link as={Link} to="/cart">
            Cart
            <i className="fa fa-shopping-cart me-1"></i>
            </Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
          <Nav.Link as={Link} to="/fav">
            Fav
            </Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
          <Nav.Link as={Link} to="/signin">
            Signin
            </Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
          <Nav.Link as={Link} to="/signup">
            Signup
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
     
  );
}

export default NavComponent;