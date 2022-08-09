import { Schedule, ScheduleStatus } from "@prisma/client";
import prismaClient from "../shared/prismaClient";


class ScheduleRepository {

    async createSchedule(data: CreateScheduleDto): Promise<Schedule> {
        return await prismaClient.schedule.create({
            data: {...data}
        })
    }

    async updateSchedule(condition: QueryParam, data: UpdateScheduleDto): Promise<Schedule> {
        return await prismaClient.schedule.update({
            data: {...data},
            where: condition
        })
    }

    async getSchedules(condition: QueryParam): Promise<Schedule[]> {
        return await prismaClient.schedule.findMany({
            where: condition
        })
    }

    async deleteSchedules(condition: QueryParam): Promise<Schedule> {
        return await prismaClient.schedule.delete({
            where: condition
        })
    }

}

export interface CreateScheduleDto {
    title: string;
    startTime: Date;
    endTime: Date;
    description: string;
    childId: string;
}

export interface UpdateScheduleDto {
    title?: string;
    startTime?: Date;
    endTime?: Date;
    description?: string;
    childId?: string;
    status?: ScheduleStatus
}

export interface QueryParam {
    childId?: string;
    id?: string;
}


export default ScheduleRepository;