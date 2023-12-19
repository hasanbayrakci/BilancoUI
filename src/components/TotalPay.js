import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

const TotalPay = (props) => {
console.log(props);

  return (
    <div>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        123
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
    </div>
  )
}

export default TotalPay