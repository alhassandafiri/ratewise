import { useEffect, useState } from 'react';
import { currencyToCountryCode, currencyCodeToName } from '../../utils/currencyUtils';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import styles from './RatesTable.module.css';
import CustomDropDown from '../CustomDropDown/CustomDropDown';

function RatesTable({ onRowClick }) {
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
   
  const [customToCurrencies, setCustomToCurrencies] = useState(() => {
    const saved = localStorage.getItem('customToCurrencies');
    return saved ? JSON.parse(saved) : {};
  });

  const navigate = useNavigate();

  const baseCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('http://localhost/currency-api/public/api/rates');
        if (!response.ok) throw new Error('Something went wrong while fetching rates.');

        const data = await response.json();
        setLastUpdated(new Date().toLocaleString());

        if (data.success) {
          setRates(data.rates);
        } else {
          throw new Error(data.error || 'Failed to parse data.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    localStorage.setItem('customToCurrencies', JSON.stringify(customToCurrencies));
  }, [customToCurrencies]);


  const baseToCurrencies = baseCurrencies.filter(code => code !== fromCurrency);
  const customTos = customToCurrencies[fromCurrency] || [];
  const toCurrencySet = new Set([...baseToCurrencies, ...customTos]);

  const fromCurrencyRates = rates
    .filter(pair => pair.from === fromCurrency && toCurrencySet.has(pair.to))
    .filter(pair => pair.to.toLowerCase().includes(filter.toLowerCase()));

  const allPossibleTos = Array.from(new Set(rates.map(r => r.to)));

  const availableToAdd = allPossibleTos
    .filter(code => code !== fromCurrency && !toCurrencySet.has(code))
    .sort((a, b) => (currencyCodeToName[a] || a).localeCompare(currencyCodeToName[b] || b));

  const handleClick = (from, to) => {
    navigate(`/?from=${from}&to=${to}`);
  };

  const handleAddCurrency = (newTo) => {
    setCustomToCurrencies(prev => {
      const current = prev[fromCurrency] || [];
      return {
        ...prev,
        [fromCurrency]: [...new Set([...current, newTo])]
      };
    });
  };

  if (isLoading) {
    return (
      <section className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Live Exchange Rates</h2>
        <p style={{ textAlign: 'center' }}>Loading rates...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Live Exchange Rates</h2>
        <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>
      </section>
    );
  }

  return (
    <motion.section
      className={styles.tableContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className={styles.tableTitle}>Live Exchange Rates</h2>

      {lastUpdated && (
        <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
      )}

      <input
        type="text"
        placeholder="Search for a currency..."
        className={styles.searchInput}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className={styles.fromSelector}>
        <label>Base currency:</label>
        <CustomDropDown
          options={baseCurrencies}
          selectedValue={fromCurrency}
          onSelect={(value) => setFromCurrency(value)}
        />
      </div>

      <div className={styles.addCurrencyRow}>
        <label>Add a currency:</label>
        <CustomDropDown
          options={availableToAdd}
          selectedValue={null}
          onSelect={handleAddCurrency}
        />
      </div>

      <div className={styles.table}>
        <div className={styles.specialFromRow}>
          <span className={styles.currencyPair}>
            <img
              src={`https://flagcdn.com/w40/${currencyToCountryCode[fromCurrency]}.png`}
              alt={`${fromCurrency} flag`}
              className={styles.flag}
            />
            {currencyCodeToName[fromCurrency] || fromCurrency} ({fromCurrency})
          </span>
        </div>

        <p className={styles.toLabel}>Exchange rates from {currencyCodeToName[fromCurrency]}:</p>

        {fromCurrencyRates.length === 0 && (
          <div className={styles.tableRow}>
            <span style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              No exchange rates available for this currency.
            </span>
          </div>
        )}

        {fromCurrencyRates.map((pair, index) => (
          <div
            key={index}
            className={styles.tableRow}
            onClick={() => onRowClick(pair.from, pair.to)}
          >
            <span className={styles.currencyPair}>
              <img
                src={`https://flagcdn.com/w40/${currencyToCountryCode[pair.to]}.png`}
                alt={`${pair.to} flag`}
                className={styles.flag}
              />
              {currencyCodeToName[pair.to] || pair.to} ({pair.to})
            </span>

            <span className={styles.rate}>
              {pair.rate.toFixed(4)}
              <button
                className={styles.rowHint}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(pair.from, pair.to);
                }}
                aria-label={`Convert ${pair.from} to ${pair.to}`}
              >
                ↗
              </button>
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default RatesTable;
