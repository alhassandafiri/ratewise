import { useState, useEffect } from 'react';
import {
LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { popularCurrencies } from '../../utils/currencyUtils';

import CustomDropdown from '../CustomDropDown/CustomDropDown';
import styles from './RateHistory.module.css';


function RateHistory() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('GBP');


    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    if (fromCurrency === toCurrency) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost/currency-api/public/api/history?from=${fromCurrency}&to=${toCurrency}`);
        if (!response.ok) {
          throw new Error('Failed to fetch historical data.');
        }
        const result = await response.json();
        if (result.success) {
          setData(result.history);
        } else {
          throw new Error(result.error || 'An unknown API error occurred.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [fromCurrency, toCurrency]);

    if(isLoading) return <div className={styles.status}>Loading chart data...</div>;
    if(error) return <div className={`${styles.status} ${styles.error}`}>Error: {error}</div>;

      return (
    <div className={styles.chartContainer}>
      <div className={styles.controlsHeader}>
        <h3 className={styles.chartTitle}>
          Rate History
        </h3>
        <div className={styles.controls}>
          <CustomDropdown
            options={popularCurrencies}
            selectedValue={fromCurrency}
            onSelect={setFromCurrency}
          />
          <span className={styles.toText}>to</span>
          <CustomDropdown
            options={popularCurrencies}
            selectedValue={toCurrency}
            onSelect={setToCurrency}
          />
        </div>
      </div>
      
      <div className={styles.chartWrapper}>
        {isLoading && <div className={styles.status}>Loading Chart Data...</div>}
        {error && <div className={`${styles.status} ${styles.error}`}>Error: {error}</div>}
        {!isLoading && !error && data.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} domain={['dataMin - 0.005', 'dataMax + 0.005']} tickFormatter={(tick) => tick.toFixed(3)} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--surface-color)', 
                  borderColor: 'var(--border-color)' 
                }}
              />
              <Legend formatter={() => `${fromCurrency}/${toCurrency}`} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="var(--primary-color)" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {!isLoading && !error && data.length === 0 && (
           <div className={styles.status}>Select two different currencies to view history.</div>
        )}
      </div>
    </div>
  );
}

export default RateHistory;