const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose")
const Post = require('./models/post');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');

// app.use((req, res, next) => {
//   next();
// });
mongoose
  .connect(
    "mongodb+srv://rajnish:nzgMbAyNf4Z9gfLc@cluster0-grhlz.mongodb.net/node-angular?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("conected to mongodb");
  })
  .catch((e) => {
    console.log(e, "conection failed");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});
app.use("/image", express.static(__dirname+ '/image'));
app.use("/api/posts",postRoute);
app.use("/api/user", userRoute);
// app.delete("/api/posts:id", (req, res, next) => {
//   const id = req.param("id");
//   console.log(id);
//   Post.remove(
//     {
//       _id: id
//     },
//     err => {
//       console.log(err);
//     }
//   );
//   res.status(200).json({
//     message: "Post Deleted!"
//   });
// });

module.exports = app;
