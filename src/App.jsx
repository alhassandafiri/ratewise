import ConversionResult from "./components/ConversionResult"
import CurrencyInput from "./components/CurrencyInput"
import ExchangeRateInfo from "./components/ExchangeRateInfo"
import Header from "./components/Header"
import SwapButton from "./components/SwapButton"

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
