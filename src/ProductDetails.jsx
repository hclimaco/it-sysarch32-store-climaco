import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './config/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDocRef = doc(db, 'bedframes', id);
        const productSnapshot = await getDoc(productDocRef);
        if (productSnapshot.exists()) {
          const data = productSnapshot.data();
          setProduct(data);
          setMainImage(data.main_image_url);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const bedframesCollectionRef = collection(db, 'bedframes');
        const snapshot = await getDocs(bedframesCollectionRef);
        const relatedProductsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRelatedProducts(relatedProductsData.filter(item => item.id !== id)); // Exclude current product
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product, id]);

  const changeMainImage = (newImage) => {
    setMainImage(newImage);
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-details-container">
      <div className="header">
        <div className="store-name" style={{cursor: 'pointer'}} onClick={() => navigate('/home')}>Mandaue Foam</div>
        <button className="cart-button" onClick={() => navigate('/cart')}>
          <img src="http://localhost:5173/src/assets/cart.png" alt="Cart" style={{ width: '24px', height: '24px' }} />
        </button>
      </div>
      {product && (
        <div className="product-main-content">
          <div className="product-images">
            <div className="main-image">
              <img src={`http://localhost:5173/` + mainImage} alt="Product" />
            </div>
            <div className="thumbnail-images">
              {product.image1_url && (
                <img
                  src={`http://localhost:5173/` + product.image1_url}
                  alt="Thumbnail 1"
                  onClick={() => changeMainImage(product.image1_url)}
                />
              )}
              {product.image2_url && (
                <img
                  src={`http://localhost:5173/` + product.image2_url}
                  alt="Thumbnail 2"
                  onClick={() => changeMainImage(product.image2_url)}
                />
              )}
            </div>
          </div>
          <div className="product-info">
            <h2>{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Size: {product.size}</p>
            <p>Description: {product.description}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      )}
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="featured-products">
          {relatedProducts.map((item) => (
            <div className="product-card" key={item.id} onClick={() => handleRelatedProductClick(item.id)}>
              <img src={`http://localhost:5173/` + item.main_image_url} alt="Product" />
              <div className="product-details">
                <h3>{item.productName}</h3>
                <p>{item.description}</p>
                <h4>${item.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 Mandaue Foam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductDetails;
