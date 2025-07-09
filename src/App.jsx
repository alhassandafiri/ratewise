import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter"
import Header from "./components/Header/Header"
import './App.css'

function App() {
  return(
  <div className="App">
    <Header />
    <main className="main-content">
      <CurrencyConverter />
    </main>
  </div>)
}

export default App
