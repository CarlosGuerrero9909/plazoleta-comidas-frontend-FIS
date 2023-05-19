import React, { useState, useEffect } from "react"
import { NavLink, useNavigate } from 'react-router-dom';

import navLinksData from '../../data/navLinks.json';
import NavListDrawer from './NavListDrawer'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

/*let navLinks = [
  { title: "Inicio", path: "/" },
  { title: "Iniciar sesion", path: "/Login" },
  { title: "Registrarse", path: "/Register" }
];*/

function ResponsiveAppBar(props) {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [navLinks, setNavLinks] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem("usuario") != null) {
      const findNavLinks = navLinksData.find(item => item.rol === JSON.parse(sessionStorage.getItem("usuario")).user.rol)
      setNavLinks(findNavLinks.navLinks)
      } else {
        setNavLinks([
          { title: "Inicio", path: "/" },
          { title: "Iniciar sesion", path: "/Login" },
          { title: "Registrarse", path: "/Register" }
        ]);
      }
  }, [props.logged])

  const logout = () => {
    props.setLogged(false)
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}>
            DevArmy
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {
              navLinks.map(navLink => (
                <Button
                  key={navLink.title}
                  color="inherit"
                  component={NavLink}
                  to={navLink.path}
                >
                  {navLink.title}
                </Button>
              ))
            }
            {
              JSON.parse(sessionStorage.getItem('sesionIniciada')) === true ?
                <Button
                  color="inherit"
                  onClick={logout}
                  component={NavLink}
                  to={'/'}
                >
                  Cerrar sesion
                </Button>
                :
                false
            }

          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer navLinks={navLinks} setOpen={setOpen} logout={logout}/>
      </Drawer>
    </>
  );
}
export default ResponsiveAppBar;