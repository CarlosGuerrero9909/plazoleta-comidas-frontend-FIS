import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function RestauranteCard(props) {
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.setItem("restauranteActual", JSON.stringify(props.restaurante));
    navigate('/MenusRestaurante')
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            alt={`${props.restaurante.nombre} logo`}
            src={props.restaurante.logo}>
          </Avatar>
        }
        title={props.restaurante.nombre}
        subheader={props.restaurante.especialidad}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.restaurante.banner}
        alt={`${props.restaurante.nombre} banner`}
      />
      <CardActions disableSpacing>
        <Button 
          size="small"
          onClick={handleClick}
        >
          Ver menus
        </Button>
      </CardActions>
    </Card>
  );
}
