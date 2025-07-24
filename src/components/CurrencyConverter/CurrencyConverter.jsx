import { useEffect, useState } from 'react';

import ConversionResult from "../ConversionResult/ConversionResult";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import SwapButton from "../SwapButton/SwapButton";
import styles from './CurrencyConverter.module.css';
import { popularCurrencies } from '../../utils/currencyUtils';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

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
    if (!amount || isNaN(amount)) {
      setConvertedAmount(0);
      return;
    }

    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      setExchangeRate(1);
      return;
    }

    const fetchConversion = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost/currency-api/public/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);

        if (!response.ok) {
          throw new Error('Network response from backend was not ok.');
        }

        const data = await response.json();

        if (data.success) {
          setExchangeRate(data.rate);
          setConvertedAmount(data.convertedAmount);
        } else {
          console.error('API Error:', data.error);
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
    <motion.section className={styles.converterContainer}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}>
      <main className={styles.converterBody}>
        <div className={styles.inputsRow}>
          <CurrencyInput 
          label='Amount'
          currencies={popularCurrencies}
          selectedCurrency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          amount={amount}
          onAmountChange={e => setAmount(e.target.value)}
          />

          <SwapButton 
          onClick={handleSwapCurrencies}
          />

          <CurrencyInput 
          label='Converted to'
          currencies={popularCurrencies}
          selectedCurrency={toCurrency}
          onCurrencyChange={setToCurrency}
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
    </motion.section>
  );
}



export default CurrencyConverter;