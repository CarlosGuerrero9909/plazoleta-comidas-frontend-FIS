import {useState} from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from '@mui/material/CardHeader';
import CardActions from "@mui/material/CardActions";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useCart } from "../../hooks/useCart";

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

export default function MenuCard(props) {
  const [expanded, setExpanded] = useState(false);
  const {cart, addToCart, removeFromCart} = useCart()

  const checkMenuIncart = (menu) => {
    return cart.some(item => item.id === menu.id)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isMenuInCart = checkMenuIncart(props.menu)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            alt={`${props.menu.nombre} logo`}
            src={JSON.parse(localStorage.getItem('restauranteActual')).logo}>
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
          style={{ backgroundColor: isMenuInCart ? '#f44336' : '#2196f3' }}
          onClick={() => {
            isMenuInCart
              ? removeFromCart(props.menu)
              : addToCart(props.menu)
          }}
          aria-label="add to favorites"
        >
        {
          isMenuInCart
            ? <RemoveShoppingCartIcon/>
            : <AddShoppingCartIcon />
        }
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
