import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './HomeScreen.css'; 
import { db } from './config/firebase'; 
import { getDocs, collection } from "firebase/firestore";

const HomeScreen = () => {
  const [bedframeList, setBedframeList] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const getBedframesList = async () => {
      try {
        const bedframesCollectionRef = collection(db, "bedframes"); 
        const snapshot = await getDocs(bedframesCollectionRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBedframeList(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    getBedframesList();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to ProductDetails with product ID
  };

  return (
    <div className="home-container">
      <header className="header">
      <div className="store-name" style={{cursor: 'pointer'}} onClick={() => navigate('/home')}>Mandaue Foam</div>
        <button className="cart-button" onClick={() => navigate('/cart')}>
          <img src="src/assets/cart.png" alt="Cart" style={{ width: '24px', height: '24px' }} />
        </button>
      </header>
      <div className="banner">
        <img src="src/assets/bannerimage.png" alt="Banner" />
      </div>
      <div className="featured-products">
        {/* Map through bedframeList and render product cards */}
        {bedframeList.map((item) => (
          <div className="product-card" key={item.id} onClick={() => handleProductClick(item.id)}>
            <img src={item.main_image_url} alt="Product" />
            <div className="product-details">
              <h3>{item.productName}</h3>
              <p>{item.description}</p>
              <h4>${item.price}</h4>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer">
        <p>© 2024 Mandaue Foam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeScreen;
