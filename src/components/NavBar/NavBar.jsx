import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
    return(
      <nav className={styles.navBar}>
        <ul>
            <li><Link to='/' className={styles.active}>Converter</Link></li>
            <li><Link to='/rates' className={styles.active}>Live Rates</Link></li>
            <li><Link to='/history'>Rate History</Link></li>
        </ul>
      </nav>  
    )
}

export default NavBar;