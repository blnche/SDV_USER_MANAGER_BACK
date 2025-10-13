import UserModel from "../databases/models/user.model.js";

class UserRepository {

    async getAll() {
        try {
            const result = await UserModel.find()
            return result
        } catch (error) {
            console.log('Error fetching users', error);
            throw error
        } 
    }

    async findByEmail(email) {
        return UserModel.findOne({ email });
    }
    
    async findById(id) {
        return UserModel.findById(id);
    }
    
    async create(userData) {
        const user = new UserModel(userData);
        return user.save();
    }
}

export default new UserRepository()