import Post from "../models/Post.js";

 
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

 
    if (!content && !image) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    const post = await Post.create({
      userId: req.user,
      content,
      image
    });

    
    const populatedPost = await Post.findById(post._id)
      .populate("userId", "username");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username")
      .populate("comments.userId", "username")
      .populate("likes", "username")  
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === req.user
    );

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user
      );
    } else {
      // Like
      post.likes.push(req.user);
    }

    await post.save();

    
    const updatedPost = await Post.findById(post._id)
      .populate("userId", "username")
      .populate("comments.userId", "username")
      .populate("likes", "username");

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      userId: req.user,
      text
    });

    await post.save();

     
    const updatedPost = await Post.findById(post._id)
      .populate("userId", "username")
      .populate("comments.userId", "username")
      .populate("likes", "username");

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};