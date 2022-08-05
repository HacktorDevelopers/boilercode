import { OTP, OTPReason } from "@prisma/client";
import prismaClient from "../shared/prismaClient";

export default class OTPService {
    constructor() {}
    
    async createOTP(data: CreateOTPDTO): Promise<OTP | null> {
        return await prismaClient.oTP.create({
            data: data
        });
    }

    async getOTPById(id: string): Promise<OTP | null> {
        return await prismaClient.oTP.findFirst({
            where: {id}
        });
    }

    async getOTP(where: GetOTPCondition): Promise<OTP | null> {
        return await prismaClient.oTP.findFirst({
            where
        });
    }

    async deleteOTP(id: string): Promise<any> {
        return await prismaClient.oTP.delete({
            where: {id}
        });
    }
}

export interface CreateOTPDTO {
    userId: string,
    otp: string,
    otpReason: OTPReason
}

export interface GetOTPCondition {
    userId?: string,
    otp?: string,
    otpReason?: OTPReason
}
