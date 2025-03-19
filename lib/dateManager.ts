import { format } from 'date-fns'

export function getFormattedBlogPostPublishDate(dateString: string) {
    return format(new Date(dateString), "MMMM d, yyyy")
}