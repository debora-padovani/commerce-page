import './styles/App.scss';

import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductEdit from './components/ProductEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<ProductList/>} />
          <Route path='/product-details' element={<ProductDetails/>} />
          <Route path='/product-edit' element={<ProductEdit/>} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
