import styles from '../styles/Header.module.css'

function Header() {
   return(
    <section className={styles.headerSection}>
      <div className={styles.headerContent}>
        <h1>Currency Converter</h1>
      </div>
    </section>
   )
}

export default Header