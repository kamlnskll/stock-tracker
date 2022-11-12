import React, {useContext} from 'react'
import { useState } from 'react'
import { StockContext } from '../StockContext'
 


const StockNews = () => {
const {stockData} = useContext(StockContext)
const [articles, setArticles] = useState([])
const [showText, setShowText] = useState(true)

const showNews = () => {
const ticker = stockData[0].symbol
console.log(ticker)
fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${process.env.REACT_APP_AV_API_KEY}`).then(function (res) {
const news = res.json()
return news
// res.json()
}).then(function (data){
  setArticles(data.feed)
  console.log(articles)
  if(articles > 0 && showText(false)){
setShowText(true)
  } else {setShowText(false)}
}).catch(err => console.log(err))
}

return (
  <>
  <h1 className={`${showText ? "hidden" : "font-bold text-xl text-center mt-6"}`}>Stock News</h1>
    <div className='w-3/4 mx-auto overflow-y-scroll h-96 mt-4'>
    <div className='overflow-x-scroll overflow-hidden w-5/6 mx-auto'>
      {Object.values(articles).map((value, index) => {
      return (
        <div key={index} className='border rounded-xl py-3 pl-2 my-2 hover:bg-slate-100 hover:cursor-pointer'>
          <a href={value.url} target="__blank">
          <div className='flex justify-between'>
          <div>
          <h1 className='font-semibold ml-6'>{value.title}</h1>
          <h1 className='text-sm italic ml-6'>{value.source_domain}</h1>
          </div>
          <img src={value.banner_image} alt="article-img" className='h-16 w-16 my-auto mr-12 rounded-full'/>
          </div>
          </a>
        </div>

      )
      })}
    </div>
    <button onClick={() => showNews()} className={showText ? `font-bold bg-sky-200 rounded-lg px-4 py-2 font-center` : `hidden`}>Click for Stock News</button>
    </div>
    </>
    )
}

export default StockNews