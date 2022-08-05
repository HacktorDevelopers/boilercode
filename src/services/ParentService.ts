import { Parent } from "@prisma/client";
import prismaClient from "../shared/prismaClient";

export default class ParentService {
    constructor() {}
    
    async getParentDetailByEmail(email: string): Promise<Parent | null> {
        return await prismaClient.parent.findFirst({
            where: {email}
        });
    }

    async getParentDetailById(id: string): Promise<Parent | null> {
        return await prismaClient.parent.findFirst({
            where: {id}
        });
    }

    async createParent(parentData: CreateParentDTO): Promise<Parent | null> {
        return await prismaClient.parent.create({
            data: parentData
        });
    }

    async updateParent(userId: string, parentData: UpdateParentDTO): Promise<any> {
        return await prismaClient.parent.update({
            where: {id: userId},
            data: parentData
        });
    }

    async updateParentPassword(where: ParentQueryDTO, parentData: UpdatePasswordDTO): Promise<any> {
        return await prismaClient.parent.update({
            where,
            data: parentData
        });
    }
}

export interface CreateParentDTO {
    name: string,
    email: string,
    password: string
}

export interface UpdateParentDTO {
    name?: string,
    email?: string
}

export interface ParentQueryDTO {
    name?: string,
    email?: string,
    password?: string
    id?: string
}

export interface UpdatePasswordDTO {
    password?: string
}