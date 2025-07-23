import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter"
import Header from "./components/Header/Header"
import './App.css'
import RatesTable from "./components/RatesTable/RatesTable"

function App() {
  return(
  <div className="App">
    <Header />
    <div className="main-content">
      <CurrencyConverter />
      <RatesTable />
    </div>
  </div>)
}

export default App
