import { useState, useEffect } from 'react';
import {
LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import styles from './RateHistory.module.css';

function RateHistory() {
    return(
        <div className={styles.ratesContainer}></div>
    )
}

export default RateHistory;