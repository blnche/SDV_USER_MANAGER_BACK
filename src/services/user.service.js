import UserRepository from '../repositories/userRepository.js';
import { CustomError } from '../utils/response.js';

class UserService {
    
    async getAll() {
        const users = await UserRepository.getAll()
        
        if(users.length > 0) throw new CustomError(404, "NO_USERS_FOUND", 'No users found in the database.')
        return users
    }
    
    async getById(id) {
        const user = await UserRepository.findById(id)

        if(!user) throw new CustomError(404, "USER_NOT_FOUND", 'No user found with this id.')
        return user
    }

    async updateUser(id, data) {
        const user = await UserRepository.findById(id)

        if(!user) throw new CustomError(404, 'USER_NOT_FOUND', 'No user found to update with this id.')
        return await UserRepository.updateUser(user, data)
    }

    async create(user) {
        const newUser = await UserRepository.create(user)

        if(!newUser) throw new CustomError(500, "USER_NOT_CREATED", "Failed to create new user.");

        return newUser
    }

    async delete(user) {
        const deletedUser = await UserRepository.delete(user)

        if(!deletedUser) throw new CustomError(404, "USER_NOT_FOUND", 'No user found to delete with this id.')
        return deletedUser
    }
}

export default new UserService()