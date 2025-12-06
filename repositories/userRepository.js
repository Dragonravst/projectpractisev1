const { User } = require('../models');

class UserRepository {
  async findAll() {
    return await User.findAll();
  }

  async findById(id) {
    return await User.findByPk(id, { include: 'posts' });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    return await User.update(data, { where: { id } });
  }

  async delete(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();