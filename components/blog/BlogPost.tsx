import { BlogPostData } from "@/types"
import Image from "next/image"
import styles from "./BlogPost.module.css"
import { getFormattedBlogPostPublishDate } from "@/lib/dateManager"
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

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

    const renderedContent = documentToHtmlString(content)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.metadata}>
                    <span className={styles.date}>{getFormattedBlogPostPublishDate(published)}</span>
                    <span className={styles.category}>#{category.fields.name}</span>
                </div>
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
    )
} 