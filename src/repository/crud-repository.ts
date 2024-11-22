import { Model, Document } from 'mongoose';

class CrudRepository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async findAll(): Promise<T[]> {
        return this.model.find();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id);
    }
}

export default CrudRepository;
