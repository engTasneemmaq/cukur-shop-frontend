import React from 'react';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate} from 'react-router-dom';

function ShippingScreen() {
  return (
    <div>
       <h3 className='h3-shipping'>Hey👋 ,You're Welcome in Shipping Screen </h3>
       <img className='img-shipping'
       src='https://certifiedcomic.shop/wp-content/uploads/2017/06/Uline-Kraft-Mailer-For-Comic-Books.jpg' alt='imgShipping'/>
      <MessageBox>
      If You Don't want To complete Shipping Procedure. <Link to="/">Go To Home Page</Link>
            </MessageBox>
    </div>
  )
}

export default ShippingScreen;