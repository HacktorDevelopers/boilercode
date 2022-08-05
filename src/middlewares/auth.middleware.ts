import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../shared/jwt.utils";

/// verify JWT middleware
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decodedToken: any = await verifyJWT(token, "json-web-token-secret");
            // console.log("Token",decodedToken);
            if (!decodedToken) {
                res.status(401).json({
                    "message": "Invalid token"
                })
                return
            }
            req.userId = decodedToken?.id;
            next();
        } else {
            res.status(401).json({
                "message": "No token provided"
            })
        }
    } catch (error: any) {
        console.log(error)
        if (error.name === "TokenExpiredError") {
            return res.status(500).json({
                "message": `Token expired`
            });
        }
        return res.status(500).json({
            "message": `Error: ${error}`
        });
    }
}