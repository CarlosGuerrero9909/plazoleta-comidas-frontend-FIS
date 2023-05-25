import * as React from "react";

import { NavLink } from 'react-router-dom';

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from '@mui/material/CardHeader';
import CardActions from "@mui/material/CardActions";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MenuCardWithoutLog(props) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar 
            alt={`${props.menu.restaurante.nombre} logo`}
            src={props.menu.restaurante.logo}
          >
          </Avatar>
        }
        title={props.menu.nombre}
        subheader={`$ ${props.menu.precioTotal}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.menu.imagen}
        alt={`${props.menu.imagen} menu`}
      />
      <CardActions disableSpacing>
        <IconButton 
          component={NavLink}
          to={"/Login"}
          aria-label="add to favorites"
        >
          <ShoppingCartIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {
            props.menu.productos.map(producto => (
              <Typography
                paragraph
                key={producto.id}
              >
                {producto.nombre}
              </Typography>
            ))
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}
