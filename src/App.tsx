import './styles/App.scss';

import ProductList from './components/ProductList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <ProductList/>
      <ToastContainer />
    </div>
  );
}

export default App;
