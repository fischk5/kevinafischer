"use client"

import Image from 'next/image'
import Link from 'next/link'
import styles from './PortfolioProject.module.css'
import { PortfolioProjectData } from '@/types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types'
import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { IoChevronForward, IoChevronBack } from 'react-icons/io5'
import PortfolioNavigationBar from './PortfolioNavigationBar'

interface PortfolioProjectProps {
    portfolioProjectData: PortfolioProjectData
}

export default function PortfolioProject({ portfolioProjectData }: PortfolioProjectProps) {
    const { fields } = portfolioProjectData;
    const [view, setView] = useState('overview');
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!showGalleryModal) return;
            
            if (event.key === 'Escape') {
                setShowGalleryModal(false);
            } else if (event.key === 'ArrowRight' && fields.images && fields.images.length > 0) {
                setCurrentImageIndex((prevIndex) => 
                    prevIndex === fields.images.length - 1 ? 0 : prevIndex + 1
                );
            } else if (event.key === 'ArrowLeft' && fields.images && fields.images.length > 0) {
                setCurrentImageIndex((prevIndex) => 
                    prevIndex === 0 ? fields.images.length - 1 : prevIndex - 1
                );
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        
        // Prevent body scrolling when modal is open
        if (showGalleryModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [showGalleryModal, fields.images, currentImageIndex]);
    
    const openGallery = (index: number) => {
        setCurrentImageIndex(index);
        setShowGalleryModal(true);
    };
    
    const closeGallery = () => {
        setShowGalleryModal(false);
    };
    
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (fields.images && fields.images.length > 0) {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === fields.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };
    
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (fields.images && fields.images.length > 0) {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === 0 ? fields.images.length - 1 : prevIndex - 1
            );
        }
    };
    
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
            },
            ['embedded-asset-block']: (node: any) => {
                const { data } = node;
                if (!data || !data.target || !data.target.fields) {
                    return '';
                }
                
                const { title, description, file } = data.target.fields;
                if (!file || !file.url) {
                    return '';
                }
                
                const imageUrl = `https:${file.url}`;
                const alt = description || title || 'Embedded image';
                
                return `
                    <div class="${styles.embeddedAsset}">
                        <a href="${imageUrl}" target="_blank" rel="noopener noreferrer">
                            <img 
                                src="${imageUrl}" 
                                alt="${alt}" 
                                class="${styles.embeddedImage}"
                            />
                        </a>
                        ${description ? `<p class="${styles.imageCaption}">${description}</p>` : ''}
                    </div>
                `;
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
                                <div 
                                    key={index} 
                                    className={styles.galleryImageContainer}
                                    onClick={() => openGallery(index)}
                                >
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
                
                {/* Image Gallery Modal */}
                {showGalleryModal && fields.images && fields.images.length > 0 && (
                    <div className={styles.galleryModal} onClick={closeGallery}>
                        <div className={styles.galleryModalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeButton} onClick={closeGallery}>
                                <IoClose size={24} />
                            </button>
                            
                            <div className={styles.galleryImageNav}>
                                <button className={styles.navButton} onClick={prevImage}>
                                    <IoChevronBack size={24} />
                                </button>
                                
                                <div className={styles.galleryModalImageContainer}>
                                    <h3 className={styles.galleryModalTitle}>
                                        {fields.images[currentImageIndex].fields.title}
                                    </h3>
                                    <img 
                                        src={`https:${fields.images[currentImageIndex].fields.file.url}`}
                                        alt={fields.images[currentImageIndex].fields.title}
                                        className={styles.galleryModalImage}
                                    />
                                    {fields.images[currentImageIndex].fields.description && (
                                        <p className={styles.galleryModalDescription}>
                                            {fields.images[currentImageIndex].fields.description}
                                        </p>
                                    )}
                                </div>
                                
                                <button className={styles.navButton} onClick={nextImage}>
                                    <IoChevronForward size={24} />
                                </button>
                            </div>
                            
                            <div className={styles.galleryCounter}>
                                {currentImageIndex + 1} / {fields.images.length}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 