import api from "../api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import ProductItem from './ProductItem';

import {Grid, Button} from '@mui/material';

type productType = {
  title: string
  thumbnail: string
  id: number
  price: number
}

function ProductList() {

    const getProducts = async () => {
        try {
            const response = await api.get('/products?limit=12');
            setAllProducts(response.data.products);
          } catch (error) {
            console.error(error);
            toast.error('tivemos um erro, tente novamente mais tarde', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
    };
    const [ allProducts, setAllProducts ] = useState([]);


    useEffect(()=>{
      getProducts();
  }, [])

  return (
    <div className="app-index">
        <Grid container spacing={2}>
            {allProducts.map((product: productType) => {
                return  <Grid item xs={6} md={4} lg={3}
                key={product.id}>
                  <ProductItem 
                    thumbnail={product.thumbnail} 
                    title={product.title} 
                    price={product.price} 
                    id={product.id}
                /></Grid>
            })}
        </Grid>
        <footer>
          <Button variant="contained" size="large"><Link to="/product-edit">Adicionar Produto</Link></Button>
        </footer>
    </div>
  );
}

export default ProductList;
