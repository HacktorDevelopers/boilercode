import { Request, Response } from "express";
import Joi from "joi"
import { hashPassword } from "../../../shared/password.utils";
import prismaClient from "../../../shared/prismaClient";


class UserRegistrationController {

    static async index(req: Request, res: Response): Promise<any> {
        try {
            const schema = Joi.object({
                "first_name": Joi.string().required(),
                "last_name": Joi.string().required(),
                "email": Joi.string().email().required(),
                "password": Joi.string().required()
            })

            const { value, error } = schema.validate(req.body)

            if (error != null) {
                return res.status(422).json({
                    "message": error.message
                })
            }
            
            const existingUser = await prismaClient.user.findFirst({
                where: {email: value.email}
            })

            if (existingUser != null) {
                return res.status(400).json({
                    "message": "user already exists."
                })
            }

            await prismaClient.user.create({
                data: {
                    password: await hashPassword(value.password),
                    email: value.email,
                    firstName: value.first_name,
                    lastName: value.last_name
                }
            })

            return res.json({
                "message": "Registration successful"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "message": "Error: an error occurred."
            })
        }
    }
}


export default UserRegistrationController;