import { Child } from "@prisma/client";
import prismaClient from "../shared/prismaClient";


export default class ChildService {

    async createChild(data: CreateChildDTO): Promise<Child> {
        return await prismaClient.child.create({
            data: data,
            include: {
                currentLocation: true,
            }
        })
    }

    async updateChild(where: QueryChildParam,data: UpdateChildDTO): Promise<Child> {
        return await prismaClient.child.update({
            where: where,
            data: data
        })
    }

    async getChildren(where: QueryChildParam): Promise<any> {
        return await prismaClient.child.findMany({
            where: where,
        });
    }

    async getChildrenWithOtherDetail(where: QueryChildParam): Promise<any> {
        return await prismaClient.child.findMany({
            where: where,
            include: {
                parent: true,
                currentLocation: true,
                locationLog: true
            }
        });
    }

    async removeChild(where: QueryChildParam): Promise<any> {
        return await prismaClient.child.deleteMany({
            where: where,
        });
    }
}

export interface CreateChildDTO {
    name: string;
    email: string;
    password: string;
    parentId: string;
}

export interface UpdateChildDTO {
    name?: string;
    email?: string;
}


interface QueryChildParam {
    parentId?:string;
    id?: string;
    email?: string;
}