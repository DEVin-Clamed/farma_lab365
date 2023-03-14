import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Menu = () => {

  const navigate = useNavigate()
  const { cart } = useContext(CartContext)

  const handleNavigateToCart = () => {
    navigate('/carrinho')
  }

  const handleNavigateToLogin = () => {
    navigate('/login')
  }

  const handleNavigateToHome = () => {
    navigate('/')
  }


  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={handleNavigateToHome}
          >
            Clamed Farm
          </Typography>
          <Button color="inherit" onClick={handleNavigateToLogin}>Login</Button>
          <Button color="inherit" onClick={handleNavigateToCart}>
            <Badge badgeContent={cart.length} color="success">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Menu;
