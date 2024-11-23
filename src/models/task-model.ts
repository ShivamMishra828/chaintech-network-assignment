import mongoose, { Document, Schema } from 'mongoose';

// Interface representing a Task document in MongoDB
export interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    category: string;
}

// Mongoose Schema defining the structure of the task document
const taskSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, // Task title is mandatory
            unique: true, // Task title should be unique
        },
        description: {
            type: String,
            required: true, // Task description is mandatory
        },
        status: {
            type: String,
            enum: ['pending', 'completed'], // Allowed status
            default: 'pending', // Default status is `pending`
        },
        dueDate: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default is 7 days from now
        },
        category: {
            type: String,
            enum: ['personal', 'work', 'idea'], // Allowed Categories
            default: 'personal', // Default category is `personal`
        },
    },
    { timestamps: true }, // Automatically manage `createdAt` and `updatedAt` fields
);

// Mongoose Model for the task collection
export const Task = mongoose.model<ITask>('Task', taskSchema);
