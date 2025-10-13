import UserService from "../services/user.service.js";

class UserController {
    constructor(parameters) {
        
    }

    async getAll(req, res) {
        try {
            const users = await UserService.getAll()
            console.log('Controller data: ', users);
            res.status(200).send(users)
        } catch (error) {
            sendCustomError(error, res)
        }
    }
      
    getUserById = (req, res) => {
        const { id } = req.params;
        res.json({ id, name: `User ${id}` });
    };
    
    updateUser = (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        res.json({ id, ...updatedData });
    };
    
    deleteUser = (req, res) => {           
        const { id } = req.params;
        res.json({ message: `User ${id} deleted` });
    } 

}

export default new UserController()