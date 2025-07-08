import styles from './CurrencyInput.module.css'

function CurrencyInput() {
  return(
    <section className={styles.currencyInputSection}>
      <div className={styles.currencyInputContainer}>
        <input
        type='number'
        />
      </div>
    </section>
  )
}

export default CurrencyInput;
