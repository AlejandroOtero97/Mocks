import mongoose from "mongoose";

class ContainerMongoose {
    constructor(collection, url, options) {
        mongoose.connect(url, options).then(() => {
            this.collection = mongoose.model(collection.name, collection.schema);
        })
    }
    async save(elem){
        const saved = new this.collection(elem);
        await saved.save();
        return elem;
    }
    async getById(id){
        try{
            const element = await this.collection.findById(id).select({ __v: 0 }).lean();
            return element;
        }catch
        {
            throw new Error(`Error: Element not found`)
        }
    }
    async getAll(){
        const elements = await this.collection.find().select({ __v: 0 }).lean();
        return elements;
    }
    async updateById(id, elem){
        try{
            const updated = await this.collection.findByIdAndUpdate(id, elem, { new: true });
            return updated;
        }
        catch{
            throw new Error(`Error: Element not found`)
        }
    }
}

export default ContainerMongoose;