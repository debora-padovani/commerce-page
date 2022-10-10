import {
    Button,
    Grid,
    Container,
    TextField
} from '@mui/material';

import { toast } from 'react-toastify';
import api from '../api/api';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



type itemType = {
    title: string
    thumbnail: string
    id?: number
    price: number
    category: string
    description: string
    stock: number
}

const emptyItem = {
    title: '',
    thumbnail: '',
    price: 0,
    category: '',
    description: '',
    stock: 0,
}

function ProductDetails() {

    const [ currentItem, setCurrentItem ] = useState<itemType>(emptyItem);
    const [ newItem, setNewItem ] = useState<itemType>(emptyItem);

    const navigate = useNavigate();

    const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const handleNewItem = {...newItem};
        if(event){
            const newTitle = (event.target as HTMLInputElement).value;
            handleNewItem.title = newTitle;
            setNewItem(handleNewItem);
        }
    }
    const handleSetThumbnail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const handleNewItem = {...newItem};
        if(event){
            const newThumbnail = (event.target as HTMLInputElement).value;
            handleNewItem.thumbnail = newThumbnail;
            setNewItem(handleNewItem);
        }
    }
    const handleSetPrice = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const handleNewItem = {...newItem};
        if(event){
            const newPrice = (event.target as HTMLInputElement).value;
            handleNewItem.price = Number(newPrice);
            setNewItem(handleNewItem);
        }
    }
    const handleSetCategory = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const handleNewItem = {...newItem};
        if(event){
            const newCategory = (event.target as HTMLInputElement).value;
            handleNewItem.category = newCategory;
            setNewItem(handleNewItem);
        }
    }
    const handleDescription = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const handleNewItem = {...newItem};
        if(event){
            const newDescription = (event.target as HTMLInputElement).value;
            handleNewItem.description = newDescription;
            setNewItem(handleNewItem);
        }
    }
    const handleSetStock = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const handleNewItem = {...newItem};
        if(event){
            const newStock = event.target.value;
            handleNewItem.stock = Number(newStock);
            setNewItem(handleNewItem);
        }
    }

    const handleSendProduct = () => {
        if (currentItem.id) {
            api.put(`/products/${currentItem.id}`, newItem)
            .then(() => {
                toast.success('produto atualizado com sucesso', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });

                setTimeout(() => navigate('/'), 3000)
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
        } else {
            api.post('/products/add', newItem)
                .then(() => {
                    toast.success('produto adicionado com sucesso', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                    });

                    setTimeout(() => navigate('/'), 3000)
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
    }

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
                    const items = {...response.data};
                    console.log(items);
                    setCurrentItem(items);
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

    }

  return (
    <div className='app-edit'>
        <Container maxWidth='md'>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <TextField 
                        id="standard-basic-title" 
                        label="Título" 
                        variant="standard" 
                        helperText={currentItem.title}
                        onChange={(event) => handleSetTitle(event)} 
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        id="standard-basic-category" 
                        label="Categoria" 
                        variant="standard" 
                        helperText={currentItem.category}
                        onChange={(event) => handleSetCategory(event)} 
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
            <Grid  container>
                <Grid item xs={12}>
                    <TextField 
                        id="standard-basic-description" 
                        label="Descrição" 
                        variant="standard"
                        helperText={currentItem.description}
                        onChange={(event) => handleDescription(event)}  
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
            <Grid  container>
                <Grid item xs={12}>
                    <TextField 
                        id="standard-basic-thumbnail" 
                        label="Imagem" 
                        variant="standard"
                        helperText={currentItem.thumbnail} 
                        onChange={(event) => handleSetThumbnail(event)} 
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <TextField 
                        id="standard-basic-price" 
                        label="Preço"
                        type="number"
                        variant="standard" 
                        helperText={currentItem.price} 
                        onChange={(event) => handleSetPrice(event)}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        id="standard-basic-stock" 
                        label="Estoque" 
                        variant="standard" 
                        helperText={currentItem.stock} 
                        onChange={(event) => handleSetStock(event)}
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
            <footer>
                <Button variant="contained" size="large" onClick={() => handleSendProduct()}>
                    {currentItem.id ? 'Atualizar produto' : 'Adicionar Produto'}
                </Button>
            </footer>
        </Container>
    </div>
  );
}

export default ProductDetails;
