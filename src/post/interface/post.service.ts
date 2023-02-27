import { PostVersion } from '@prisma/client';
import { Post } from '../post.model';

export type PostService = {
  createPost(post: {
    title: string;
    content: string;
    authorId: number;
  }): Promise<void>;
  updatePost(
    id: number,
    data: {
      title?: string;
      content?: string;
    },
  ): Promise<void>;
  deletePost(id: number): Promise<void>;
  getPost(id: number): Promise<(Post & PostVersion) | null>;
  getPostList(): Promise<Post[]>;
  getAllVersions(postId: number): Promise<PostVersion[]>;
  getVersion(postId: number, version: number): Promise<PostVersion | null>;
};
