const mongoos = require('mongoose');

const postSchema = mongoos.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  image: { type: String, require: true}
});


module.exports = mongoos.model('Post', postSchema);
