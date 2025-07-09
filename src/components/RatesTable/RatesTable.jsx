import styles from './RatesTable.module.css'

const popularRates = [
  { from: 'USD', to: 'EUR', rate: 0.92 },
  { from: 'USD', to: 'GBP', rate: 0.79 },
  { from: 'USD', to: 'JPY', rate: 150.55 },
  { from: 'EUR', to: 'GBP', rate: 0.85 },
  { from: 'AUD', to: 'USD', rate: 0.66 }
]

function RatesTable() {
  return (
    <section className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Live Exchange Rates</h2>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>From</span>
          <span>To</span>
          <span>Rate</span>
        </div>
        {popularRates.map((pair, index) => (
          <div key={index} className={styles.tableRow}>
            <span className={styles.currencyPair}>
              <span className={styles.flag}></span> {/* In future, you can replace with flag icons */}
              {pair.from}
            </span>
            <span className={styles.currencyPair}>
              <span className={styles.flag}></span>
              {pair.to}
            </span>
            <span className={styles.rate}>{pair.rate.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RatesTable;