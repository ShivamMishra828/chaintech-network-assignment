import { Task, ITask } from '@models/task-model';
import CrudRepository from './crud-repository';

class TaskRepository extends CrudRepository<ITask> {
    constructor() {
        super(Task);
    }
}

export default TaskRepository;
