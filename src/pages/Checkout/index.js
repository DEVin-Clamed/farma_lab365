import { Box, Button, Card, CardContent, Grid, MenuItem, Paper, Select, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState, useEffect, useContext } from 'react';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../../contexts/CartContext';
import api from '../../services/api';


const UFS = [
  { uf: 'AC', nome: 'Acre' },
  { uf: 'AL', nome: 'Alagoas' },
  { uf: 'AP', nome: 'Amapá' },
  { uf: 'AM', nome: 'Amazonas' },
  { uf: 'BA', nome: 'Bahia' },
  { uf: 'CE', nome: 'Ceará' },
  { uf: 'DF', nome: 'Distrito Federal' },
  { uf: 'ES', nome: 'Espirito Santo' },
  { uf: 'GO', nome: 'Goiás' },
  { uf: 'MA', nome: 'Maranhão' },
  { uf: 'MS', nome: 'Mato Grosso do Sul' },
  { uf: 'MT', nome: 'Mato Grosso' },
  { uf: 'MG', nome: 'Minas Gerais' },
  { uf: 'PA', nome: 'Pará' },
  { uf: 'PB', nome: 'Paraíba' },
  { uf: 'PR', nome: 'Paraná' },
  { uf: 'PE', nome: 'Pernambuco' },
  { uf: 'PI', nome: 'Piauí' },
  { uf: 'RJ', nome: 'Rio de Janeiro' },
  { uf: 'RN', nome: 'Rio Grande do Norte' },
  { uf: 'RS', nome: 'Rio Grande do Sul' },
  { uf: 'RO', nome: 'Rondônia' },
  { uf: 'RR', nome: 'Roraima' },
  { uf: 'SC', nome: 'Santa Catarina' },
  { uf: 'SP', nome: 'São Paulo' },
  { uf: 'SE', nome: 'Sergipe' },
  { uf: 'TO', nome: 'Tocantins' }
]


