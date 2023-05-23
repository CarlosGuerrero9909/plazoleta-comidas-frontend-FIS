import React, { useState, useEffect } from "react"
import productService from '../../services/producto'
import restaurantService from '../../services/restaurante'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function RegistrarProductoCompuesto() {
  const [user, setUser] = useState({})
  const [restaurantes, setRestaurantes] = useState([]);
  const [producto, setProducto] = useState({
    nombre: '',
    clasificacion: '',
    precio: 0,
    imagen: '',
    restauranteId: ''
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

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRegister()
    setProducto({
      nombre: '',
      clasificacion: '',
      precio: 0,
      imagen: '',
      restauranteId: ''
    })
  };

  const sendRegister = async () => {
    const productoSend = {
      nombre: producto.nombre,
      clasificacion: producto.clasificacion,
      precio: producto.precio,
      imagen: producto.imagen,
      productoCompuesto: {},
      restaurante: producto.restauranteId
    }
    const data = await productService.createProductoCompuesto(productoSend)
    productService.setToken(user.token)
    //console.log(data)
    return data
  }


  const filtrarRestaurantes = (initialRestarants) => {
    const adminId = JSON.parse(sessionStorage.getItem("usuario")).user.id
    const restaurantesFind = initialRestarants.filter(restaurante => adminId === restaurante.adminRestaurante.id)
    setRestaurantes(restaurantesFind)
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
              <LunchDiningIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrar Producto Compuesto
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    id="nombre-producto-compuesto"
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
                    id="clasificacion-producto-compuesto"
                    label="Clasificacion"
                    name="clasificacion"
                    value={producto.clasificacion}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="precio-producto-compuesto"
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
                <Grid item xs={12} >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Restaurante</InputLabel>
                    <Select 
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Restaurante"
                      name="restauranteId"
                      value={producto.restauranteId}
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