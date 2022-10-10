import api from '../api/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ProductItem from './ProductItem';

type productType = {
  title: string
  id: number
  thumbnail: string
  price: number
  rating: number
  discountPercentage: number
  brand: string
}

function ProductList() {

    const [ amountproductsToShow, setAmountProductsToShow ] = useState<number>(50);
    const [ allProducts, setAllProducts ] = useState<productType[]>([]);
    const [ allProductsLoaded, setAllProductsLoaded ] = useState<boolean>(false);
    const showMoreAmount = 50;

    const getProducts = async () => {
        try {
            const response = await api.get(`/products?limit=${amountproductsToShow}`);
            setAllProducts(response.data.products);
          } catch (error) {
            console.error(error);
            toast.error('tivemos um erro, tente novamente mais tarde', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
              });
          }
    };
    
    const loadMore = async () => {
      const newAmountToShow = amountproductsToShow + showMoreAmount;
      const amountProductsLoaded = amountproductsToShow;

        await api.get(`/products?limit=${showMoreAmount}&skip=${amountProductsLoaded}`)
          .then((response) => {
            if(!response.data.limit) {
              setAllProductsLoaded(true)
            } else {
              console.log(response.data)
              const currentProducts = [...allProducts];
              const newProducts = [...response.data.products];
              const newProductList = [...currentProducts, ...newProducts];
              setAllProducts(newProductList);
              setAmountProductsToShow(newAmountToShow);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error('tivemos um erro, tente novamente mais tarde', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
          });
    }




    useEffect(()=>{
      getProducts();
  }, [])

  return (
    <div className="category__section">

      <div className='category__product-list'>
        {
          allProducts.map((product: productType, index: number) => {
           return <ProductItem 
              key={index}
              title={product.title}
              thumbnail={product.thumbnail}
              price={product.price}
              rating={product.rating}
              discount={product.discountPercentage}
              brand={product.brand}
            />
          })
        }
      </div>

      <div className="category__loadmore">
        {
          !allProductsLoaded
          ? 
          <button onClick={loadMore}>Carregar Mais</button>
          :
          <p>Todos os produtos carregados</p>
        }
      </div>
      
    </div>
  );
}

export default ProductList;
