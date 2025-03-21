"use client"

import Image from 'next/image'
import Link from 'next/link'
import styles from './PortfolioProject.module.css'
import { PortfolioProjectData } from '@/types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types'
import { useState } from 'react'
import PortfolioNavigationBar from './PortfolioNavigationBar'

interface PortfolioProjectProps {
    portfolioProjectData: PortfolioProjectData
}

export default function PortfolioProject({ portfolioProjectData }: PortfolioProjectProps) {
    const { fields } = portfolioProjectData;
    const [view, setView] = useState('overview');
    
    const options = {
        renderNode: {
            [INLINES.HYPERLINK]: (node: any) => {
                const { data, content } = node;
                const { uri } = data;
                const text = content[0]?.value || '';
                return `<a href="${uri}" target="_blank" rel="noopener noreferrer">${text}</a>`;
            },
            [BLOCKS.HEADING_2]: (node: any) => {
                const text = node.content[0]?.value || '';
                return `<h2 id="heading-${text.toLowerCase().replace(/\s+/g, '-')}">${text}</h2>`;
            }
        }
    };
    
    const renderRichText = (document: Document | undefined) => {
        if (!document) return '';
        return documentToHtmlString(document, options);
    };
    
    return (
        <div className={styles.container}>
            <Link href="/portfolio" className={styles.backLink}>
                <span className={styles.backArrow}>←</span> Portfolio
            </Link>
            
            <div className={styles.featuredContainer}>
                <div className={styles.textContainer}>
                    <div className={styles.textContainerCentered}>
                        <h1 className={styles.title}>{fields.title}</h1>
                        <p className={styles.subtitle}>{fields.subtitle}</p>
                        {fields.highlights?.links?.website && (
                            <a 
                                href={fields.highlights.links.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.visitButton}
                            >
                                Visit
                            </a>
                        )}
                    </div>
                </div>
                {fields.featuredImage && (
                    <div className={styles.imageContainer}>
                        <Image 
                            src={`https:${fields.featuredImage.fields.file.url}`}
                            alt={fields.featuredImage.fields.title}
                            fill
                            className={styles.featuredImage}
                        />
                    </div>
                )}
            </div>
            
            <PortfolioNavigationBar view={view} setView={setView} />
            
            <div className={styles.content}>
                {view === 'overview' && (
                    <>                        
                        {fields.overview && (
                            <div className={styles.mainContent}>
                                <div 
                                    className={styles.richText}
                                    dangerouslySetInnerHTML={{ __html: renderRichText(fields.overview) }}
                                />
                            </div>
                        )}
                    </>
                )}
                
                {view === 'product' && fields.productDesign && (
                    <div className={styles.mainContent}>
                        <div 
                            className={styles.richText}
                            dangerouslySetInnerHTML={{ __html: renderRichText(fields.productDesign) }}
                        />
                    </div>
                )}
                
                {view === 'outcomes' && fields.outcomes && (
                    <div className={styles.mainContent}>
                        <div 
                            className={styles.richText}
                            dangerouslySetInnerHTML={{ __html: renderRichText(fields.outcomes) }}
                        />
                    </div>
                )}
                
                {view === 'credits' && fields.credits && (
                    <div className={styles.mainContent}>
                        <div 
                            className={styles.richText}
                            dangerouslySetInnerHTML={{ __html: renderRichText(fields.credits) }}
                        />
                    </div>
                )}
                
                {view === 'gallery' && fields.images && fields.images.length > 0 && (
                    <div className={styles.gallery}>
                        <h2>Gallery</h2>
                        <div className={styles.imagesGrid}>
                            {fields.images.map((imageData, index) => (
                                <div key={index} className={styles.galleryImageContainer}>
                                    <Image 
                                        src={`https:${imageData.fields.file.url}`}
                                        alt={imageData.fields.title}
                                        fill
                                        className={styles.galleryImage}
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