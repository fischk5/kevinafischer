"use client"

import styles from './TableOfContents.module.css'

export interface TocItem {
    id: string;
    text: string;
}

interface TableOfContentsProps {
    items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    if (items.length === 0) {
        return null;
    }
    
    return (
        <div className={styles.tableOfContents}>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
} 