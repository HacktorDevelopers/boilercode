import { OTPReason } from "@prisma/client";
import { Request, Response } from "express";
import BaseService from "../../../services/BaseService";
import { CreateOTPDTO } from "../../../services/OTPService";
import { UpdateParentDTO, UpdatePasswordDTO } from "../../../services/ParentService";
import { CreatePasswordResetRequestDTO } from "../../../services/PasswordResetRequestService";
import { hashPassword } from "../../../shared/password.utils";
import BaseController from "../../BaseController";


interface ForgotPasswordDTO {
    email: string
}

interface VerifyForgotPasswordDTO {
    otp: string,
}

interface ResetPasswordDTO {
    password: string,
    confirmPassword: string,
    requestId: string,
}


class ParentForgotPasswordController implements BaseController {

    services(): BaseService {
        return new BaseService();
    }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const data: ForgotPasswordDTO = req.body;

            const response = await new BaseService().parentService().getParentDetailByEmail(data.email);

            if (response === null) {
                res.status(401).json({
                    "message": "Invalid email or password"
                })
            } else {
                /// create an entry for the otp
                /// check existing otp
                let otp = await new BaseService().otpService().getOTP({userId: response.id, otpReason: OTPReason.PasswordResetRequest});
                if (!otp) {
                    const otpData: CreateOTPDTO =  {
                        otp: "000000",
                        userId: response.id,
                        otpReason: OTPReason.PasswordResetRequest
                    }
                    otp = await new BaseService().otpService().createOTP(otpData);
                }
                res.json({'status': true, 'message': `An otp have been sent to ${data.email}`, data: otp});
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
            const data: VerifyForgotPasswordDTO = req.body;

            const otp = await new BaseService().otpService().getOTP({otp: data.otp, otpReason: OTPReason.PasswordResetRequest});

            if (otp && data.otp == otp.otp) {
                await new BaseService().otpService().deleteOTP(otp.id);
                const requestData: CreatePasswordResetRequestDTO = {
                    userId: otp.userId
                }
                const resetRequest = await new BaseService().passwordResetRequestService().createPaswordResetRequest(requestData)
                res.json({'status': true, 'message': 'Verification successful', data: {
                    is: resetRequest?.id
                }});
            } else {
                res.status(401).json({
                    "message": "Invalid OTP"
                })
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "message": `Error: ${error}`,
            });
        }
    }

    async reset(req: Request, res: Response): Promise<void> {
        try {
            const data: ResetPasswordDTO = req.body;

            // const response = await new BaseService().parentService().createParent(data);

            const request = await new BaseService().passwordResetRequestService().getPaswordResetRequest(data.requestId);

            if (request && data.requestId === request.id) {
                if (data.password != data.confirmPassword) {
                    res.status(400).json({
                        "message": "Password and confirm password must match"
                    })
                } else {
                    const parent = await new BaseService().parentService().getParentDetailById(request.userId);
                    const newPassword = await hashPassword(data.password)
                    const newParentData: UpdatePasswordDTO = {
                        password: newPassword
                    }
                    await new BaseService().parentService().updateParentPassword(
                        {id: parent!.id},
                        newParentData
                    );
                    res.json({'status': true, 'message': 'Password reset successful'});
                }
            } else {
                res.status(402).json({
                    "message": "Invalid request"
                })
            }

            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "message": `Error: ${error}`,
            });
        }
    }

}

export default ParentForgotPasswordController;