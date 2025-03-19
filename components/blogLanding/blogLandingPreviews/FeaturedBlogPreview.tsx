import styles from "./FeaturedBlogPreview.module.css"
import { BlogPostData } from "@/types"
import Image from "next/image"
import { getFormattedBlogPostPublishDate } from "@/lib/dateManager"

interface FeaturedBlogPreviewProps {
    blogPostData: BlogPostData
}

export default function FeaturedBlogPreview({ blogPostData } : FeaturedBlogPreviewProps ) {
    const title = blogPostData.fields.title
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.textContainerCentered}>
                    <p>{getFormattedBlogPostPublishDate(blogPostData.fields.published)}</p>
                    <h3>{title}</h3>
                    <p>{blogPostData.fields.title}</p>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <Image src={`https:${blogPostData.fields.featuredImage.fields.file.url}`} alt={blogPostData.fields.featuredImage.fields.description} height={300} width={600} style={{width: "100%", height: "auto"}} />
            </div>
            
        </div>
    )
}