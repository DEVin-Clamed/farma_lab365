import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { productsAction } from "../../actions/products.action";

import CardProduct from "../../components/CardProduct";

import { priceFormat } from '../../utils/priceFormat'

const Home = () => {
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
    <div>
      <div className="main-container">

        <div className="products-list" data-testid="products-list">
          {
            products.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
