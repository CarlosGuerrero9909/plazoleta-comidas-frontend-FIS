import React, { useState, useEffect } from "react"

import menuService from '../../services/menu'

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from  "../../components/footer/Footer";
import MenuCardWithoutLog from "../../components/cards/MenuCardWithoutLog";


const theme = createTheme();

export default function MenusRestaurante(props) {
  const [menus, setMenus] = useState([])

  useEffect(() => {
    menuService
      .consultarMenus()
      .then(initialMenus => {
        setMenus(initialMenus)
      })
  }, [])

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
              Menus que podras encontrar
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Registrate y experimenta una forma increible de saciar tus mayores deseos
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {menus.map((menu) => (
              <Grid item key={menu.id} xs={12} sm={6} md={4}>
                <MenuCardWithoutLog menu={menu}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>   
      <Footer/>
    </ThemeProvider>
  );
}