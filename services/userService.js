const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    return await userRepository.findById(id);
  }

  async createUser(data) {
    data.password = await bcrypt.hash(data.password, 10);
    return await userRepository.create(data);
  }

  async updateUser(id, data) {
    return await userRepository.update(id, data);
  }

  async deleteUser(id) {
    return await userRepository.delete(id);
  }

  async login(email, password) {
    const user = await userRepository.findAll().then(users => users.find(u => u.email === email));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  }
}

module.exports = new UserService();