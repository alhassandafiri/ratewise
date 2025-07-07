import styles from '../styles/Header.module.css'

function Header() {
   return(
    <section className={styles.sectionContainer}>
      <div className={styles.containerContent}>
        <h1>Currency Converter</h1>
      </div>
    </section>
   )
}

export default Header