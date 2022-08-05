import { Request, Response } from "express";
import BaseService from "../../../services/BaseService";
import { CreateParentDTO } from "../../../services/ParentService";
import { hashPassword } from "../../../shared/password.utils";
import BaseController from "../../BaseController";

interface VerifyRegistrationDTO {
    otp: string,
}

class ParentRegisterController implements BaseController {

    services(): BaseService {
        return new BaseService();
    }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const data: CreateParentDTO = req.body;

            const alreadyExist = await this.services().parentService().getParentDetailByEmail(data.email)
            if (alreadyExist) {
                /// return parent already exist
                res.status(401).json({
                    "message": "Parent already exist"
                })
            } else {
                const response = await new BaseService().parentService().createParent({
                    ...data,
                    password: await hashPassword(data.password)
                });
    
                if (response === null) {
                    res.status(401).json({
                        "message": "Invalid email or password"
                    })
                } else {
                    res.json({'status': true, 'message': 'Registration successful', data: response});
                }
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "message": `Error: ${error}`,
            });
        }
    }


    async verify(req: Request, res: Response): Promise<void> {
        try {
            const data: VerifyRegistrationDTO = req.body;

            // const response = await new BaseService().parentService().createParent(data);

            if (data.otp != "000000") {
                res.status(401).json({
                    "message": "Invalid OTP"
                })
            } else {
                res.json({'status': true, 'message': 'Verification successful'});
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "message": `Error: ${error}`,
            });
        }
    }

}

export default ParentRegisterController;