import { Request, Response } from "express";

export interface File {
    fieldName: string;
    originalFilename: string;
    path: string;
    size: number;
    name: string;
    type: string;
}

export interface FileData {
    file: File,
    files: any,
}


interface BaseController {
    execute(req: Request & FileData, res: Response): void;
}

export default BaseController;