const { Post } = require('../models');

class PostRepository {
  async findAll() {
    return await Post.findAll({ include: ['user', 'tags'] });
  }

  async findById(id) {
    return await Post.findByPk(id, { include: ['user', 'tags'] });
  }

  async create(data) {
    return await Post.create(data);
  }

  async update(id, data) {
    return await Post.update(data, { where: { id } });
  }

  async delete(id) {
    return await Post.destroy({ where: { id } });
  }

  async addTags(postId, tagIds) {
    const post = await Post.findByPk(postId);
    return await post.addTags(tagIds);
  }
}

module.exports = new PostRepository();