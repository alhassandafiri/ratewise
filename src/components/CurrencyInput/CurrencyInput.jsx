import styles from './CurrencyInput.module.css'
import CustomDropDown from '../CustomDropDown/CustomDropDown';

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

        <div className={styles.dropdownWrapper}>
          <CustomDropDown 
          options={currencies}
          selectedValue={selectedCurrency}
          onSelect={onCurrencyChange}
          />
        </div>
      </div>
    </div>
  )
}

export default CurrencyInput;
