const express = require("express");
const multer = require("multer");
const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null;
    }
    cb(error, "backend/image");
  },
  filename: function(req, file, cb) {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + '.' + ext);
  }
});

var upload = multer({ storage: storage });

router.post("",checkAuth, multer({storage: storage}).single("image") ,(req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: url +"/image/"+ req.file.filename,
    creator: req.userData.userId
  });

  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added data success",
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  });
});
router.get("", (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchPost;
  if(pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage -1))
    .limit(pageSize);
  }

  postQuery
  .then( document => {
    fetchPost = document;
    return Post.count();
  })
  .then(count => {
    res.status(200).json({
      message: "Post fetched successesfully",
      posts: fetchPost,
      length: count
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.param("id")).then(post => {
    if (post) {
      res.status(200).json({
        message: "Post fetched successesfully",
        post: post
      });
    } else {
      res.status(404).json({
        message: "Data not found"
      });
    }
  });
});
// put request

router.put("/:id",checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
const url = req.protocol + "://" + req.get("host");
let fileName = '';
if (req.file) {
  fileName = url + "/image/" + req.file.filename;
} else {
   fileName = req.body.image;
}
  Post.updateOne(
    { _id: req.param("id"), creator: req.userData.userId },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        image: fileName,
        creator: req.userData.userId
      }
    }
  ).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Post updated successesfully"
      });
    } else {
      res.status(401).json({
        message: "Auth Failed"
      });
    } 
  });
});
router.delete("/:id",checkAuth, (req, res, next) => {
  const id = req.param("id");
  console.log(id);
  Post.deleteOne({ _id: req.param("id"), creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Post deleted successesfully"
      });
    } else {
      res.status(401).json({
        message: "Auth Failed"
      });
    } 
  });

});
module.exports = router;
