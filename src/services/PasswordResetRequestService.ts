import { PasswordResetRequest } from "@prisma/client";
import prismaClient from "../shared/prismaClient";

export default class PasswordResetRequestService {
    constructor() {}
    
    async createPaswordResetRequest(data: CreatePasswordResetRequestDTO): Promise<PasswordResetRequest | null> {
        return await prismaClient.passwordResetRequest.create({
            data: data
        });
    }

    async getPaswordResetRequest(id: string): Promise<PasswordResetRequest | null> {
        return await prismaClient.passwordResetRequest.findFirst({
            where: {id}
        });
    }

    async deletePaswordResetRequest(id: string): Promise<any> {
        return await prismaClient.passwordResetRequest.delete({
            where: {id}
        });
    }
}

export interface CreatePasswordResetRequestDTO {
    userId: string
}