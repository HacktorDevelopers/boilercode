import { Request, Response } from "express";
import BaseService from "../../../services/BaseService";
import { hashPassword } from "../../../shared/password.utils";

interface AddChildRequest {
    name: string;
    email: string;
    password: string;
}

interface UpdateChildRequest {
    name?: string;
    email?: string;
    password?: string;
    childId: string;
}

export default class ParentChildrenController {

    async children(req: Request, res: Response) {
        try {
            const baseService = new BaseService();
            const children = await baseService.childService().getChildren({
                parentId: req.userId!
            });

            res.status(200).json({
                "status": true,
                "message": "",
                "data": children
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            })
        }
    }

    async addChild(req: Request, res: Response) {
        try {

            const data: AddChildRequest = req.body;

            if (data.name.length == 0) {
                res.status(400).json({
                    "message": "Child name must be provided"
                })
            }

            if (data.email.length == 0) {
                res.status(400).json({
                    "message": "Child email must be provided"
                })
            }

            if (data.password.length == 0) {
                res.status(400).json({
                    "message": "Child password must be provided"
                })
            }
            const baseService = new BaseService();
            const child = await baseService.childService().createChild({
                email: data.email,
                name: data.name,
                parentId: req.userId!,
                password: await hashPassword(data.password)
            })

            res.status(200).json({
                "status": true,
                "message": "Child added successfully",
                "data": child
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            })
        }
    }

    async removeChild(req: Request, res: Response) {
        try {
            const baseService = new BaseService();
            const children = await baseService.childService().removeChild({
                parentId: req.userId!,
                id: req.params['childId']
            });

            res.status(200).json({
                "status": true,
                "message": "Child deleted successfully"
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            })
        }
    }

    async updateChild(req: Request, res: Response) {
        try {

            const data: UpdateChildRequest = req.body;
            const childId: string = req.params['childId'];

            if (data.name && data.name!.length == 0) {
                res.status(400).json({
                    "message": "Child name must be provided"
                })
            }

            if (data.email && data.email!.length == 0) {
                res.status(400).json({
                    "message": "Child email must be provided"
                })
            }
            const baseService = new BaseService();
            const child = await baseService.childService().updateChild({
                id: childId
            }, {
                name: data.name!,
                email: data.email!,
            })

            res.status(200).json({
                "status": true,
                "message": "Child updated successfully",
                "data": child
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            })
        }
    }

    async getChild(req: Request, res: Response) {
        try {

            const childId: string = req.params['childId'];

            const baseService = new BaseService();
            const child = await baseService.childService().getChildrenWithOtherDetail({
                id: childId,
                parentId: req.userId!
            })

            res.status(200).json({
                "status": true,
                "message": "Child updated successfully",
                "data": child
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            })
        }
    }

    async childLocationLog(req: Request, res: Response) {}

    async childCurrentLocation(req: Request, res: Response) {}
}