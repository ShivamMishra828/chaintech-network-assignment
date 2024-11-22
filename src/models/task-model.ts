import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending',
        },
        dueDate: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        category: {
            type: String,
            enum: ['personal', 'work', 'idea'],
            default: 'personal',
        },
    },
    { timestamps: true },
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
