import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { useState } from 'react';
import { useEffect } from 'react';

export default function AdminRotonda() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      setUser(loggedUserJSON.user)
    }
  }, [])

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 56, height: 56 }}
          >
            A
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
      </CardContent>
    </Card>
  );
}