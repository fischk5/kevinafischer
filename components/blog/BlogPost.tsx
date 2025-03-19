"use client"

import { BlogPostData } from "@/types"
import Image from "next/image"
import Link from "next/link"
import styles from "./BlogPost.module.css"
import { getFormattedBlogPostPublishDate } from "@/lib/dateManager"
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types'
import { useEffect, useState, useCallback, useRef } from "react"
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
    const [activeHeading, setActiveHeading] = useState<string>('')
    const contentRef = useRef<HTMLDivElement>(null)
    
    // Pre-process content to identify headings and build TOC items
    useEffect(() => {
        // Find all headings from the content
        const headings: TocItem[] = []
        
        // Deep traversal function to find heading nodes
        const extractHeadings = (node: any) => {
            if (node.nodeType === 'heading-2' && node.content && node.content[0]?.value) {
                const text = node.content[0].value
                const id = `heading-${headings.length}`
                headings.push({ id, text })
            }
            
            if (node.content) {
                node.content.forEach((child: any) => extractHeadings(child))
            }
        }
        
        if (content) {
            content.content.forEach(node => extractHeadings(node))
        }
        
        setTocItems(headings)
    }, [content])
    
    // Configure options for rich text rendering
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
                const index = tocItems.findIndex(item => item.text === text);
                const id = index >= 0 ? tocItems[index].id : `heading-fallback-${Math.random().toString(36).substr(2, 9)}`;
                return `<h2 id="${id}">${text}</h2>`;
            }
        }
    };
    
    // Generate the rendered HTML only after tocItems is ready
    const renderedContent = documentToHtmlString(content, options)

    // Function to scroll to a heading
    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id)
        if (element) {
            // Add a small delay to ensure the DOM is ready
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' })
                setActiveHeading(id)
            }, 50)
        }
    }, [])

    // Update active heading on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (tocItems.length === 0) return

            const scrollPosition = window.scrollY + 150 // Offset for better UX
            
            // Check headings from bottom to top to find the one currently in view
            for (let i = tocItems.length - 1; i >= 0; i--) {
                const heading = document.getElementById(tocItems[i].id)
                if (heading && heading.offsetTop <= scrollPosition) {
                    setActiveHeading(tocItems[i].id)
                    break
                }
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [tocItems])

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
                    ref={contentRef}
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
                        <TableOfContents 
                            items={tocItems} 
                            activeId={activeHeading}
                            onItemClick={scrollToHeading}
                        />
                    </div>
                )}
            </div>
        </div>
    )
} 