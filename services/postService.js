const postRepository = require('../repositories/postRepository');

class PostService {
  async getAllPosts() {
    return await postRepository.findAll();
  }

  async getPostById(id) {
    return await postRepository.findById(id);
  }

  async createPost(data) {
    return await postRepository.create(data);
  }

  async updatePost(id, data) {
    return await postRepository.update(id, data);
  }

  async deletePost(id) {
    return await postRepository.delete(id);
  }

  async addTagsToPost(postId, tagIds) {
    return await postRepository.addTags(postId, tagIds);
  }
}

module.exports = new PostService();