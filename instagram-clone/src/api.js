const API_BASE_URL = "http://localhost:5000/api";

// ==================== USERS ====================

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const getUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

// ==================== POSTS ====================

export const getPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const getPostsByUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/posts/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const getPost = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
  if (!response.ok) throw new Error("Failed to fetch post");
  return response.json();
};

export const createPost = async (postData) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
};

export const likePost = async (postId, isLiked) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isLiked }),
  });
  if (!response.ok) throw new Error("Failed to like post");
  return response.json();
};

// ==================== COMMENTS ====================

export const getComments = async () => {
  const response = await fetch(`${API_BASE_URL}/comments`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};

export const getCommentsByPost = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};

export const createComment = async (commentData) => {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) throw new Error("Failed to create comment");
  return response.json();
};

// ==================== STORIES ====================

export const getStories = async () => {
  const response = await fetch(`${API_BASE_URL}/stories`);
  if (!response.ok) throw new Error("Failed to fetch stories");
  return response.json();
};

export const getStoriesByUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/stories/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch stories");
  return response.json();
};

// ==================== PROFILE ====================

export const getProfiles = async () => {
  const response = await fetch(`${API_BASE_URL}/profile`);
  if (!response.ok) throw new Error("Failed to fetch profiles");
  return response.json();
};

export const getProfile = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
};

export const updateProfile = async (userId, profileData) => {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};

// ==================== HEALTH CHECK ====================

export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) throw new Error("API is down");
  return response.json();
};
