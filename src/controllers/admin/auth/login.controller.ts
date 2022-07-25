import { Request, Response } from "express";
import ParentService from "../../../services/ParentService";
import BaseController, { FileData } from "../../BaseController";

class AdminLoginController implements BaseController {

    async execute(req: Request & FileData, res: Response): Promise<void> {
        try {
            const {email} = req.body;
            const response = await new ParentService().getParentDetailByEmail(email);

            if (response === null) {
                res.status(401).json({
                    "message": "Invalid email or password"
                })
            } else {
                // const res = await this.services().parentService().getParentDetailByEmail(email);
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