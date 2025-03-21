"use client"

import styles from "./BlogLanding.module.css"
import { fetcher } from "@/lib/fetcher"
import BlogLandingList from "./blogLandingList/BlogLandingList"
import useSWR from "swr"
import BasicLoader from "../loaders/BasicLoader"
import FeaturedBlogPreview from "./blogLandingPreviews/FeaturedBlogPreview"
import { BlogPostData } from "@/types"

interface ContentfulResponse {
    entries: BlogPostData[]
}

export default function BlogLanding() {
    const { data, error, isLoading } = useSWR<ContentfulResponse>('/api/contentful', fetcher)
    if (isLoading) return <div className={styles.temporaryState}><BasicLoader/></div>
    if (error || !data) return <div className={styles.temporaryState}>Nothing to see here.</div>
    return (
        <div className={styles.container}>
            <FeaturedBlogPreview blogPostData={data.entries[0]} />
            <BlogLandingList blogPosts={data.entries} />
        </div>
    )
}