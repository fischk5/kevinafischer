import { Document } from '@contentful/rich-text-types';

export interface FeaturedImage {
    sys: {
        id: string
    };
    fields: {
        title: string;
        description: string;
        file: {
            url: string;
        }
    }
}

export interface BlogPostData {
    sys: {
        id: string
    };
    fields: {
        featuredImage: FeaturedImage;
        published: string;
        slug: string;
        title: string;
        content: Document
    }
}