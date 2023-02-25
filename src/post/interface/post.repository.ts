import { Post } from '../post.model';

export type PostRepository = {
  createPost(post: any): Promise<Post>;
  getPost(id: number): Promise<Post | null>;
  getAllPosts(): Promise<Post[]>;
  updatePost(id: number, post: any): Promise<Post>;
  deletePost(id: number): Promise<any>;
};
