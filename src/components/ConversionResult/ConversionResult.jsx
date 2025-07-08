import styles from './ConversionResult.module.css'

function ConversionResult({
  isLoading,
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  exchangeRate
}) {

  if (isLoading) {
    return <div className={styles.resultContainer}>
      <p>Retrieving exchange rate...</p>
    </div>
  }

  if (convertedAmount === null || !amount) {
    return <div className={styles.resultContainer}>
      <p>Enter an amount to see the conversion.</p>
    </div>
  }

  return(
    <div className={styles.resultContainer}>
      <p className={styles.mainResult}>
        {amount} {fromCurrency} =
      </p>
      
      <h2 className={styles.convertedAmount}>
        {convertedAmount} {toCurrency}
      </h2>
      <p>
        1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
      </p>
    </div>
  )
}

export default ConversionResult;