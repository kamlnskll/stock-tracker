import { useEffect, useState } from "react";
import StockSearch from "./components/StockSearch";
import TickerCard from './components/TickerCard'
import { StockContext } from "./StockContext";
import { ThemeContext } from "./ThemeContext";
import StockNews from "./components/StockNews";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun  } from '@fortawesome/free-solid-svg-icons'
function App() {

const [stockData, setStockData] = useState('')
const [nightMode, setNightMode] = useState(true)
const [theme, setTheme] = useState('light')

// Check if night mode is true or false according to local storage and if it doesn't exist, then we set it.
const handleNightModeClick = () => {
  window.localStorage.setItem('nightMode', JSON.stringify(nightMode))
  setNightMode(!nightMode)
  // console.log(nightMode)
}

const toggleTheme = () => {
  setTheme((current) => (current === 'light' ? "dark" : "light"))
}

useEffect(() => {
  const checkLocalStorage = JSON.parse(window.localStorage.getItem('nightMode')) || nightMode
  console.log(checkLocalStorage)
}, [])

  return (
    <StockContext.Provider value={{stockData, setStockData}}>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div className={theme}>
      <div className="flex justify-evenly mt-8 mb-12 dark:bg-slate-700">
      <div>
    Test
    </div>
    <div>
    <h1 className='font-bold text-center text-3xl cursor-pointer hover:italic dark:text-white' onClick={() => window.location.reload()} >
      Stock Tracker
    </h1>
    </div>
    <div className="my-auto cursor-pointer" onClick={() => toggleTheme()}>
      {theme === 'dark' ? <FontAwesomeIcon icon={faMoon} size="lg"/> : <FontAwesomeIcon icon={faSun} size="lg"/> }
    </div>
    </div>
   <StockSearch/>
   <div className={stockData ? `hidden` : `bg-sky-200 w-2/3 mx-auto text-justify rounded-xl py-6 px-4 mt-16 border-2`}>
   <h1>To start, search for a stock by its ticker in the field above then click the result in the field. After that, click on <span className="font-semibold">Get Stock Data</span> beside the search bar to populate the data.</h1>
   </div>
   <div className={stockData ? `border pb-24 mt-8 w-5/6 mx-auto bg-slate-100 rounded-xl` : `hidden`}>
   <TickerCard />
   <StockNews />
    </div>
  
    </div>
    </ThemeContext.Provider>
    </StockContext.Provider>
  );
}

export default App;
