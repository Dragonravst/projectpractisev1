const tagService = require('../services/tagService');

exports.getTags = async (req, res, next) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.getTag = async (req, res, next) => {
  try {
    const tag = await tagService.getTagById(req.params.id);
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const tag = await tagService.createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

exports.updateTag = async (req, res, next) => {
  try {
    await tagService.updateTag(req.params.id, req.body);
    res.json({ message: 'Tag updated' });
  } catch (error) {
    next(error);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    await tagService.deleteTag(req.params.id);
    res.json({ message: 'Tag deleted' });
  } catch (error) {
    next(error);
  }
};