import styles from './Header.module.css';
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

function Header() {
   return(
    <header className={styles.headerSection}>
      <div className={styles.headerContent}>
        <h1 className={styles.logo}>
          <HiOutlineSwitchHorizontal className={styles.logoIcon} />
          ratewise
          <span>.</span>
        </h1>
      </div>
    </header>
   )
}

export default Header