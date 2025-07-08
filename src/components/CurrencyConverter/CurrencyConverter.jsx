import { useState, useEffect } from 'react';

import ConversionResult from "./components/ConversionResult/ConversionResult";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import Header from "./components/Header/Header";
import SwapButton from "./components/SwapButton/SwapButton";
import styles from './CurrencyConverter.module.css'
import { fetchMockConversion } from '../../api/mockApi';

const currenciesList = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'JPY'];

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency]  = useState('USD');
  const [toCurrency, setToCurrency] = useState('GBP');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      setExchangeRate(1);
      return;
    }

    const fetchConversion = async () => {
      if (!amount) {
        setConvertedAmount(0);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetchMockConversion(fromCurrency, toCurrency);

        if (response.success) {
          const rate = response.rate;
          setExchangeRate(rate);
          setConvertedAmount((amount * rate).toFixed(4));
        } else {
          console.error(response.error);
          setConvertedAmount(null);
        }


      } catch (error) {
        console.error('Error fetching mock conversion rate:', error);
        setConvertedAmount(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversion();
  }, [amount, fromCurrency, toCurrency]);


  return(
    <div className={styles.converterContainer}>
      <Header />
      <main className={styles.converterBody}>
        <div className={styles.inputsRow}>
          <CurrencyInput 
          label='amount'
          currencies={currenciesList}
          selectedCurrency={fromCurrency}
          onCurrencyChange={e => setFromCurrency(e.target.value)}
          amount={amount}
          onAmountChange={e => setAmount(e.target.value)}
          />

          <SwapButton 
          onClick={handleSwapCurrencies}
          />

          <CurrencyInput 
          label='Converted to'
          currencies={currenciesList}
          selectedCurrency={toCurrency}
          onCurrencyChange={e => setToCurrency(e.target.value)}
          amount={convertedAmount === null ? '' : convertedAmount}
          onAmountChange={() => {}}
          isAmountDisabled={true}
          />
        </div>

        <ConversionResult 
        isLoading={isLoading}
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        convertedAmount={convertedAmount}
        exchangeRate={exchangeRate}
        />
      </main>
    </div>
  );
}



export default CurrencyConverter;