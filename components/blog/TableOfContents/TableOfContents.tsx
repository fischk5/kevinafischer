"use client"

import styles from './TableOfContents.module.css'

export interface TocItem {
    id: string;
    text: string;
}

interface TableOfContentsProps {
    items: TocItem[];
    activeId?: string;
    onItemClick?: (id: string) => void;
}

export default function TableOfContents({ items, activeId = '', onItemClick }: TableOfContentsProps) {
    if (items.length === 0) {
        return null;
    }
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        if (onItemClick) {
            onItemClick(id);
        }
    };
    
    return (
        <div className={styles.tableOfContents}>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <a 
                            href={`#${item.id}`} 
                            onClick={(e) => handleClick(e, item.id)}
                            className={activeId === item.id ? styles.active : ''}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
} 