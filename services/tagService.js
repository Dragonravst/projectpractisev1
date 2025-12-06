const tagRepository = require('../repositories/tagRepository');

class TagService {
  async getAllTags() {
    return await tagRepository.findAll();
  }

  async getTagById(id) {
    return await tagRepository.findById(id);
  }

  async createTag(data) {
    return await tagRepository.create(data);
  }

  async updateTag(id, data) {
    return await tagRepository.update(id, data);
  }

  async deleteTag(id) {
    return await tagRepository.delete(id);
  }
}

module.exports = new TagService();