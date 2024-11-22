import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    category: string;
}

const taskSchema: Schema = new mongoose.Schema(
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

export const Task = mongoose.model<ITask>('Task', taskSchema);
