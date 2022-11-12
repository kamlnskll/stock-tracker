import React from 'react'
import { useState, useContext, useEffect } from 'react';
import Chart from "react-apexcharts";
import { StockContext } from '../StockContext';



const round = (number) => {
    return number ? + (number.toFixed(2)) : null;
  };

const StockChart = () => {
    const [chartData, setChartData] = useState('')
    const [ticker, setTicker] = useState('')
    const {stockData} = useContext(StockContext)


const fetchChartData = async () => {
    const findChartData = stockData[0]
    console.log(findChartData.symbol)
    await fetch(`https://yahoo-finance-api.vercel.app/${findChartData.symbol}`).then(function (res){
        return res.json()
    }).then(function (data) {
        // console.log(data)
        const result = data.chart.result[0]
        console.log(result)
        const quote = result.indicators.quote[0]
        console.log(quote)
        const candles = result.timestamp.map((timestamp, index) => ({
            x: new Date(timestamp * 1000),
            y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)
        }));
        setSeries([{
            data: candles,
        }])
        console.log(series)
    }).catch(function (err){
        console.log(err)
    })
}

useEffect(() => {
    fetchChartData()
  }, [stockData])
  

const [series, setSeries] = useState([{
    data: []
  }])

const chart = { 
//     series: [{
//     data: []
//   }],
  options: {
    chart: {
      type: 'candlestick',
      height: 750
    },
    title: {
      text: `Candlestick Chart`,
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  },

}

    
  return (    
  <div>
    {/* <button className='border bg-blue-100' onClick={() => fetchChartData()}>Check StockContext Data</button> */}
        <Chart 
        options={chart.options}
        series={series}
        type='candlestick'
        height={'320'}
        width={'100%'}
        />
    </div>
  )
}

export default StockChart