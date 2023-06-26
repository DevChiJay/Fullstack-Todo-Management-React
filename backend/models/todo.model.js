const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    text: String,
  },
  { collection: 'todos' }
);
TodoSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
