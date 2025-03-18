import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>
                    Copyright 2025 Kevin A Fischer
                </div>
                <div className={styles.credit}>
                    Designed by Kevin Fischer
                </div>
            </div>
        </footer>
    )
} 