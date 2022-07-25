import { Request, Response } from "express";
import BaseController from "../../BaseController";

class AdminLoginController implements BaseController {

    execute(req: Request, res: Response): void {
        try {
            const {email} = req.body;
            res.json({'status': true, 'message': 'Login success '+email});
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "message": `Error: ${error}`,
            });
        }
    }
}

export default AdminLoginController;