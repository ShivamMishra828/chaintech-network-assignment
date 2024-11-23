import { Model, Document } from 'mongoose';

/**
 * Generic CRUD repository for interacting with Mongoose models.
 *
 * @template T - Represents the Mongoose Document type for a specific model.
 */
class CrudRepository<T extends Document> {
    private model: Model<T>;

    /**
     * Initializes the repository with a specific Mongoose model.
     *
     * @param model - The Mongoose model to use for database operations.
     */
    constructor(model: Model<T>) {
        this.model = model;
    }

    /**
     * Creates a new document in the database.
     *
     * @param data - The data to create a new document.
     * @returns The created document.
     */
    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    /**
     * Retrieves all documents from the database.
     *
     * @returns An array of all documents.
     */
    async findAll(): Promise<T[]> {
        return this.model.find();
    }

    /**
     * Retrieves a single document by its ID.
     *
     * @param id - The ID of the document to retrieve.
     * @returns The document if found, or `null` if not found.
     */
    async findById(id: string): Promise<T | null> {
        return this.model.findById(id);
    }

    /**
     * Updates a document by its ID.
     *
     * @param id - The ID of the document to update.
     * @param updatedData - The data to update the document with.
     * @returns The updated document if found, or `null` if not found.
     */
    async update(id: string, updatedData: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, updatedData, { new: true });
    }

    /**
     * Deletes a document by its ID.
     *
     * @param id - The ID of the document to delete.
     * @returns The deleted document if found, or `null` if not found.
     */
    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete({ _id: id });
    }
}

export default CrudRepository;
