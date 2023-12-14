import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { MenuItem, TextField } from '@mui/material';


export default function Chart() {

  const [series, setSeries] = useState([]);
  const [kalemTurleri, setKalemTurleri] = useState([]);

  const getData = async (id) => {
    try {
      const response = await fetch('https://localhost:7068/Chart/' + id);
      const data = await response.json();
      setSeries(data);
    } catch (error) {
      console.error('Response Error:', error);
    }
  };

  useEffect(() => {
    getKalemTurleri();
  }, []);


  const getKalemTurleri = async () => {
    try {
      const response = await fetch('https://localhost:7068/Kalemler');
      const data = await response.json();
      setKalemTurleri(data);
      getData(data[0].id);
    } catch (error) {
      console.error('Response Error:', error);
    }
  };


  return (
    <>
      <TextField
        id="kalem"
        select
        label="Kalem"
        defaultValue={1}
        onChange={(e) => getData(e.target.value)}
      >
        {kalemTurleri.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <BarChart
        xAxis={[{ scaleType: 'band', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
        series={series}
      />
    </>
  );
}