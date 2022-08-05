import { Request, Response } from "express";
import BaseService from "../../../services/BaseService";
import { UpdateParentDTO, UpdatePasswordDTO } from "../../../services/ParentService";
import { hashPassword, matchPassword } from "../../../shared/password.utils";
import BaseController from "../../BaseController";

interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}


export default class ParentProfileController implements BaseController {

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const userData = await new BaseService().parentService().getParentDetailById(req.userId!);
            res.status(200).json({
                'status': true,
                'data': userData
            });
        } catch (error: any) {
            res.status(500).json({
                'status': false,
                'message': error.message
            });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const baseService = new BaseService();
            const data: UpdateParentDTO = req.body;
            
            if (data.email != null) {
                const existingParent = await baseService.parentService().getParentDetailByEmail(data.email);
                if (existingParent) {
                    res.status(400).json({
                        "message": "This email is taken"
                    })
                }
            }

            const userData = await baseService.parentService().updateParent(req.userId!, data);

            res.status(200).json({
                'status': true,
                'data': userData,
                "message": "Update successful"
            });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({
                'status': false,
                'message': error.message
            });
        }
    }

    async updatePassword(req: Request, res: Response): Promise<void> {
        try {
            const baseService = new BaseService();
            const data: UpdatePasswordRequest = req.body;
            const userId: string = req.userId!;
            if (data.newPassword == data.confirmPassword) {

                const existingParent = await baseService.parentService().getParentDetailByEmail(userId);
                if (existingParent && await matchPassword(data.currentPassword, existingParent.password)) {
                    const userData = await baseService.parentService().updateParentPassword({
                        id: req.userId!,
                    }, {password: await hashPassword(data.newPassword)});
        
                    res.status(200).json({
                        'status': true,
                        'data': userData,
                        "message": "Password updated successfully"
                    });
                } else {
                    res.status(400).json({
                        "message": "Current password is not correct."
                    })
                }
            } else  {
                res.status(400).json({
                    'message': "Password and confirm password must match"
                });
            }
        } catch (error: any) {
            res.status(500).json({
                'status': false,
                'message': error.message
            });
        }
    }
    
}