const { Tag } = require('../models');

class TagRepository {
  async findAll() {
    return await Tag.findAll({ include: 'posts' });
  }

  async findById(id) {
    return await Tag.findByPk(id, { include: 'posts' });
  }

  async create(data) {
    return await Tag.create(data);
  }

  async update(id, data) {
    return await Tag.update(data, { where: { id } });
  }

  async delete(id) {
    return await Tag.destroy({ where: { id } });
  }
}

module.exports = new TagRepository();