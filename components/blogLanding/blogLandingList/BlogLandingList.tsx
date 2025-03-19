import styles from "./BlogLandingList.module.css"
import { BlogPostData } from "@/types"
import { getFormattedBlogPostPublishDate } from "@/lib/dateManager"

interface BlogLandingListProps {
    blogPosts: BlogPostData[]
}

export default function BlogLandingList({ blogPosts } : BlogLandingListProps ) {
    return (
        <div className={styles.container}>
            <h3>everything</h3>
            <div className={styles.blogPosts}>
                {blogPosts.map((blogPost: BlogPostData) => (
                    <div key={blogPost.sys.id} className={styles.blogPostOuter}>
                        <div className={styles.blogPostInner}>
                            <div className={styles.published}>{getFormattedBlogPostPublishDate(blogPost.fields.published)}</div>
                            <h4>{blogPost.fields.title}</h4>
                            <div className={styles.category}>#{blogPost.fields.category.fields.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}