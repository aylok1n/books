export interface FetchParams {
    url: string,
    method?: 'GET' | 'POST',
    body?: any,
    headers?: any
}

export type viewMode = 'cards' | 'table'


export interface Book {
    id: string,
    title?: string,
    subtitle?: string,
    authors?: string[],
    description?: string,
    publishedDate?: Date,
    imageLinks?: {
        thumbnail: string,
        smallThumbnail: string
    }
}
