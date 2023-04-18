import { Autocomplete, Button, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import api from '../../services/api'

import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListIcon from '@mui/icons-material/List';
import DoneIcon from '@mui/icons-material/Done';
import DeleteICon from '@mui/icons-material/Delete';
import CardList from '../../components/CardList';
import { toast } from 'react-toastify';
import { productsAction } from '../../actions/products.action';

// import { Container } from './styles';

function MyList() {

  const [text, setText] = useState('')
  const [favorites, setFavorites] = useState([])
  const [optionsProducts, setOptionsProducts] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()

    api.post('/favorites', { description: text, status: false })
      .then(() => {
        setText('')
        toast.success('Item adicionado com sucesso')
        getFavorites()
      })
      .catch(() => toast.error('Erro adicionar novo favorito'))
  }

  // get
  // post
  // delete
  // put -> todas informações do elemento
  // patch -> atualização de parcial

  const handleUpdateStatus = (id) => {
    api.patch(`/favorites/${id}`, { status: true })
      .then(() => {
        toast.success('Favirito atualizado com sucesso')
        getFavorites()
      })
      .catch(() => toast.error('Erro ao atualizar'))
  }

  const getFavorites = () => {
    api.get('/favorites')
      .then(response => {
        setFavorites(response.data)
      })
      .catch(() => toast.error('Erro ao listar os favoritos'))
  }

  const handleDeleteItem = (id) => {
    api.delete(`/favorites/${id}`)
      .then(() => {
        toast.success('Deletado com sucesso')
        getFavorites()
      })
      .catch(() => toast.error('Erro ao deletar'))
  }

  useEffect(() => {
    getFavorites()
  }, [])

  useEffect(() => {
    productsAction.getProducts()
      .then(response => {
        setOptionsProducts(response.data.map(item => ({
          label: item.name
        })))
      })
      .catch(() => toast.error('Houve um erro ao retornar os produtos'))
  })

  return (
    <Container>
      <CardList title="Nova tarefa" icon={<PostAddIcon color='#FFF' fontSize="large" />}>
        <form onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '10px',
            width: '100%',
            alignItems: 'center'
          }}
        >

          <Autocomplete
            disablePortal
            options={optionsProducts}
            fullWidth
            renderInput={(params) =>
            <TextField
              {...params}
              variant='standard'
              fullWidth
              style={{ marginRight: 20 }}
              placeholder="O que você que fazer ?"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />}
          />


          <Fab
            color="primary"
            type="submit"
            aria-label="add"
            disabled={!text}
          >
            <AddIcon />
          </Fab>
        </form>
      </CardList>


      <CardList
        title="Tarefas pendentes"
        icon={<ListIcon color='#FFF'
          fontSize="large"
        />}>
        <List style={{ width: '100%' }}>
          {
            favorites.filter(item => item.status === false).map(favorite => (
              <ListItem disablePadding key={favorite.id}>
                <ListItemButton>
                  <ListItemIcon>
                    <Button
                      onClick={() => handleUpdateStatus(favorite.id)}
                      variant='outlined'
                      style={{ marginRight: 10 }}>
                      <DoneIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteItem(favorite.id)}
                      variant='outlined'
                      style={{ marginRight: 10 }}>
                      <DeleteICon />
                    </Button>
                  </ListItemIcon>
                  <ListItemText primary={favorite.description} />
                </ListItemButton>
              </ListItem>
            ))
          }

        </List>
      </CardList>


      <CardList
        title="Tarefas concluídas"
        icon={<DoneIcon color='#FFF'
          fontSize="large"
        />}>
        <List style={{ width: '100%' }}>
          {
            favorites.filter(item => item.status === true).map(item => (
              <ListItem disablePadding key={item.id}>
                <ListItemButton>
                  <ListItemText style={{ textDecoration: 'line-through' }} primary={item.description} />
                </ListItemButton>
              </ListItem>
            ))
          }

        </List>
      </CardList>


    </Container>
  );
}

export default MyList;