function Checkout() {

  const navigate = useNavigate()
  const { cart, resetCart } = useContext(CartContext)

  const [step, setStep] = useState(0)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')

  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('PR')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardDateExpiration, setCardDateExpiration] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  const [errors, setErrors] = useState({})


  const handleNextStep = () => {
    switch (step) {
      case 0: {
        if (name.length === 0) {
          setErrors({ name: 'Nome é obrigatório' })
        } else if (cpf.length !== 11) {
          setErrors({ cpf: 'CPF inválido' })
        } else if (email.length === 0) {
          setErrors({ email: 'Email é obrigatório' })
        } else {
          setStep(step + 1)
        }
        break;
      }

      default:
        break;
    }
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handleAddOrder = () => {
    const body = {
      person: {
        name,
        email,
        cpf
      },
      address: {
        cep,
        street,
        city,
        uf,
        complement,
        neighborhood
      },
      payment: {
        cardName,
        cardNumber,
        cardDateExpiration,
        cardCvv
      },
      cart
    }

    api.post('/orders', body)
      .then(() => {
        toast.success('Pedido realizado com sucesso')
        navigate('/')
        resetCart()

      })
      .catch((error) => {
        console.log(error)
        alert('Pedido nao realizado com sucesso')
      })
  }


  useEffect(() => {

    const cepFiltered = cep.replace(/[^\w\s]/gi, '').replace(" ", "")

    if (cepFiltered.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(async (response) => {
          const data = await response.json()

          setStreet(data.logradouro)
          setCity(data.localidade)
          setComplement(data.complemento)
          setUf(data.uf)
          setNeighborhood(data.bairro)
        })
        .catch(() => {
          alert('Cep nao encontrado')
        })

    }
  }, [cep])

  console.log(errors)
  return (

    <Container>
      <Paper elevation={3}>
        <Card>
          <CardContent>

            <Stepper activeStep={step}>
              <Step>
                <StepLabel>Dados pessoais</StepLabel>
              </Step>
              <Step>
                <StepLabel>Endereço</StepLabel>
              </Step>
              <Step>
                <StepLabel>Pagamento</StepLabel>
              </Step>
            </Stepper>
            <Box>

              {
                step === 0 && (
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        label="Nome completo"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        margin="normal"
                        autoFocus
                        error={errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        label="CPF"
                        variant="outlined"
                        fullWidth
                        value={cpf}
                        onChange={(event) => setCpf(event.target.value)}
                        margin="normal"
                        error={errors.cpf}
                        helperText={errors.cpf}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        margin="normal"
                        error={errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                  </Grid>
                )
              }

              {
                step === 1 && (
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <PatternFormat
                        label="CEP"
                        format='#####-###'
                        variant="outlined"
                        fullWidth
                        value={cep}
                        onChange={(event) => setCep(event.target.value)}
                        margin="normal"
                        autoFocus
                        max
                        customInput={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        label="Rua"
                        variant="outlined"
                        fullWidth
                        value={street}
                        onChange={(event) => setStreet(event.target.value)}
                        margin="normal"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        label="Bairro"
                        variant="outlined"
                        fullWidth
                        value={neighborhood}
                        onChange={(event) => setNeighborhood(event.target.value)}
                        margin="normal"

                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        label="Cidade"

                        variant="outlined"
                        fullWidth
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        margin="normal"

                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>

                      <Select
                        label="Estado"
                        variant="outlined"
                        fullWidth
                        value={uf}
                        onChange={(event) => setUf(event.target.value)}
                        margin="normal"
                      >
                        {UFS.map(uf => <MenuItem key={uf.uf} value={uf.uf}>{uf.nome}</MenuItem>)}
                      </Select>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        label="Complemento"
                        variant="outlined"
                        fullWidth
                        value={complement}
                        onChange={(event) => setComplement(event.target.value)}
                        margin="normal"

                      />
                    </Grid>
                  </Grid>
                )
              }

              {
                step === 2 && (

                  <Grid container >

                    <Grid item xs={6}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <TextField
                            label="Nome do cartão"
                            variant="outlined"
                            fullWidth
                            value={cardName}
                            onChange={(event) => setCardName(event.target.value)}
                            margin="normal"
                            autoFocus

                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <PatternFormat
                            format="#### #### #### ####"
                            label="Número do cartão"
                            variant="outlined"
                            fullWidth
                            value={cardNumber}
                            onChange={(event) => setCardNumber(event.target.value)}
                            customInput={TextField}

                          />

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>


                          <DatePicker
                            disablePast
                            views={["month", "year"]}
                            label="Data de expiração"
                            format="MM/yyyy"
                            value={cardDateExpiration}
                            onChange={(date) => setCardDateExpiration(date)}
                          />


                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>

                          <PatternFormat
                            format="###"
                            label="CVV"
                            variant="outlined"
                            fullWidth
                            value={cardCvv}
                            onChange={(event) => setCardCvv(event.target.value)}
                            customInput={TextField}
                          />

                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={6}>
                      <Box mt={10} display="flex" alignItems="center" justifyContent="center">
                        <Card style={{ padding: '4px', width: '80%', height: '200px' }}>
                          <Typography>{cardName.toUpperCase() || 'NOME DO CARTÃO'}</Typography>
                          <Typography>{cardNumber || 'XXXX XXXX XXXX XXXX'}</Typography>
                        </Card>
                      </Box>
                    </Grid>

                  </Grid>
                )
              }

              <Box display="flex" justifyContent="space-between">
                <Button onClick={handlePreviousStep} disabled={step === 0}>Voltar</Button>
                {step < 2 && <Button onClick={handleNextStep}>Avançar</Button>}
                {step === 2 && <Button onClick={handleAddOrder}>Finalizar</Button>}
              </Box>
            </Box>


          </CardContent>
        </Card>
      </Paper>
    </Container >
  );
}

export default Checkout;