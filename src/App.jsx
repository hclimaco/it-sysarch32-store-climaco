import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import ProductDetails from './ProductDetails';

function App() {

  return (
    <Router>
      <>
        <Routes>
          <Route path="/home" exact element={<HomeScreen />} />
          <Route path="/product/:id" exact element={<ProductDetails />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
