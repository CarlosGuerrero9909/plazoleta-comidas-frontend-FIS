import React, { useState, useEffect } from "react"
import userService from '../../services/users'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function RegistrarAdminRestaurante() {
  const [user, setUser] = useState({})
  const [adminRestaurante, setAdminRestaurante] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      const user = loggedUserJSON
      setUser(user)
      userService.setToken(user.token)
    }
  }, [])


  const handleChange = (e) => {
    setAdminRestaurante({
      ...adminRestaurante,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRegister()
    setAdminRestaurante({
      fullName: '',
      email: '',
      password: '',
    })
  };

  const sendRegister = async () => {
    const userAdminRestaurante = {
      fullName: adminRestaurante.fullName,
      rol: 'AdminRestaurante',
      email: adminRestaurante.email,
      password: adminRestaurante.password
    }
    const data = await userService.createAdminRestaurante(userAdminRestaurante)
    userService.setToken(user.token)
    //console.log(data)
    return data
  }

  return (
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
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar administrador
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="fullname"
                  label="Nombre completo"
                  name="fullName"
                  value={adminRestaurante.fullName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={adminRestaurante.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={adminRestaurante.password}
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
              Registrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}