import UserModel from "../databases/models/user.model.js";
import { CustomError } from "../utils/response.js";

class UserRepository {

    async getAll() {
        try {
            return await UserModel.find()
        } catch (error) {
            throw error
        } 
    }
    
    async findById(id) {
        try {
            return await UserModel.findById(id)
        } catch (error) {
            throw error
        }
    }

    async updateUser(user, data) {
        try {
            return await UserModel.findByIdAndUpdate(user._id, data, { new: true })
        } catch (error) {
            console.log('Error updating user', error);
            throw error
        }
    }

    async create(userData) {
        try {            
            const user = await UserModel.create(userData);
            return user.save();
        } catch (error) {            
            throw error
        }
    
    }

    async findByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            return await UserModel.findByIdAndDelete(id);
        } catch (error) {
            throw error
        }
    }

}    


export default new UserRepository()