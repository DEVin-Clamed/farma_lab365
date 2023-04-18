import { Avatar, Box, Card, CardActions, CardContent, Divider, Paper, Typography } from '@mui/material';
import React from 'react';


function CardList({ title, icon, children }) {
  return (
    <Paper style={{ maxWidth: '70%', margin: '40px auto', position: 'relative' }} elevation={5}>
      <Card >
        <CardContent>
          <Box display="flex"  alignItems="center">
            <Avatar style={{ background: '#1976D2', position: 'absolute', top: '-20px' }} variant="square">
              {icon}
            </Avatar>
            <Typography variant='h6' color="primary" marginLeft="50px">{title}</Typography>
          </Box>
          <Divider />
        </CardContent>
        <CardActions>
         {children}
        </CardActions>
      </Card>
    </Paper>
  );
}

export default CardList;