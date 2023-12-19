import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import TotalPay from './TotalPay';

function Dashboard() {
  document.title = "Ana Sayfa";

  const [chartData, setChartData] = useState([]);

  const updateChartData = (data) => {
    setChartData(data);
  };

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
          }}
        >
          <Chart updateChartData={updateChartData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <TotalPay chartData={chartData} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dashboard