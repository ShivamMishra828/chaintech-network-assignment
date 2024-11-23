import { z } from 'zod';

/**
 * Schema for validating task creation requests.
 *
 * Fields:
 * - `title` (required): Must be a non-empty string.
 * - `description` (required): Must be a non-empty string.
 * - `dueDate` (optional): If provided, must be a valid date.
 * - `status` (optional): Must be either 'pending' or 'completed'. Defaults to 'pending'.
 * - `category` (optional): Must be one of ['personal', 'work', 'idea']. Defaults to 'personal'.
 */
export const createTaskSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    dueDate: z.date().optional(),
    status: z.enum(['pending', 'completed']).default('pending').optional(),
    category: z
        .enum(['personal', 'work', 'idea'])
        .default('personal')
        .optional(),
});

/**
 * Schema for validating task detail updates.
 *
 * Fields:
 * - `description` (optional): If provided, must be a non-empty string.
 * - `dueDate` (optional): If provided, must be a valid date. Nullable field.
 * - `category` (optional): Must be one of ['personal', 'work', 'idea'].
 */
export const updateTaskDetailsSchema = z.object({
    description: z
        .string()
        .min(1, { message: 'Description is required' })
        .optional(),
    dueDate: z.date().optional().nullable(),
    category: z.enum(['personal', 'work', 'idea']).optional(),
});

/**
 * Schema for validating task status updates.
 *
 * Fields:
 * - `status` (required): Must be either 'pending' or 'completed'.
 */
export const updateTaskStatusSchema = z.object({
    status: z.enum(['pending', 'completed'], {
        message: 'Invalid status value',
    }),
});
