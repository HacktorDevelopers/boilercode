import { Request, Response } from "express";
import BaseController, { FileData } from "../../BaseController";

class AdminLoginController implements BaseController {

    execute(req: Request & FileData, res: Response): void {
        try {
            const {email} = req.body;
            // console.log(req.files['image']);
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