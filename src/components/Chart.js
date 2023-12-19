import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid, MenuItem, TextField } from '@mui/material';
import apiUrl from './Config';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export default function Chart(chartSeries, updateSeries) {

  const [series, setSeries] = useState([]);
  const [kalemTurleri, setKalemTurleri] = useState([]);
  const [kalem, setKalem] = useState(1);
  const currentDate = new Date();
  const [yil, setYil] = useState(dayjs(currentDate).year());

  const getData = async () => {
    try {
      const response = await fetch(apiUrl + 'Chart/' + kalem + '/' + yil);
      const data = await response.json();
      setSeries(data);
    } catch (error) {
      console.error('Response Error:', error);
    }
  };

  useEffect(() => {
    getKalemTurleri();
  }, []);

  useEffect(() => {
    getData();
  }, [kalem, yil]);

  const getKalemTurleri = async () => {
    try {
      const response = await fetch(apiUrl + 'Kalemler');
      const data = await response.json();
      setKalemTurleri(data);
      getData();
    } catch (error) {
      console.error('Response Error:', error);
    }
  };

  const kalemClick = async (id) => {
    setKalem(id);
  }

  const yilClick = async (id) => {
    setYil(dayjs(id).year());
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            id="kalem"
            select
            label="Kalem"
            defaultValue={1}
            onChange={(e) => kalemClick(e.target.value)}
          >
            {kalemTurleri.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
            <DatePicker
              label="Yıl"
              openTo="year"
              views={['year']}
              format='YYYY'
              defaultValue={dayjs(currentDate)}
              onChange={(e) => yilClick(e)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <BarChart
        xAxis={[{ scaleType: 'band', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
        series={series}
      />
    </>
  );
}