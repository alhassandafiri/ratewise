import styles from './CurrencyInput.module.css'

function CurrencyInput({
  label,
  currencies,
  selectedCurrency,
  onCurrencyChange,
  amount,
  onAmountChange,
  isAmountDisabled = false
}) {
  return(
    <div className={styles.currencyInputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputContainer}>
        <input
        type='number'
        value={amount}
        onChange={onAmountChange}
        className={styles.amountInput}
        disabled={isAmountDisabled}
        min='0'
        />

        <select
        value={selectedCurrency}
        onChange={onCurrencyChange}
        className={styles.currencySelect}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CurrencyInput;
