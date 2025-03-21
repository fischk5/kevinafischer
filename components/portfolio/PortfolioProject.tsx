"use client"

import Image from 'next/image'
import styles from './PortfolioProject.module.css'
import { PortfolioProjectData } from '@/types'

interface PortfolioProjectProps {
    portfolioProjectData: PortfolioProjectData
}

export default function PortfolioProject({ portfolioProjectData }: PortfolioProjectProps) {
    const { fields } = portfolioProjectData;
    console.log(fields)
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{fields.title}</h1>
                <p className={styles.subtitle}>{fields.subtitle}</p>
            </div>
            
            {fields.featuredImage && (
                <div className={styles.featuredImageContainer}>
                    <Image 
                        src={`https:${fields.featuredImage.fields.file.url}`}
                        alt={fields.featuredImage.fields.title}
                        fill
                        className={styles.featuredImage}
                    />
                </div>
            )}
            
            <div className={styles.content}>
                {fields.highlights && (
                    <div className={styles.highlights}>
                        <h2>Highlights</h2>
                        
                        {fields.highlights.links && Object.keys(fields.highlights.links).length > 0 && (
                            <div className={styles.linksSection}>
                                <h3>Links</h3>
                                <ul className={styles.linksList}>
                                    {Object.entries(fields.highlights.links).map(([name, url]) => (
                                        <li key={name}>
                                            <a href={url} target="_blank" rel="noopener noreferrer">
                                                {name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {fields.highlights.featured && Object.keys(fields.highlights.featured).length > 0 && (
                            <div className={styles.featuredSection}>
                                <h3>Featured</h3>
                                <ul className={styles.featuredList}>
                                    {Object.entries(fields.highlights.featured).map(([name, content]) => (
                                        <li key={name}>
                                            <strong>{name}:</strong> {content}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                
                {fields.images && fields.images.length > 0 && (
                    <div className={styles.gallery}>
                        <h2>Gallery</h2>
                        <div className={styles.imagesGrid}>
                            {fields.images.map((imageData, index) => (
                                <div key={index} className={styles.featuredImageContainer}>
                                    <Image 
                                        src={`https:${imageData.fields.file.url}`}
                                        alt={imageData.fields.title}
                                        fill
                                        className={styles.featuredImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 