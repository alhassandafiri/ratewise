import { useEffect, useRef, useState } from 'react';
import { IoChevronDown } from "react-icons/io5";
import styles from './CustomDropDown.module.css';

const currencyToCountryCode = {
  USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca'
};

function CustomDropDown({ options, selectedValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const selectedCountryCode = currencyToCountryCode[selectedValue] || 'xx';

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.dropdownSelected} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.selectedContent}>
          <img
            src={`https://flagcdn.com/w40/${selectedCountryCode}.png`}
            alt={`${selectedValue} flag`}
            className={styles.flag}
          />
          <span>{selectedValue}</span>
          <IoChevronDown className={`${styles.caret} ${isOpen ? styles.caretOpen : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdownOptions}>
          {options.map((option) => {
            const countryCode = currencyToCountryCode[option] || 'xx';
            return (
              <div
                key={option}
                className={styles.option}
                onClick={() => handleOptionClick(option)}
              >
                <img
                  src={`https://flagcdn.com/w40/${countryCode}.png`}
                  alt={`${option} flag`}
                  className={styles.flag}
                />
                <span>{option}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomDropDown;