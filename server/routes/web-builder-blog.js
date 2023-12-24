const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl, singleUploadToServerControl } = require("../middleware/upload");

const {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getPreviewBlogPage,
  getPublishBlogPage
} = require("../controllers/webBuilderBlog");
//web builder
router.post("/create", isAuthenticated, singleUploadControl, createBlog);
router.get("/blogs/:id", isAuthenticated, getBlogs);
router.get("/preview", isAuthenticated, getPreviewBlogPage);
router.get("/publish", getPublishBlogPage);
router.delete("/delete/:id", isAuthenticated, deleteBlog);
router.put("/update/:id", isAuthenticated, singleUploadControl, updateBlog);

module.exports = router;
