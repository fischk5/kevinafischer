import { fetchBlogPostBySlug } from "@/services/contentfulApi"
import BlogPost from "@/components/blog/BlogPost"
import { notFound } from "next/navigation"

interface BlogPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function BlogPage({ params }: BlogPageProps) {
    // Await the params Promise first
    const { slug } = await params;
    const { blogPost } = await fetchBlogPostBySlug(slug);
    
    if (!blogPost) {
        notFound();
    }
    
    return (
        <div>
            <BlogPost blogPostData={blogPost} />
        </div>
    );
} 