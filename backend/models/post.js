const mongoos = require('mongoose');

const postSchema = mongoos.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  image: { type: String, require: true},
  creator: { type: mongoos.Schema.Types.ObjectId, ref: "User", require: true}
});


module.exports = mongoos.model('Post', postSchema);
