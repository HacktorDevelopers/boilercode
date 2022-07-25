import prismaClient from "../shared/prismaClient";

export default class ParentService {
    constructor() {}
    
    async getParentDetailByEmail(email: string): Promise<any> {
        return await prismaClient.parent.findFirst({
            where: {email}
        });
    }
}