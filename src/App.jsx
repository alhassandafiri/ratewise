import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Header from "./components/Header/Header";
import RatesTable from "./components/RatesTable/RatesTable";
import NavBar from "./components/NavBar/NavBar";
import './App.css';

function App() {
  return(
  <div className="App">
    <div className="page-header">
      <Header />
      <NavBar />
    </div>
    <div className="main-content">
      <CurrencyConverter />
      <RatesTable />
    </div>
  </div>)
}

export default App;
