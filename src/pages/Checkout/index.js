import { Box, Button, Card, CardContent, Grid, Paper, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

function Checkout() {

  const [step, setStep] = useState(0)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')

  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }


  useEffect(() => {
    if(cep.length === 8) {
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
                      />
                    </Grid>
                  </Grid>
                )
              }

              {
                step === 1 && (
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        label="CEP"
                        variant="outlined"
                        fullWidth
                        value={cep}
                        onChange={(event) => setCep(event.target.value)}
                        margin="normal"
                        autoFocus
                        max
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
                      <TextField
                        label="Estado"
                        variant="outlined"
                        fullWidth
                        value={uf}
                        onChange={(event) => setUf(event.target.value)}
                        margin="normal"
                      />
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
              step === 3 && (
                <div>dskerkrkerkerekr</div>
              )
            }

            <Box display="flex" justifyContent="space-between">
              <Button onClick={handlePreviousStep} disabled={step === 0}>Voltar</Button>
              <Button onClick={handleNextStep}>Avançar</Button>
            </Box>
          </Box>


        </CardContent>
      </Card>
    </Paper>
    </Container >
  );
}

export default Checkout;