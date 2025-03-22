import styles from './PortfolioNavigationBar.module.css'

interface PortfolioNavigationBarProps {
    view: string;
    setView: (view: string) => void;
}

export default function PortfolioNavigationBar({ view, setView }: PortfolioNavigationBarProps) {
    const navigationItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'product', label: 'Product' },
        // { id: 'outcomes', label: 'Outcomes' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'credits', label: 'Team' }
    ];

    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <ul className={styles.navItems}>
                    {navigationItems.map((item) => (
                        <li 
                            key={item.id}
                            className={`${styles.navItem} ${view === item.id ? styles.active : ''}`}
                            onClick={() => setView(item.id)}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
} 