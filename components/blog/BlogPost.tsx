"use client"

import { BlogPostData } from "@/types"
import Image from "next/image"
import Link from "next/link"
import styles from "./BlogPost.module.css"
import { getFormattedBlogPostPublishDate } from "@/lib/dateManager"
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { useEffect, useState } from "react"
import TableOfContents, { TocItem } from "./TableOfContents/TableOfContents"

interface BlogPostProps {
    blogPostData: BlogPostData
}

export default function BlogPost({ blogPostData }: BlogPostProps) {
    const { 
        title, 
        subtitle, 
        published, 
        category, 
        featuredImage, 
        content 
    } = blogPostData.fields

    const [tocItems, setTocItems] = useState<TocItem[]>([])
    
    // Configure options for rich text rendering - making links open in new tabs
    const options = {
        renderNode: {
            [INLINES.HYPERLINK]: (node: any) => {
                const { data, content } = node;
                const { uri } = data;
                const text = content[0]?.value || '';
                return `<a href="${uri}" target="_blank" rel="noopener noreferrer">${text}</a>`;
            }
        }
    };
    
    const renderedContent = documentToHtmlString(content, options)

    useEffect(() => {
        // Extract h2 elements and generate IDs for them after content is rendered
        const contentElement = document.querySelector(`.${styles.content}`)
        if (contentElement) {
            const h2Elements = contentElement.querySelectorAll('h2')
            const items: TocItem[] = []
            
            h2Elements.forEach((h2, index) => {
                const text = h2.textContent || ''
                const id = `heading-${index}`
                h2.id = id
                items.push({ id, text })
            })
            
            setTocItems(items)
        }
    }, [renderedContent])

    return (
        <div className={styles.container}>            
            <div className={styles.main}>
                <Link href="/" className={styles.backLink}>
                    <span className={styles.backArrow}>←</span> Blog
                </Link>
                
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
                
                <div className={styles.featuredImage}>
                    <Image 
                        src={`https:${featuredImage.fields.file.url}`} 
                        alt={featuredImage.fields.description || title}
                        width={800}
                        height={400}
                        priority
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                
                <div 
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: renderedContent }}
                />
            </div>
            <div className={styles.sidebar}>
                <div className={styles.sidebarSection}>
                    <h6 className={styles.sectionHeading}>AUTHOR</h6>
                    <div className={styles.authorInfo}>
                        <div className={styles.authorImage}>
                            <Image 
                                src="/kevinfischerauthor.jpeg" 
                                alt="Kevin Fischer"
                                width={40}
                                height={40}
                            />
                        </div>
                        <h4 className={styles.authorName}>Kevin Fischer</h4>
                    </div>
                </div>
                
                <div className={styles.sidebarSection}>
                    <h6 className={styles.sectionHeading}>CATEGORY</h6>
                    <div className={styles.categoryContainer}>
                        <span className={styles.category}>#{category.fields.name}</span>
                    </div>
                </div>
                
                <div className={styles.sidebarSection}>
                    <h6 className={styles.sectionHeading}>ORIGINALLY PUBLISHED</h6>
                    <div className={styles.dateContainer}>
                        <span className={styles.date}>{getFormattedBlogPostPublishDate(published)}</span>
                    </div>
                </div>
                
                {tocItems.length > 0 && (
                    <div className={styles.sidebarSection}>
                        <h6 className={styles.sectionHeading}>CONTENTS</h6>
                        <TableOfContents items={tocItems} />
                    </div>
                )}
            </div>
        </div>
    )
} 