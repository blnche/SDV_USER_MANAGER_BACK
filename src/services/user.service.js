import UserRepository from '../repositories/userRepository.js';
import { CustomError } from '../utils/response.js';

class UserService {
    async getAll() {
        const users = await UserRepository.getAll()
        
        if(!users) throw new CustomError(404, 404, 'Not found')
            return users
    }
    
    async getById(id) {
        const user = await userRepository.getById(id)

        if(!user) throw new CustomError(404, 404, 'Not found')
        return user
    }

    async create(user) {
        const newUser = await userRepository.create(user)

        if(!newUser) throw new CustomError(404, 404, 'Not found')
        return newUser
    }

    async delete(user) {
        const users = await userRepository.delete(user)

        if(!users) throw new CustomError(404, 404, 'Not found')
        return users
    }
}

export default new UserService()