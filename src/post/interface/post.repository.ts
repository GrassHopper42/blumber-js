import { Post } from '../post.model';

export type PostRepository = {
  create(post: any): Promise<Post>;
  find(id: number): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(id: number, post: any): Promise<Post>;
  delete(id: number): Promise<any>;
};
