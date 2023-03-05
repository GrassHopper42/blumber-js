import { Post } from '../post.model';

export type PostRepository = {
  create(data: { authorId: number; title: string }): Promise<Post>;
  findById(id: number): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(
    id: number,
    post: Partial<Omit<Post, 'authorId' | 'id'>>,
  ): Promise<Post>;
  delete(id: number): Promise<any>;
};
