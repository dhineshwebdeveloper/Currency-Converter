
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [amount, setAmount] = useState(1);
  const [fromcurrency, setFromcurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("INR");
  const [converateamount, settConverateamount] = useState(null);
  const [exchangeRate, setexchangeRate] = useState(null);

  useEffect(() => {
    const getExachangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
        const response = await axios.get(url)
        // console.log(response)
        setexchangeRate(response.data.rates[tocurrency])
      } catch (error) {
        console.error("Error fetch exchange rate:", error);
      }
    }
    getExachangeRate();
  },[fromcurrency, tocurrency])

useEffect(() => {
if(exchangeRate !== null){
  settConverateamount((amount * exchangeRate).toFixed(2));
}
},[amount, exchangeRate])

  const handleInAmuount = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleInFromCurrency = (e) => {
    setFromcurrency(e.target.value)
  }

  const handleInToCurrency = (e) => {
    setTocurrency(e.target.value)
  }
  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currenct Converter</h1>
          <div className="input-container">
            <label htmlFor="amount">Amount</label>
            <input type="number" id='amount' value={amount} onChange={handleInAmuount} />
          </div>
          <div className="input-container">
            <label htmlFor="from-currency">Form Currency</label>
            <select id="from-currency" value={fromcurrency} onChange={handleInFromCurrency}>
              <option value="USD">USD - United State Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pount Sterling</option>
              <option value="JPY">JPY - Japanses Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR"> ZAR - Sounth African Rand</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="to-currency">To Currency</label>
            <select id="to-currency" value={tocurrency} onChange={handleInToCurrency}>
              <option value="USD">USD - United State Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pount Sterling</option>
              <option value="JPY">JPY - Japanses Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR"> ZAR - Sounth African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromcurrency} is equal to {converateamount} {tocurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
