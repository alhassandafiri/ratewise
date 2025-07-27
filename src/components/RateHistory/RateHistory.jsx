import { useState, useEffect } from 'react';
import {
LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { popularCurrencies } from '../../utils/currencyUtils';

import CustomDropdown from '../CustomDropDown/CustomDropDown';
import styles from './RateHistory.module.css';

const dateRanges = [
    { label: '1M', months: 1 },
    { label: '3M', months: 3 },
    { label: '6M', months: 6 },
    { label: '1Y', months: 12 },
    { label: '5Y', months: 60 },
]


function RateHistory() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('GBP');
    const [activePeriod, setActivePeriod] = useState('1M');

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

      const selectedRange = dateRanges.find(range => range.label === activePeriod);
      const today = new Date();
      const startDate = new Date(today.setMonth(today.getMonth() - selectedRange.months));
      const startDateString = startDate.toISOString().split('T')[0];

      try {
        const response = await fetch(`http://localhost/currency-api/public/api/history?from=${fromCurrency}&to=${toCurrency}&start_date=${startDateString}`);
        if (!response.ok) {
          throw new Error('Failed to fetch historical data.');
        }

        const result = await response.json();
        if (result.success) {
          const formattedData = result.history.map(item => ({
            ...item,
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric'}),
          }));

          setData(formattedData);

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
  }, [fromCurrency, toCurrency, activePeriod]);

    if(isLoading) return <div className={styles.status}>Loading chart data...</div>;
    if(error) return <div className={`${styles.status} ${styles.error}`}>Error: {error}</div>;

      return (
     <div className={styles.chartContainer}>
      <div className={styles.controlsHeader}>
        <h3 className={styles.chartTitle}>Rate History</h3>
        <div className={styles.controls}>
          <CustomDropdown options={popularCurrencies} selectedValue={fromCurrency} onSelect={setFromCurrency} />
          <span className={styles.toText}>to</span>
          <CustomDropdown options={popularCurrencies} selectedValue={toCurrency} onSelect={setToCurrency} />
        </div>
      </div>
      
      <div className={styles.dateSelector}>
        {dateRanges.map(range => (
          <button
            key={range.label}
            className={`${styles.dateButton} ${activePeriod === range.label ? styles.active : ''}`}
            onClick={() => setActivePeriod(range.label)}
          >
            {range.label}
          </button>
        ))}
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