import { useContext } from 'react'
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { CartContext } from '../../contexts/CartContext'
import { priceFormat } from '../../utils/priceFormat'
import { Container } from '@mui/system';
import { Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate()
  const { cart, removeItem, changeAmount } = useContext(CartContext)

  const total = priceFormat(cart.reduce((acc, currentItem) => {
    return acc + currentItem.subTotal
  }, 0))

  const handleNavigateToCheckout = () => {
    navigate('/checkout')
  }


  const handleDeleteItem = (itemId) => {
    Swal.fire({
      title: 'Deseja realmente remover esse item ?',
      showCancelButton: true,
      confirmButtonText: 'Sim, desejo !',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(itemId)
      }
    })
  }

  return (
    <>
      <Container>
        <TableContainer>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Produto</TableCell>
                <TableCell>Unidade</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>SubTotal</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                cart.map(item => (
                  <TableRow key={item.itemId}>
                    <TableCell>
                      <img className='table-image' src={item.product.image} alt={item.product.name} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={item.product.name} arrow>
                       <Button>
                          {item.product.name}
                       </Button>
                    </Tooltip>

                    </TableCell>
                    <TableCell>{item.priceWithDiscountFormatted}</TableCell>
                    <TableCell>
                      <FaMinusCircle
                        size={18}
                        color="#9721BD"
                        className='margin-button'
                        onClick={() => changeAmount(item.itemId, item.amount - 1)}
                      />
                      {item.amount}
                      <FaPlusCircle
                        size={18}
                        color="#9721BD"
                        className='margin-button'
                        onClick={() => changeAmount(item.itemId, item.amount + 1)}
                      />
                    </TableCell>
                    <TableCell>{item.subTotalFormatted}</TableCell>
                    <TableCell>
                      <FaTrashAlt size={22} color='#9721BD' onClick={() => handleDeleteItem(item.itemId)} />
                    </TableCell>
                  </TableRow>
                ))
              }
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell >Total</TableCell>
                <TableCell >{total}</TableCell>
                <TableCell>
                  <Button variant='outlined' onClick={handleNavigateToCheckout}>Continuar compra</Button>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>



      </Container>




    </>
  )
}

export default Cart
