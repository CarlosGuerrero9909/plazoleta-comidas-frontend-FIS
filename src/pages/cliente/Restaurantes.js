import React, { useState, useEffect } from "react"

import restaurantService from '../../services/restaurante'

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RestauranteCard from "../../components/cards/RestaurantCard";
import Footer from "../../components/footer/Footer";


const theme = createTheme();

export default function Restaurantes(props) {
  const [restaurantes, setRestaurantes] = useState([])
  const [textoBusqueda, setTextoBusqueda] = useState('')

  useEffect(() => {
    getRestaurantes("")
  }, [])

  const getRestaurantes = async (filtro) => {
    const initialRestaurants = await restaurantService.consultarRestaurantes()
    let dataRestaurants = initialRestaurants

    if (filtro !== "") {
      dataRestaurants = initialRestaurants.filter(restaurant => {
        return (
          restaurant.nombre.toLowerCase().includes(filtro.toLowerCase())
        )
      })
    }
    setRestaurantes(dataRestaurants)
  }

  const handleChange = (event) => {
    setTextoBusqueda(event.target.value)
    getRestaurantes(event.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Rotonda de comidas
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Una forma increible de saciar tus mayores deseos
            </Typography>
            <TextField
              id="filled-basic"
              label="Nombre del restaurante que desea"
              variant="filled"
              fullWidth
              value={textoBusqueda}
              onChange={handleChange}
            />
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {restaurantes.map((restaurante) => (
              <Grid item key={restaurante.id} xs={12} sm={6} md={4}>
                <RestauranteCard restaurante={restaurante} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}