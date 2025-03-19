import contentfulClient from "@/lib/contentfulClient"

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