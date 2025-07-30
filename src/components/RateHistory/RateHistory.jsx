import { useState, useEffect, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { popularCurrencies } from '../../utils/currencyUtils';
import CustomDropdown from '../CustomDropDown/CustomDropDown';
import styles from './RateHistory.module.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const fullDate = new Date(payload[0].payload.date).toLocaleDateString('en-GB', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    return (
      <div className={styles.customTooltip}>
        <p className={styles.tooltipLabel}>{fullDate}</p>
        <p className={styles.tooltipValue}>{`Rate: ${payload[0].value.toFixed(4)}`}</p>
      </div>
    );
  }
  return null;
};

const dateRanges = [
    { label: '1M', months: 1 },
    { label: '3M', months: 3 },
    { label: '6M', months: 6 },
    { label: '1Y', months: 12 },
    { label: '5Y', months: 60 },
];

function RateHistory() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('GBP');
    const [activePeriod, setActivePeriod] = useState('1M');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (fromCurrency === toCurrency) {
        setData([]); setIsLoading(false); return;
      }
      const fetchHistory = async () => {
        setIsLoading(true); setError(null);
        const selectedRange = dateRanges.find(range => range.label === activePeriod);
        const today = new Date();
        const startDate = new Date();
        startDate.setMonth(today.getMonth() - selectedRange.months);
        const startDateString = startDate.toISOString().split('T')[0];
        try {
          const response = await fetch(`http://localhost/currency-api/public/api/history?from=${fromCurrency}&to=${toCurrency}&start_date=${startDateString}`);
          if (!response.ok) throw new Error('Failed to fetch historical data.');
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
    }, [fromCurrency, toCurrency, activePeriod]);

    const getEvenlySpacedTicks = (data, numTicks = 10) => {
      if (!data || data.length < 2) return [];
      const totalItems = data.length;
      const step = Math.floor(totalItems / (numTicks - 1));
      const ticks = [];
      for (let i = 0; i < totalItems; i += step) {
        ticks.push(data[i].date);
      }

      if (!ticks.includes(data[totalItems - 1].date)) {
        ticks.push(data[totalItems - 1].date);
      }
      return ticks;
    };
    
    const chartTicks = useMemo(() => getEvenlySpacedTicks(data, 10), [data]);

    const formatXAxisTick = (tickItem) => {
      const date = new Date(tickItem);
      const options = { month: 'short' };
      if (activePeriod === '1Y' || activePeriod === '5Y') {
        options.year = 'numeric';
      } else {
        options.day = 'numeric';
      }
      return date.toLocaleDateString('en-GB', options);
    };


    if (isLoading) return <div className={styles.status}>Loading Chart Data...</div>;
    if (error) return <div className={`${styles.status} ${styles.error}`}>Error: {error}</div>;

    return (
      <motion.section 
        className={styles.chartContainer}
      >
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
          {!isLoading && !error && data.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                
                <XAxis 
                  dataKey="date" 
                  stroke="var(--text-secondary)" 
                  fontSize={12}
                  ticks={chartTicks}
                  tickFormatter={formatXAxisTick}
                />
                
                <YAxis 
                  stroke="var(--text-secondary)" 
                  fontSize={12} 
                  domain={['dataMin - 0.005', 'dataMax + 0.005']} 
                  tickFormatter={(tick) => tick.toFixed(3)} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={() => `${fromCurrency} / ${toCurrency}`} />
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
        </div>
      </motion.section>
    );
}

export default RateHistory;