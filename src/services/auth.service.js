import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository.js';
import { CustomError } from '../utils/response.js';

const JWT_SECRET = process.env.JWT_SECRET

class AuthService {

    async register({ username, password, email }) {  
        
        const existingUser = await UserRepository.findByEmail(email)
        
        if(existingUser) throw new CustomError(409, "USER_EXISTS", 'This email is already taken')
            
        const hashed = await bcrypt.hash(password, 10)
        const newUser = await UserRepository.create({ username, password: hashed, email})
            
        return newUser
    }
        
    async login({ email, password }) {
        console.log('secret', JWT_SECRET);
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new CustomError(404, "USER_NOT_FOUND", "User not found");
        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new CustomError(401, "INVALID_CREDENTIALS", "Invalid credentials");
        
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
        if(!token) throw new CustomError(500, "TOKEN_GENERATION_FAILED", "Failed to generate token");

        console.log('token', token);
        
        return { token, user };
    }

    verifyToken(token) {
        return jwt.verify(token, JWT_SECRET)
    }
}

export default new AuthService()