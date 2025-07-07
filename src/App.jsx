import ConversionResult from "./components/ConversionResult/ConversionResult"
import CurrencyInput from "./components/CurrencyInput/CurrencyInput"
import ExchangeRateInfo from "./components/ExchangeRateInfo/ExchangeRateInfo"
import Header from "./components/Header/Header"
import SwapButton from "./components/SwapButton/SwapButton"

function App() {
  return(
  <>
  <Header />
  <ExchangeRateInfo />
  <CurrencyInput />
  <SwapButton />
  <CurrencyInput />
  <ConversionResult />
  </>)
}

export default App
