import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { toast } from 'react-toastify';
import api from "../api/api";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

type ProductItemType = {
    title: string
    thumbnail: string
    id: number
    price: number
}

function ProductItem({thumbnail, title, price, id}: ProductItemType) {

    const deleteItem = async () => {
        confirmAlert({
            title: title,
            message: 'Tem certeza que deseja excluir esse produto?',
            buttons: [
              {
                label: 'Excluir',
                onClick: () => {
                    api.delete(`/products/${id}`)
                    .then(() => {
                        toast.success(`${title} excluido com sucesso`, {
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
        <Button key="1" variant="contained" size="small"><Link to={`/product-details?id=${id}`}>Ver dados</Link></Button>,
        <Button key="2" variant="contained" size="small"><Link to={`/product-edit?id=${id}`}>Alterar</Link></Button>,
        <Button key="3" variant="contained" size="small" onClick={() => deleteItem()}>Excluir</Button>,
    ];

  return (
    <Card>
        <CardMedia
            component="img"
            height="250"
            image={thumbnail}
            alt={title}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })}
            </Typography>
        </CardContent>
        <CardActions >
            <ButtonGroup size="small" aria-label="small button group" fullWidth={true}>
                {buttons}
            </ButtonGroup>
        </CardActions>

    </Card>
  );
}

export default ProductItem;
