import { z } from 'zod';

export const createTodoSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    dueDate: z.date().optional(),
    category: z.enum(['personal', 'work', 'idea']).default('personal'),
});
