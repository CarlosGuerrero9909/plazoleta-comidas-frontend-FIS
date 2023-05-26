import React, { useState, useEffect } from "react"
import productService from '../../services/producto'
import restaurantService from '../../services/restaurante'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function ActualizarProducto() {
  const [user, setUser] = useState({})
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteId, setRestauranteId] = useState("")
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState("")
  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0,
    imagen: ''
  })

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      const user = loggedUserJSON
      setUser(user)
      productService.setToken(user.token)
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
        const productosFilter = initialProducts.filter(producto => producto.restaurante === restauranteId)
        setProductos(productosFilter)
      })
  }, [restauranteId])

  /*useEffect(() => {
    const productoFind = productos.find(producto => productoId === producto.id)
    setProducto(productoFind)
  }, [productos, productoId])*/

  const filtrarRestaurantes = (initialRestarants) => {
    const adminId = JSON.parse(sessionStorage.getItem("usuario")).user.id
    const restaurantesFind = initialRestarants.filter(restaurante => adminId === restaurante.adminRestaurante.id)
    setRestaurantes(restaurantesFind)
  }

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct()
    setProductoId("")
    setRestauranteId("")
    setProducto({
      nombre: '',
      precio: 0,
      imagen: ''
    })
  };

  const updateProduct = async () => {
    const productUpdateId = productoId
    const productoUpdate = {
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    }
    const data = await productService.actualizarProducto(productUpdateId, productoUpdate)
    //productService.setToken(user.token)
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
              <BakeryDiningIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Actualizar Producto Simple
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
              <Grid item xs={12} >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Restaurante</InputLabel>
                    <Select 
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Restaurante"
                      name="restauranteId"
                      value={restauranteId}
                      onChange={(e) => setRestauranteId(e.target.value)}
                    >
                      {
                        restaurantes.map(restaurante => (
                          <MenuItem value={restaurante.id} key={restaurante.id}>{restaurante.nombre}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Producto</InputLabel>
                    <Select 
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Productos"
                      name="productoId"
                      value={productoId}
                      onChange={(e) => setProductoId(e.target.value)}
                    >
                      {
                        productos.map(producto => (
                          <MenuItem value={producto.id} key={producto.id}>{producto.nombre}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Typography paragraph>
                  A continuacion cambie los campos que desea actualizar
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    id="nombre-producto"
                    label="Nombre del producto"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="precio-producto"
                    label="Precio del producto"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="imagen-producto"
                    label="Imagen del producto"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Actualizar
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}