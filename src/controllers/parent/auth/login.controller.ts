import { Request, Response } from "express";
import BaseService from "../../../services/BaseService";
import { generateToken } from "../../../shared/jwt.utils";
import BaseController from "../../BaseController";
import dotenv from "dotenv"
import { matchPassword } from "../../../shared/password.utils";

dotenv.config();


interface LoginDTO {
    email: string,
    password: string
}
class ParentLoginController implements BaseController {

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const data: LoginDTO = req.body;

            const response = await new BaseService().parentService().getParentDetailByEmail(data.email);

            if (response === null) {
                res.status(401).json({
                    "message": "Invalid email or password"
                })
            } else {
                if (await matchPassword(data.password, response.password)) {
                    const token = generateToken({
                        id: response.id,
                        email: response.email,
                    }, "json-web-token-secret", { expiresIn: '1h' });
                    res.json({'status': true, 'message': 'Login successful', data: response, token});
                } else {
                    res.status(401).json({
                        "message": "Invalid email or password"
                    })
                }
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "message": `Error: ${error}`,
            });
        }
    }

}

export default ParentLoginController;