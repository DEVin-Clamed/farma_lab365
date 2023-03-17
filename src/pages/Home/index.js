import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { productsAction } from "../../actions/products.action";
import { Grid } from "@mui/material";

import CardProduct from "../../components/CardProduct";

import { priceFormat } from '../../utils/priceFormat'
import { Container } from "@mui/system";
import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const {user} = useContext(AuthContext)
  const [products, setProducts] = useState([])

  const getProducts = async () => {

    productsAction.getProducts()
      .then(response => {
        setProducts(response.data.map(item => ({
          ...item,
          priceFormatted: priceFormat(item.price)
        })))
      })
      .catch(() => toast.error('Houve um erro ao retornar os produtos'))

    /*
    fetch('http://localhost:3333/products')
      .then(async (response) => {
        const data = await response.json()
        setProducts(data.map(item => ({
          ...item,
          priceFormatted: priceFormat(item.price)
        })))
      })
      .catch(() => toast.error('Houve um erro ao retornar os produtos'))

    */
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (

    <Container>
      <h1>Bem vindo {user}</h1>

      <Grid container>
        {
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <CardProduct
                key={product.id}
                product={product}
              />
            </Grid>
          ))
        }
      </Grid>
    </Container>

  );
};

export default Home;
