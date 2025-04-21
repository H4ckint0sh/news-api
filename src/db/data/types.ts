export interface Article {
  article_id?: number;
  article_img_url: string;
  author: string;
  body: string;
  comment_count?: number;
  created_at: Date;
  title: string;
  topic: string;
  votes: number;
}

export interface Comment {
  article_id: number;
  author: string;
  belongs_to?: string;
  body: string;
  comment_id?: number;
  created_at: Date;
  votes: number;
}

export interface Role {
  name: string;
  role_id?: number;
  status: boolean;
}

export interface Topic {
  description: string;
  slug: string;
}

export interface User {
  avatar_url: string;
  created_at?: Date;
  name: string;
  password: string;
  role_id: number;
  updated_at?: number;
  user_id?: number;
  user_name: string;
}
