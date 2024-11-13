
export interface Post {
    id: string;
    title: string;
    body: string;
  }
  
  export interface Comment {
    id: string;
    comment: string;
  }
  
  export interface State {
    token: string;
    posts: Post[];
    comments: Record<string, Comment[]>;
  }
  export interface PostsResponse {
  message: string;
  post: {
    current_page: number;
    data: Post[];
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}