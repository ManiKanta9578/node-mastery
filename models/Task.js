import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
    dueDate: { type: Date }
});

const TaskModel = mongoose.model('Task', TaskSchema); // 'Task' will create the collection 'tasks'
export default TaskModel;
