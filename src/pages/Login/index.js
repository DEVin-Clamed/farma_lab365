import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useState } from 'react';

import LockIcon from '@mui/icons-material/Lock';
import { AuthContext } from '../../contexts/AuthContext';

// import { Container } from './styles';

function Login() {

  const { handleLogin } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(email, password)
  }

  return (
    <Container>
      <Box
        width="50%"
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="10px"
        bgcolor="#FFF"
        p="10px"
        marginTop="20px"
        borderRadius="8px"
      >
        <form onSubmit={handleSubmit}>
          <LockIcon />
          <Typography component="h1" variant='h5'>Login</Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            autoFocus
            type="email"
          />

          <TextField
            label="Sua senha"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            margin="normal"
          />
          <Button
            fullWidth
            type='submit'
            variant='contained'
            disabled={email.length === 0 || password.length === 0}
          >
            Fazer login
          </Button>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Link variant='body2'>Não tem conta ? Cadastre-se</Link>
            <Link variant='body2'>Recuperar senha</Link>

          </Box>
        </form>

      </Box>
    </Container>
  )


}

export default Login;