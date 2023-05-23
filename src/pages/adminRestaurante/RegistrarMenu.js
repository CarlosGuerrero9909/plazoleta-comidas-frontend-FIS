import React, { useState, useEffect } from "react"
import menuService from '../../services/menu'
import restaurantService from '../../services/restaurante'
import productService from '../../services/producto'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(productId, productsMenu, theme) {
  return {
    fontWeight:
      productsMenu.indexOf(productId) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function RegistrarMenu() {
  const [user, setUser] = useState({})
  const [restaurantes, setRestaurantes] = useState([]);
  const [productosRest, setProductosRest] = useState([]);
  const [menu, setMenu] = useState({
    nombre: '',
    productos: [],
    imagen: '',
    restauranteId: ''
  })
  const theme = useTheme();
  const [productsMenu, setProductsMenu] = React.useState([]);

  const handleChangeConf = (event) => {
    const {
      target: { value },
    } = event;
    setProductsMenu(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      const user = loggedUserJSON
      setUser(user)
      menuService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    restaurantService
      .consultarRestaurantes()
      .then(initialRestarants => {
        filtrarRestaurantes(initialRestarants)
      })
  }, [])

  useEffect(() => {
    productService
      .consultarProductos()
      .then(initialProducts => {
        const productosFilter = initialProducts.filter(producto => producto.restaurante === menu.restauranteId)
        setProductosRest(productosFilter)
      })
  }, [menu.restauranteId])

  const filtrarRestaurantes = (initialRestarants) => {
    const adminId = JSON.parse(sessionStorage.getItem("usuario")).user.id
    const restaurantesFind = initialRestarants.filter(restaurante => adminId === restaurante.adminRestaurante.id)
    setRestaurantes(restaurantesFind)
  }

  /*const filtrarProductos = async (initialProducts) => {
    const productosFilter = initialProducts.filter(producto => producto.restaurante === menu.restauranteId)
    setProductosRest(productosFilter)
  }*/

  const handleChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRegister()
    setMenu({
      nombre: '',
      productos: [],
      imagen: '',
      restauranteId: ''
    })
    setProductsMenu([])
  };

  const sendRegister = async () => {
    menu.productos = productsMenu.map(producto => {
      const productFind = productosRest.find(p => p.nombre === producto)
      return productFind.id
    })

    const menuSend = {
      nombre: menu.nombre,
      productos: menu.productos,
      imagen: menu.imagen,
      restaurante: menu.restauranteId
    }
    const data = await menuService.createMenu(menuSend)
    menuService.setToken(user.token)
    //console.log(data)
    return data
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <FastfoodIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrar Menu
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    id="nombre-menu"
                    label="Nombre del menu"
                    name="nombre"
                    value={menu.nombre}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} >
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-standard-label">Restaurante</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Restaurante"
                      name="restauranteId"
                      value={menu.restauranteId}
                      onChange={handleChange}
                    >
                      {
                        restaurantes.map(restaurante => (
                          <MenuItem value={restaurante.id} key={restaurante.id}>{restaurante.nombre}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="imagen-menu"
                    label="Imagen del menu"
                    name="imagen"
                    value={menu.imagen}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} >
                  <FormControl fullWidth required>
                    <InputLabel id="demo-multiple-chip-label">Productos del menu</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={productsMenu}
                      onChange={handleChangeConf}
                      input={<OutlinedInput id="select-multiple-chip" label="Productos del menu" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {productosRest.map((producto) => (
                        <MenuItem
                          key={producto.id}
                          value={producto.nombre}
                          style={getStyles(producto.id, productsMenu, theme)}
                        >
                          {producto.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrar
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}