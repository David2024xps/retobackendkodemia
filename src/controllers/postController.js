const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, image, body } = req.body;
  const userId = req.user.id;

  try {
    const newPost = new Post({ title, image, body, user: userId });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllPosts = async (req, res) => {
  const search = req.query.search || '';
  try {
    const posts = await Post.find({ title: new RegExp(search, 'i') }).populate('user');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, image, body } = req.body;
  const userId = req.user.id;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    post.title = title;
    post.image = image;
    post.body = body;
    post.updated_at = Date.now();

    await post.save();
    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
