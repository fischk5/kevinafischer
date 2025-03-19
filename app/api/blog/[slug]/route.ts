import { NextRequest, NextResponse } from 'next/server'
import { fetchBlogPostBySlug } from '@/services/contentfulApi'

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug
    const data = await fetchBlogPostBySlug(slug)
    
    if (!data.blogPost) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    return NextResponse.json(data)
} 