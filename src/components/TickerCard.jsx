import React, {useContext } from 'react'
import { StockContext } from '../StockContext'
import StockChart from './StockChart'

const TickerCard = () => {
  const {stockData} = useContext(StockContext) 
  
  const isNegativeNum = (num) => {
    if (Math.sign(num) === -1){
    return true
  } else{
    return false
  }}
  return (

    <div className='w-5/6 mx-auto mt-16'>
    {/* Iterate through stored context for Stock Data */}

    {Object.values(stockData).map((value, index) => {
      return(
        <>
<div key={index} className='w-full rounded-xl'>
  
  <div>
    <div>
      <div className='flex justify-between'>
      <div className='md:flex md:gap-4 my-auto'>
    <h1 className='font-extrabold my-auto text-lg'>{value.companyName}</h1>
    <h1 className='font-semibold my-auto text-lg'>{value.symbol}</h1>
    <h1 className='font-semibold text-xs italic my-auto'>{value.exchangeShortName}</h1>
    </div>
    <div>
      <a href={value.website} target='__blank'>
  <img className='scale-50 rounded-xl object-fit' src={value.image}/>
  </a>
    </div>
    <div className='my-auto'>
      {/* ml-24 md:ml-72 */}
    <h1 className='text-sm italic h-full'>{value.industry}</h1>
    </div>
    </div>
    </div>
    <div className='mt-6 flex my-auto gap-3'>
    <h2 className='font-bold text-3xl'>${value.price}</h2>
    <h2 className={isNegativeNum(value.changes) ? `text-red-700 my-auto` : `text-green-700 my-auto`}><span className='my-auto'>{isNegativeNum(value.changes) ? '' : '+'}</span>{parseFloat(value.changes).toFixed(2)}</h2>
    </div>
    <StockChart />
    </div>

    </div>


    </>
)

    })}
    
    </div>
  
  )
}

export default TickerCard