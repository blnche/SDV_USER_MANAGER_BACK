import AuthService from '../services/auth.service.js'
import UserService from "../services/user.service.js";
import { CustomError, sendCustomError } from '../utils/response.js';

class AuthController {

    async register(req, res) {
        try {            
            const user = await AuthService.register(req.body)
            
            res.status(201).json({ message: 'User created', user });
        } catch (error) {
            sendCustomError(error, res)
        }
    }

    async login(req, res) {
        try {
            const { token, user } = await AuthService.login(req.body);

            res.status(200).json({ message: 'User is logged in', user, token });
        } catch (error) {
            sendCustomError(error, res);
        }
    }

    async loggedUser(req, res) {        
        try {
            const valid = AuthService.verifyToken(req.headers.authorization.split(" ")[1])

            if(!valid) throw new CustomError(500, 'INVALID_JWT', 'Invalid token')

            const user = await UserService.getById(valid.id)

            res.status(200).send(user);
        } catch (error) {
            sendCustomError(error, res);
        }
    }
}

export default new AuthController()