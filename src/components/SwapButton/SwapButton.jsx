import styles from './SwapButton.module.css'

function SwapButton() {
  return(
    <section className={styles.swapButtonSection}>
      <div className={styles.swapButtonContainer}>
        <button>Convert Currency</button>
      </div>
    </section>
  )
}

export default SwapButton;