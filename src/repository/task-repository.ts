import { Task, ITask } from '@models/task-model';
import CrudRepository from './crud-repository';

/**
 * TaskRepository
 *
 * A specialized repository class for interacting with the `Task` model.
 * Extends the generic `CrudRepository` to inherit common CRUD operations.
 */
class TaskRepository extends CrudRepository<ITask> {
    // Initializes the Task Repository with the Task Model
    constructor() {
        super(Task); // Pass the Task Model to the generic CRUD Repository
    }
}

export default TaskRepository;
