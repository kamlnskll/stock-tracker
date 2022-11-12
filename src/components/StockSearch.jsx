import { useContext, useState } from 'react'
import Turnstone from 'turnstone'
import { StockContext } from '../StockContext'



const StockSearch = () => {

  const {stockData, setStockData} = useContext(StockContext)

  const [ticker, setTicker] = useState({})
  const [companyData, setCompanyData] = useState({})

  
  const fetchTickerandDisplayCompanyData = async (query) => {
  await fetch(`https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_FMP_APIKEY}`).then(function (res) {
if(res.ok){
  return res.json()
}}).then(function (data) {
  setCompanyData(data)
  setStockData(data)
  // console.log(companyData)
  console.log(stockData)
}).catch(function (err){
  console.log(err)
})
 
// {headers: {'Access-Control-Allow-Origin': '*'}}
}


  const listbox = {
    displayField: 'characters',
    data: async (query) => {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&limit=5&apikey=${process.env.REACT_APP_AV_API_KEY}`
      )
      const data = await res.json()
      const results = data.bestMatches
      console.log(results)
      // setTicker(Object.values(results)[0] || {})
      return results
    },
    searchType: 'startsWith',
  }

  const styles = {
    input: 'uppercase w-full border py-2 px-4 text-lg outline-none rounded-md text-lg',
    listbox: 'bg-sky-100 w-full text-black rounded-md',
    highlightedItem: 'font-semibold bg-sky-200 cursor-pointer py-2 rounded-md',
    query: 'text-oldsilver-800 placeholder:text-slate-600',
    typeahead: 'text-slate-500',
    clearButton:
      'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
    noItems: 'cursor-default text-center my-20',
    match: 'font-bold',
    groupHeading: 'px-5 py-3 text-pink-500',
  }

const handleStockDataSearch = async (input) => {
if(input !== {}){
// console.log(input['1. symbol'])
// setTickerData(input['1. symbol'])
await fetchTickerandDisplayCompanyData(input['1. symbol'])
}
else{input = 'Nothing here'}
}

  return (
  <div className=''>
    <div className='flex justify-center gap-6'>
    <Turnstone
    id='search'
    name='search'
    autoFocus={true}
    typeahead={true}
    clearButton={true}
    debounceWait={400}
    listboxIsImmutable={true}
    minQueryLength={1}
    maxItems={5}
    noItemsMessage="We couldn't find any stocks that matches your search"
    placeholder='Search by ticker'
    listbox={listbox}
    styles={styles}
    onSelect={(selectedItem) => setTicker(selectedItem)}

  />

<button className='border bg-blue-100 hover:bg-blue-200 text-sm rounded-lg px-6' onClick={() => handleStockDataSearch(ticker)}>Get Stock Data</button>

</div>

{/* <h1>Buttons for testing functionality</h1>
<div className='flex space-between mt-4 gap-4'>
<button className='border' onClick={() => console.log(stockData)}>Console Log The Stock Data</button> */}
{/* <button className='border' onClick={() =>  setTicker(tickerData['1. symbol'])}> Set The Ticker</button>
<button className='border' onClick={() =>  console.log(ticker)}> Show Just The Ticker</button>
<button className='border' onClick={() =>  fetchTickerandDisplayCompanyData(ticker)}>Testing out FMP API Response + Promises</button>
<button className='border' onClick={() =>  console.log(process.env.REACT_APP_FMP_APIKEY)}>FMP API KEY</button> */}

</div>




  )
}

export default StockSearch