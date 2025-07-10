import styles from './SwapButton.module.css'
import { VscArrowSwap } from "react-icons/vsc";

function SwapButton({
  onClick
}) {


  return(
    <button className={styles.swapButton} onClick={onClick} aria-label='Swap currencies'>
      <VscArrowSwap  size={24}/>
    </button>
  )
}

export default SwapButton;