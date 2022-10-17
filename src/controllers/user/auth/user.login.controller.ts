import { Request, Response } from "express";
import Joi from "joi"
import { generateToken, verifyJWT } from "../../../shared/jwt.utils";
import prismaClient from "../../../shared/prismaClient";


class UserLoginController {

    static async index(req: Request, res: Response): Promise<any> {
        try {
            const schema = Joi.object({
                "email": Joi.string().email().required(),
                "password": Joi.string().required()
            })

            const { value, error } = schema.validate(req.body)

            console.log(error)

            if (error != null) {
                return res.status(422).json({
                    "message": error.details.map((e) => e.message).join("\n")
                })
            }

            const userExist = await prismaClient.user.findFirst({
                where: {
                    email: value.email
                }
            })

            if (userExist == null) {
                return res.status(404).json({
                    "message": "Account does not exist."
                })
            }

            return res.json({
                "message": "Login successful",
                "data": {
                    "user": userExist,
                    "token": generateToken({
                        "id": userExist?.id
                    }, process.env.JWT_SECRET!, {})
                }
            })


        } catch (error) {
            return res.status(500).json({
                "message": "Error: an error occurred."
            })
        }
    }
}


export default UserLoginController;