import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/instagram-clone/instagram";

// Middleware
app.use(cors());
app.use(express.json());

let db;
let usersCollection,
  postsCollection,
  commentsCollection,
  storiesCollection,
  profileCollection;

// MongoDB Connection
const connectDB = async () => {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db("instagram");

    usersCollection = db.collection("users");
    postsCollection = db.collection("posts");
    commentsCollection = db.collection("comments");
    storiesCollection = db.collection("stories");
    profileCollection = db.collection("profile");

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// ==================== USERS ENDPOINTS ====================

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await usersCollection.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== POSTS ENDPOINTS ====================

// GET all posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await postsCollection.find({}).toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET posts by user ID
app.get("/api/posts/user/:userId", async (req, res) => {
  try {
    const posts = await postsCollection
      .find({ userId: req.params.userId })
      .toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single post
app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await postsCollection.findOne({ id: req.params.id });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new post
app.post("/api/posts", async (req, res) => {
  try {
    const newPost = {
      id: `p${Date.now()}`,
      ...req.body,
      timestamp: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0,
    };
    const result = await postsCollection.insertOne(newPost);
    res.status(201).json({ _id: result.insertedId, ...newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE post likes
app.patch("/api/posts/:id/like", async (req, res) => {
  try {
    const { isLiked } = req.body;
    const update = isLiked
      ? { $inc: { likesCount: 1 } }
      : { $inc: { likesCount: -1 } };

    const result = await postsCollection.findOneAndUpdate(
      { id: req.params.id },
      update,
      { returnDocument: "after" },
    );

    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== COMMENTS ENDPOINTS ====================

// GET all comments
app.get("/api/comments", async (req, res) => {
  try {
    const comments = await commentsCollection.find({}).toArray();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET comments by post ID
app.get("/api/comments/post/:postId", async (req, res) => {
  try {
    const comments = await commentsCollection
      .find({ postId: req.params.postId })
      .toArray();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new comment
app.post("/api/comments", async (req, res) => {
  try {
    const newComment = {
      id: `c${Date.now()}`,
      ...req.body,
      timestamp: new Date().toISOString(),
      likesCount: 0,
    };
    const result = await commentsCollection.insertOne(newComment);
    res.status(201).json({ _id: result.insertedId, ...newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STORIES ENDPOINTS ====================

// GET all stories
app.get("/api/stories", async (req, res) => {
  try {
    const stories = await storiesCollection.find({}).toArray();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET stories by user ID
app.get("/api/stories/user/:userId", async (req, res) => {
  try {
    const stories = await storiesCollection
      .find({ id: req.params.userId })
      .toArray();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PROFILE ENDPOINTS ====================

// GET all profiles
app.get("/api/profile", async (req, res) => {
  try {
    const profiles = await profileCollection.find({}).toArray();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single profile
app.get("/api/profile/:id", async (req, res) => {
  try {
    const profile = await profileCollection.findOne({ id: req.params.id });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE profile
app.patch("/api/profile/:id", async (req, res) => {
  try {
    const result = await profileCollection.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { returnDocument: "after" },
    );
    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== HEALTH CHECK ====================

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend API is running ✅" });
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
