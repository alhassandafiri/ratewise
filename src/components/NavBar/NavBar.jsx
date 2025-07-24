import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
    return(
      <nav className={styles.navBar}>
        <ul>
            <li><NavLink to='/' end className={({ isActive }) => isActive ? styles.active : undefined}>Converter</NavLink></li>

            <li><NavLink to='/rates' end className={({ isActive }) => isActive ? styles.active : undefined}>Live Rates</NavLink></li>

            <li><NavLink to='/history' end className={({ isActive }) => isActive ? styles.active : undefined}>Rate History</NavLink></li>
        </ul>
      </nav>  
    )
}

export default NavBar;