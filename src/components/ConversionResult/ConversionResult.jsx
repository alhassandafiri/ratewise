import styles from './ConversionResult.module.css'

function ConversionResult() {
  return(
    <section className={styles.conversionResultSection}>
      <div className={styles.conversionResultContainer}>
        <p>$1 USD = 0.7345 GBP</p>
      </div>
    </section>
  )
}

export default ConversionResult;