const catchError = require('../utils/catchError');
const ToDo = require('../models/ToDo');

const getAll = catchError(async(req, res) => {
    const toDos = await ToDo.findAll();
    return res.json(toDos);
});

// /todos
const create = catchError(async(req, res) => {
    const { title, description, isCompleted } = req.body;
    const toDo = await ToDo.create({
        title: title,
        description: description,
        isCompleted: isCompleted,
    });
    return res.status(201).json(toDo);
})

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    const toDo = await ToDo.update({
        title: title,
        description: description,
        isCompleted: isCompleted,
    }, { where: { id: id }, returning: true });
    return res.json(toDo);
})

module.exports = {
    getAll,
    create,
    update,
}
