const todoModel = require('../models/todo');

module.exports = {
    getAll: function(req, res, next) {
        let todoList = [];
        todoModel.find({}, function(err, todos){
         if (err){
          next(err);
         } else{
          for (let todo of todos) {
            todoList.push({id: todo._id, content: todo.content, date: todo.date});
          }
          res.status(200).json({status:"success", message: "Todo list found!!!", data:{todos : todoList}});
             
         }
      });
    },
    create: async function(req,res,next) {
        todoModel.create({content: req.body.content, date: req.body.date }, function (err, result) {
            if (err) 
             next(err);
            else
            res.status(200).json({status: "success", message: "Todo added successfully!!!", data: null});
          });
       },

    updateById: function(req, res, next) {
        todoModel.findByIdAndUpdate(req.headers.id,{content:req.body.content}, function(err, todoInfo){
      if(err)
          next(err);
         else {
            if(todoInfo) {
                res.status(200).json({status:"success", message: "Todo updated successfully!!!", data:null});
            }
            else {
                return res.status(400).json({status: "Error", message: "List don't exist!!!", data:null});
            }
         }
        });
       },

       deleteById: function(req, res, next) {
        todoModel.findByIdAndRemove(req.headers.id, function(err, todoInfo){
         if(err)
          next(err);
         else {
            res.status(200).json({status:"success", message: "Todo deleted successfully!!!", data:null});
         }
        });
       },
}