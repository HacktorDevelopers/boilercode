import { Request, Response } from "express";

interface BaseController {
    execute(req: Request, res: Response): void;
}

export default BaseController;