import { Post } from '../post.model';

export type PostService = {
  createPost(post: any): Promise<Post>;
  getPost(id: number): Promise<Post | null>;
  getPostList(): Promise<Post[]>;
  updatePost(id: number, post: any): Promise<Post>;
  deletePost(id: number): Promise<void>;
};
