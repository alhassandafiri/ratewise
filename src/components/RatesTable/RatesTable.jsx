import { useEffect, useState } from 'react';
import styles from './RatesTable.module.css';

import { currencyToCountryCode } from '../../utils/currencyUtils';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function RatesTable({ onRowClick }) {

  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('http://localhost/currency-api/public/api/rates');

        if (!response.ok) {
          throw new Error('Something went wrong while fetching rates.');
        }
        
        const data = await response.json();

        if (data.success) {
          setRates(data.rates);
        } else {
          throw new Error(data.error || 'Failed to parse data.')
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();

  }, []);

if (isLoading) {
  return(
    <section className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>
      Live Exchange Rates
      </h2>
      <p style={{textAlign: 'center'}}>
      Loading rates...
      </p>
    </section>
  );
}

if (error) {
  return(
    <section className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>
      Live Exchange Rates
      </h2>
      <p style={{textAlign: 'center', color: 'red'}}>
      Error: {error}
      </p>
    </section>
  );
}

  return (
    <motion.section className={styles.tableContainer}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}>

      <h2 className={styles.tableTitle}>Live Exchange Rates</h2>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>From</span>
          <span>To</span>
          <span>Rate</span>
        </div>
        {rates.map((pair, index) => (
          <div key={index} 
          className={styles.tableRow}
          onClick={() => onRowClick(pair.from, pair.to)}
          >
             <span className={styles.currencyPair}>
            <img
              src={`https://flagcdn.com/w40/${currencyToCountryCode[pair.from]}.png`}
              alt={`${pair.from} flag`}
              className={styles.flag}
            />
            {pair.from}
          </span>

            <span className={styles.currencyPair}>
            <img
              src={`https://flagcdn.com/w40/${currencyToCountryCode[pair.to]}.png`}
              alt={`${pair.to} flag`}
              className={styles.flag}
            />
            {pair.to}
          </span>

            <span className={styles.rate}>{pair.rate.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default RatesTable;