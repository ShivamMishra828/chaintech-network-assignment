import { Model, Document } from 'mongoose';

class CrudRepository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }
}

export default CrudRepository;
