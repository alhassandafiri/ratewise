import styles from './Footer.module.css';


function Footer() {

  return(
    <footer className={styles.footerSection}>
      <div className={styles.footerContent}>
        <p className={styles.copyright}>
        Designed & Built by <a className={styles.footerLink} href="http://localhost:5174/" target="_blank" rel="noopener noreferrer"> Al-Hassan Dafiri</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer;