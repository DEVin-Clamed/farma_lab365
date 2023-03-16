import { Container } from '@mui/system';
import { ptBrGrid } from '../../../constants/ptBr'
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Chip } from '@mui/material';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import { priceFormat } from '../../../utils/priceFormat';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'name', headerName: 'Cliente', flex: 1 },
  { field: 'cpf', headerName: 'CPF', flex: 1 },
  { field: 'dataCard', headerName: 'Data do cartão', flex: 1 },
  {

    field: 'total',
    headerName: 'Valor total',
    flex: 1,
    renderCell: ({ row }) => (
      <>
        {priceFormat(row.total)}
      </>
    )
  }
];

function Orders() {

  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    api.get('/orders')
      .then(response => {
        setOrders(response.data.map(item => ({
          id: item.id,
          name: item.person.name,
          cpf: item.person.cpf,
          dataCard: format(parseISO(item.payment.cardDateExpiration), 'MM/yyyy hh:mm:ss'),
          total: item?.cart?.reduce((acc, currentItem) => {
            return acc + currentItem.subTotal
          }, 0)
        })))
      })
      .catch(() => toast.error('Deu ruim'))
  }, [])

  const handleInsertColumnAction = () => {
    return [
      ...columns,
      {
        field: 'id',
        headerName: 'Ações',
        flex: 1,
        renderCell: () => (
          <Box>
            <Button variant='outli' onClick={() => navigate('/carrinho')}>Ver pedido completo</Button>
          </Box>
        )
      },
    ]
  }

  return (
    <Container>
      <Box mt="20px" style={{ height: 300, width: '100%' }}>
        <DataGrid
          autoHeight
          rows={orders}
          columns={handleInsertColumnAction()}
          localeText={ptBrGrid}
        // loading={true}
        />
      </Box>
    </Container>
  );
}

export default Orders;