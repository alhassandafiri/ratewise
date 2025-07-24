import styles from './NavBar.module.css';

function NavBar() {
    return(
      <nav className={styles.navBar}>
        <ul>
            <li><a href='#' className={styles.active}>Converter</a></li>
            <li><a href='#' className={styles.active}>Live Rates</a></li>
            <li><a href='#'>Rate History</a></li>
        </ul>
      </nav>  
    )
}

export default NavBar;