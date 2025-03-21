"use client"

import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { IoMenu } from "react-icons/io5"
import { IoClose } from "react-icons/io5"
import { useState, useEffect, useRef } from 'react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuOpen && 
                menuRef.current && 
                buttonRef.current && 
                !menuRef.current.contains(event.target as Node) && 
                !buttonRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    return (
        <div className={styles.container}>
            <div className={styles.containerInner}>
                <div className={styles.headerSide}>
                    <Link href="/">Blog</Link>
                    <Link href="/portfolio">Portfolio</Link>
                </div>
                <div className={styles.logo}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Image 
                            src="/kfischer_logo_black.png" 
                            alt="Kevin Fischer Logo" 
                            width={24} 
                            height={24}
                            className={styles.logoImage}
                        />
                        <span className={styles.logoText}>Kevin Alan Fischer</span>    
                    </Link>
                </div>
                <div className={styles.headerSideResponsiveMenu}>
                    <button 
                        ref={buttonRef}
                        className={styles.menuButton} 
                        onClick={toggleMenu} 
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>

                <div 
                    ref={menuRef}
                    className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}
                >
                    <div className={styles.mobileMenuContent}>
                        <Link href="/" onClick={toggleMenu}>Blog</Link>
                        <Link href="/portfolio" onClick={toggleMenu}>Portfolio</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
