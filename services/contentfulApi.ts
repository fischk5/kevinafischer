import contentfulClient from "@/lib/contentfulClient"
import { BlogPostData, PortfolioProjectData } from "@/types"

export async function fetchBlogPosts() {
    try {
        const entryFetch = await contentfulClient.getEntries({
            content_type: "blogPost",
            select: [
                'fields.title',
                'fields.subtitle',
                'fields.slug',
                'fields.category',
                'fields.featuredImage',
                'fields.published',
                'sys.id'
              ],
              order: ["-fields.published"]
        })
        const entries = entryFetch.items ? entryFetch.items : []
        return { entries }
    } catch (error) {
        return { foo: "bar"}
    }
}

export async function fetchBlogPostBySlug(slug: string): Promise<{ blogPost: BlogPostData | null }> {
  try {
    const entryFetch = await contentfulClient.getEntries({
      content_type: "blogPost",
      'fields.slug': slug,
      include: 2
    });
    
    return { 
      blogPost: entryFetch.items[0] ? entryFetch.items[0] as any as BlogPostData : null 
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { blogPost: null };
  }
}

export async function fetchPortfolioProjectByKey(key: string): Promise<{ portfolioProjectData: PortfolioProjectData | null }> {
  try {
    const entryFetch = await contentfulClient.getEntries({
      content_type: "portfolioProject",
      'fields.key': key,
      include: 2
    });
    
    return { 
      portfolioProjectData: entryFetch.items[0] ? entryFetch.items[0] as any as PortfolioProjectData : null 
    };
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    return { portfolioProjectData: null };
  }
}