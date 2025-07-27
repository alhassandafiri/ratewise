import { useState, useEffect } from 'react';
import {
LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import styles from './RateHistory.module.css';

const fromCurrency = 'USD';
const toCurrency = 'GBP';


function RateHistory() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                    throw new Error(result.error || 'An unknown API error occurred.')
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if(isLoading) return <div className={styles.status}>Loading chart data...</div>;
    if(error) return <div className={`${styles.status} ${styles.error}`}>Error: {error}</div>;

    return(
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>
            Rate History: {fromCurrency} to {toCurrency} (Last 30 days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart 
                data={data}
                margin={{top: 5, right: 20, left: -10, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)"/> 
                    <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} domain={['dataMin - 0.005', 'dataMax ' + 0.005]}/>
                    <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--surface-color)',
                        borderColor: 'var(--border-color)'
                    }}/>
                    <Legend/>
                    <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="var(--primary-color)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r:6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RateHistory;