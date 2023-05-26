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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function ResponsiveAppBar(props) {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [navLinks, setNavLinks] = useState([])
  const [navLinkOptions, setNavLinkOptions] = useState([])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptions = (options) => {
    setNavLinkOptions(options)
  }

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
                <Box key={navLink.title} sx={{ display: 'inline' }}>
                  {
                    props.logged === false || JSON.parse(sessionStorage.getItem("usuario")).user.rol === "Cliente"?
                      <Button
                        color="inherit"
                        component={NavLink}
                        to={navLink.path}
                      >
                        {navLink.title}
                      </Button>
                      :
                      <>
                        <Button
                          color="inherit"
                          //component={NavLink}
                          //to={navLink.path}
                          onClick={ function(event){ handleClick(event); handleOptions(navLink.options); } }
                        >
                          {navLink.title}
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openMenu}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          {                            
                            navLinkOptions.map(option => (
                              <MenuItem 
                                key={option.optionName} 
                                onClick={handleClose}
                                component={NavLink}
                                to={option.path}
                              >
                                {option.optionName}
                              </MenuItem>
                            ))
                          }
                        </Menu>
                      </>
                  }
                </Box>
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
        <NavListDrawer navLinks={navLinks} setOpen={setOpen} logout={logout} />
      </Drawer>
    </>
  );
}
export default ResponsiveAppBar;