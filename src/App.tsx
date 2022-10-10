import './styles/App.scss';

import ProductList from './components/ProductList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Header/>
      <ProductList/>
      <ToastContainer />
      <Footer/>
    </div>
  );
}

export default App;
