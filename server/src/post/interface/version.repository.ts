import { PostVersion } from '../post.model';

export type VersionRepository = {
  create(data: {
    content: string;
    postId: number;
    version?: number;
  }): Promise<PostVersion>;
  findByPostIdAndVersion(postId_version: {
    postId: number;
    version: number;
  }): Promise<PostVersion | null>;
  getLastVersion(postId: number): Promise<PostVersion | null>;
  findAll(): Promise<PostVersion[]>;
  findAllByPostId(postId: number): Promise<PostVersion[]>;
  update(postId: number, version: number, data: any): Promise<PostVersion>;
};
