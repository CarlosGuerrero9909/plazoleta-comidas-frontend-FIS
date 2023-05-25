import React, { useState, useEffect } from "react"
import userService from '../../services/users'
import restaurantService from '../../services/restaurante'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function RegistrarRestaurante() {
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [restaurante, setRestaurante] = useState({
    nombre: '',
    especialidad: '',
    logo: '',
    banner: '',
    idAdminRestaurante: '',
  })

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      const user = loggedUserJSON
      setUser(user)
      restaurantService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService
      .consultarUsuarios()
      .then(initialUsers => {
        filtrarUsuarios(initialUsers)
      })
  }, [])

  const filtrarUsuarios = (initialUsers) => {
    const usersFind = initialUsers.filter(user => user.rol === "AdminRestaurante")
    setUsers(usersFind)
  }

  const handleChange = (e) => {
    setRestaurante({
      ...restaurante,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRegister()
    setRestaurante({
      nombre: '',
      especialidad: '',
      logo: '',
      banner: '',
      idAdminRestaurante: '',
    })
  };

  const sendRegister = async () => {
    const restauranteSend = {
      nombre: restaurante.nombre,
      especialidad: restaurante.especialidad,
      logo: restaurante.logo,
      banner: restaurante.banner,
      adminRestaurante: restaurante.idAdminRestaurante,
    }
    const data = await restaurantService.createRestaurante(restauranteSend)
    restaurantService.setToken(user.token)
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
            <RestaurantIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar restaurante
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="nombre-restaurante"
                  label="Nombre restaurante"
                  name="nombre"
                  value={restaurante.nombre}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="especialidad-restaurante"
                  label="Especialidad"
                  name="especialidad"
                  value={restaurante.especialidad}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="logo-restaurante"
                    label="Logo del restaurante"
                    name="logo"
                    value={restaurante.logo}
                    onChange={handleChange}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="banner-restaurante"
                    label="Banner del restaurante"
                    name="banner"
                    value={restaurante.banner}
                    onChange={handleChange}
                  />
              </Grid>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12} >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Administrador del restaurante</InputLabel>
                    <Select 
                      labelId="demo-simple-select-label"
                      id="admin-restaurante"
                      label="Administrador del restaurante"
                      name="idAdminRestaurante"
                      value={restaurante.idAdminRestaurante}
                      onChange={handleChange}
                    >
                      {
                        users.map(user => (
                          <MenuItem value={user.id} key={user.id}>{user.fullName}</MenuItem>
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
  );
}