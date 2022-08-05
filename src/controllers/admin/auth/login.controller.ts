import { Request, Response } from "express";
import BaseService from "../../../services/BaseService";
import BaseController from "../../BaseController";

class AdminLoginController implements BaseController {

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const {email} = req.body;
            const response = await new BaseService().parentService().getParentDetailByEmail(email);

            if (response === null) {
                res.status(401).json({
                    "message": "Invalid email or password"
                })
            } else {
                res.json({'status': true, 'message': 'Login success '+email, data: response});
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "message": `Error: ${error}`,
            });
        }
    }

}

export default AdminLoginController;