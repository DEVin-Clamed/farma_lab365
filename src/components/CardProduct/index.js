import { Button } from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom'

const CardProduct = ({ product }) => {
   const navigate = useNavigate()

  const handleClickProduct = () => {
    navigate('detalhes', { state: product })
  }

  return (
    <div className="card-product">
      <img
        src={product.image}
        width="150px"
        alt="foto do produto"
      />
      <h2>{product.name}</h2>
      <span>{product.priceFormatted}</span>

      <Button
        variant='contained'
        style={{color: '#fff', background: '#000'}}
        onClick={handleClickProduct}
      >
        Ver Detalhes
      </Button>
    </div>
  );
}

export default CardProduct;