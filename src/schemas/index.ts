import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    dueDate: z.date().optional(),
    status: z.enum(['pending', 'completed']).default('pending'),
    category: z.enum(['personal', 'work', 'idea']).default('personal'),
});

export const updateTaskDetailsSchema = z.object({
    description: z
        .string()
        .min(1, { message: 'Description is required' })
        .optional(),
    dueDate: z.date().optional().nullable(),
    category: z.enum(['personal', 'work', 'idea']).optional(),
});

export const updateTaskStatusSchema = z.object({
    status: z.enum(['pending', 'completed'], {
        message: 'Invalid status value',
    }),
});
