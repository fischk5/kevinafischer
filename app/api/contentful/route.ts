import { NextResponse } from 'next/server'
import { fetchBlogPosts } from '@/services/contentfulApi'

export async function GET() {
    const data = await fetchBlogPosts()
    return NextResponse.json(data)
}