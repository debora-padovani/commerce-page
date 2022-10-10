import {
    Button,
    ButtonGroup,
    Typography,
    Grid,
    Container
} from '@mui/material';

import { toast } from 'react-toastify';
import api from "../api/api";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

type itemType = {
    title: string
    thumbnail: string
    id: number
    price: number
}

const emptyItem = {
    title: "",
    thumbnail: "",
    id: 0,
    price: 0
}

function ProductDetails() {

    const [ item, setItem ] = useState<itemType>(emptyItem);
    const navigate = useNavigate();


    useEffect(()=>{
        getItem();
    }, [])

    const getItem = async () => {

        const search = window.location.search;
        const [param, value] = search.replace('?', '').split('=');
        if(param === 'id') {
            const id = value;

            api.get(`/products/${id}`)
                .then((response) => {
                    setItem(response.data);
                })
                .catch((error) => {
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
                });
        } else {
            navigate('/')
        }

    }
    
    const deleteItem = async () => {
        confirmAlert({
            title: item.title,
            message: 'Tem certeza que deseja excluir esse produto?',
            buttons: [
              {
                label: 'Excluir',
                onClick: () => {
                    api.delete(`/products/${item.id}`)
                    .then(() => {
                        toast.success(`${item.title} excluido com sucesso`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    })
                    .catch((error) => {
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
                    });
                }
              },
              {
                label: 'Cancelar',
              }
            ]
          });
    }
    
    const buttons = [
        <Button key="2" variant="contained" size="small"><Link to={`/product-edit?id=${item.id}`}>Alterar</Link></Button>,
        <Button key="3" variant="contained" size="small" onClick={() => deleteItem()}>Excluir</Button>,
    ];

  return (
    <div className="app-detail">
        <Container maxWidth="lg" className="">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <img src={item.thumbnail} alt={item.title} height={500}/>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </Typography>
                    <ButtonGroup size="small" orientation="vertical" aria-label="vertical small button group">
                        {buttons}
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Container>
    </div>
  );
}

export default ProductDetails;
