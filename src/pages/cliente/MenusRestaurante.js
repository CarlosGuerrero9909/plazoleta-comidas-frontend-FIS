import React, { useState, useEffect } from "react"

import menuService from '../../services/menu'

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "../../components/footer/Footer";
import MenuCard from "../../components/cards/MenuCard";
import Carrito from '../cliente/Carrito'
import { CartProvider } from "../../context/carrito";


const theme = createTheme();

export default function MenusRestaurante() {
  const [menus, setMenus] = useState([])

  useEffect(() => {
    menuService
      .consultarMenus()
      .then(initialMenus => {
        filtrarMenus(initialMenus)
      })
  }, [])

  const filtrarMenus = async (initialMenus) => {
    const restauranteAcual = JSON.parse(localStorage.getItem('restauranteActual'))
    const filterMenus = initialMenus.filter(menu => menu.restaurante.id === restauranteAcual.id)
    setMenus(filterMenus)
  }

  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <Carrito />
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
                Menus
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Una forma increible de saciar tus mayores deseos
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {menus.map((menu) => (
                <Grid item key={menu.id} xs={12} sm={6} md={4}>
                  <MenuCard menu={menu} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </CartProvider>

  );
}