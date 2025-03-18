import styles from './Header.module.css'
export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.containerInner}>
                <div className={styles.logo}>
                    <span>KEVIN FISCHER</span>    
                </div>
                <div className={styles.navItems}>
                </div>
            </div>
        </div>
    )
}
