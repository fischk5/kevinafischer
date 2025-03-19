import styles from './Header.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.containerInner}>
                <div className={styles.logo}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span>Kevin Fischer</span>    
                    </Link>
                </div>
            </div>
        </div>
    )
}
