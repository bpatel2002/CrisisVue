'use client'
import React from 'react'
import BarChart from './components/barchart'
import axios from 'axios'
function page() {
  //axios some data and build data
  const data = {
    labels: ['Cal', 'Ido',],
    datasets: [
      {
        label: 'Casualties',
        data: [1, 2],
        backgroundColor: [
          'rgba(234, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  async function getShootings() {
    var result = await axios.get("http://127.0.0.1:5000/events");
    console.log(result.data);
  }

  getShootings();
  return (
    <div style = {{height: '20em', width: '40em'}}><BarChart chartData={data}/></div>
  );
}

export default page