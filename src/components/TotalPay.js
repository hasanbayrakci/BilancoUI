import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

const TotalPay = ({ chartData }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(chartData[0]?.toplamData ?? 0);
  }, [chartData]);

  return (
    <div>
      <Title>Toplam Tutar</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
    </div>
  )
}

export default TotalPay