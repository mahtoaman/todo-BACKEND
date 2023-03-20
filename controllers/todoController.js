const todoModel = require("../models/todoModel");

module.exports.getToDo = async (req, res) => {
  const token = req.headers.decodedToken;

  const toDo = await todoModel.find({
    user_id: token.user_id,
  });
  res.send(toDo);
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  const token = req.headers.decodedToken;
  const data = { text: text, user_name: token.name, user_id: token.user_id };
  todoModel.create(data).then((data) => {
    console.log("added successfully");
    res.send(data);
  });
};


module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  todoModel
    .findByIdAndDelete(_id)
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => console.log(err));
};
