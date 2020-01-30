export interface MarkdownResponse {
    title: string;
    author: string;
    description: string;
    publish?: boolean;
    image: string;
    date: string; // yyyy-mm-dd
    preview?: string;
    content: string;
    iso8601Date?: string;
    basename: string;
    tags: string;
    location?: string;
}

export interface Posts extends MarkdownResponse {
    speaker?: string;
    conference?: string;
}

// tslint:disable-next-line: no-empty-interface
export interface Conferences extends MarkdownResponse { }
