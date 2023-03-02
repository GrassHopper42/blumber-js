import { PostService, PostServiceDependencies } from './interface/post.service';

export const postService = ({
  postRepository,
  versionRepository,
}: PostServiceDependencies): PostService => {
  return {
    async createPost({ title, content, authorId }) {
      const post = await postRepository.create({ title, authorId });
      await versionRepository.create({
        postId: post.id,
        content,
      });
    },

    async getPost(postId: number) {
      const post = await postRepository.findById(postId);
      if (!post) return null;
      const version = await versionRepository.getLastVersion(postId);
      if (!version) throw new Error('version not found');
      return {
        ...post,
        ...version,
      };
    },

    async getPostList() {
      return await postRepository.findAll();
    },

    async getAllVersions(postId: number) {
      return await versionRepository.findAllByPostId(postId);
    },

    async getVersion(postId: number, version: number) {
      return await versionRepository.findByPostIdAndVersion({
        postId,
        version,
      });
    },

    async updatePost(id: number, post: { title?: string; content?: string }) {
      if (post.title) {
        await postRepository.update(id, post);
      }
      if (post.content) {
        const lastVersion = await versionRepository.getLastVersion(id);
        if (!lastVersion) throw new Error('version not found');
        await versionRepository.create({
          postId: id,
          content: post.content,
          version: lastVersion.version + 1,
        });
      }
    },

    async deletePost(id: number) {
      return await postRepository.delete(id);
    },
  };
};
