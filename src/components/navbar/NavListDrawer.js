import React from "react"
import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";


export default function NavListDrawer({ navLinks, setOpen, logout }) {
  
  const handleClick = () => {
    logout()
    setOpen(false)
  }
  
  return (
    <Box>
      <nav>
        <List>
          {
            navLinks.map(navLink => (
              <ListItem
                disablePadding
                key={navLink.title}
              >
                <ListItemButton
                  component={NavLink}
                  to={navLink.path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText>{navLink.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))
          }
          {
            JSON.parse(sessionStorage.getItem('sesionIniciada')) === true ?
              <ListItem 
                disablePadding
              >
                <ListItemButton
                  onClick={handleClick}
                  component={NavLink}
                  to={'/'}
                >
                  <ListItemText>Cerrar sesion</ListItemText>
                </ListItemButton>
              </ListItem>
              :
              false
          }
        </List>
      </nav>
    </Box>
  )
}