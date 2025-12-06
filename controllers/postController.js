const postService = require('../services/postService');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    await postService.updatePost(req.params.id, req.body);
    res.json({ message: 'Post updated' });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};

exports.addTags = async (req, res, next) => {
  try {
    const { tagIds } = req.body;
    await postService.addTagsToPost(req.params.id, tagIds);
    res.json({ message: 'Tags added to post' });
  } catch (error) {
    next(error);
  }
};