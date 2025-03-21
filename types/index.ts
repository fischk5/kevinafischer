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
        category: {
            fields: {
                name: string
            }
        };
        published: string;
        slug: string;
        title: string;
        subtitle: string;
        content: Document;
    }
}

export interface PortfolioProjectData {
    sys: {
        id: string;
    };
    fields: {
        title: string;
        key: string;
        subtitle: string;
        images: FeaturedImage[];
        featuredImage: FeaturedImage;
        highlights: {
            links: { [key: string]: string };
            featured: { [key: string]: string };
            skills: string[];
        };
        overview: Document;
        outcomes: Document;
        credits: Document;
        productDesign: Document;
    }
}