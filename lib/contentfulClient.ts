import { createClient } from 'contentful'

const contentfulClient = createClient({
    space: "z0dk1skmjn0t",
    accessToken: process.env.CONTENTFUL_API_KEY || ""
})

export default contentfulClient;