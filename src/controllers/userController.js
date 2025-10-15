import UserService from "../services/user.service.js";
import { CustomError, sendCustomError } from "../utils/response.js";

class UserController {

    getAll = async (req, res) => {
        try {
            const users = await UserService.getAll()

            res.status(200).send(users)
        } catch (error) {
            sendCustomError(error, res)
        }
    }
      
    getUserById = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await UserService.getById(id)

            res.status(200).send(user)
        } catch (error) {
            sendCustomError(error, res)
        }
    };
    
    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            if(!updatedData) throw new CustomError(400, 'NO_DATA_TO_UPDATE', 'No data provided to update user.');

            const updatedUser = await UserService.updateUser(id, updatedData);

            res.status(200).send(updatedUser)
        } catch (error) {
            sendCustomError(error, res)
        }
    };
    
    deleteUser = async (req, res) => {    
        try {
            const { id } = req.params;

            const user = await UserService.delete(id)

            res.status(200).send()
        } catch (error) {
            sendCustomError(error, res)
        }       
    } 

}

export default new UserController()