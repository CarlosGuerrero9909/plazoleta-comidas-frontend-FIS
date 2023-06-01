import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Cliente() {
  const [user, setUser] = useState({})
  const [cliente, setCliente] = useState({})

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      setUser(loggedUserJSON.user)
      setCliente(loggedUserJSON.user.cliente)
    }
  }, [])

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 56, height: 56 }}
          >
            C
          </Avatar>
        }
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <strong>Nombre:</strong> {user.fullName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <strong>Rol:</strong> {user.rol}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <strong>Dirección:</strong> {cliente.direccion}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <strong>Celular:</strong> {cliente.celular}
        </Typography>
      </CardContent>
    </Card>
  );
}