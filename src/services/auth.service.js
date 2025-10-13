import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository.js';

const JWT_SECRET = 'supersecretkey';

class AuthService {

    async register({ username, password, email }) {
        const existingUser = await UserRepository.findByEmail(email)
        if(existingUser) throw new CustomError(404, "USER_EXISTS", 'This email is already taken')
        
        const hashed = await bcrypt.hash(password, 10)
        const newUser = await UserRepository.create({ username, password: hashed, email})
        return newUser
    }

    async login({ email, password }) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new CustomError(404, "USER_NOT_FOUND", "User not found");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new CustomError(401, "INVALID_CREDENTIALS", "Invalid credentials");

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

        return { token, user };
    }

    async verifyToken(token) {
        return jwt.verify(token, JWT_SECRET)
    }
}

export default new AuthService()