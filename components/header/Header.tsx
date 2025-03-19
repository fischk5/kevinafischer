import styles from './Header.module.css'
export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.containerInner}>
                <div className={styles.logo}>
                    <span>Kevin Fischer</span>    
                </div>
            </div>
        </div>
    )
}
