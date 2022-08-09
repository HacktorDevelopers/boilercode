import { ScheduleStatus } from "@prisma/client";
import { Request, Response } from "express";
import BaseService from "../../../services/BaseService";


class ParentChildScheduleController {
    

    async createSchedule(req: Request, res: Response) {
        try {
            const {childId} = req.params;
            const {title, startTime, endTime, description} = req.body;
            const baseService = new BaseService();
            baseService.scheduleRepo().createSchedule({
                ...req.body,
                childId: childId
            })
            res.status(200).json({
                "status": true,
                "message": "Schedule created successfully"
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            });
        }
    }

    async updateSchedule(req: Request, res: Response) {
        try {
            const {childId} = req.params;
            const {title, startTime, endTime, description, scheduleId} = req.body;
            const baseService = new BaseService();
            baseService.scheduleRepo().updateSchedule({
                childId: childId,
                id: scheduleId
            }, {
                ...req.body,
                childId: childId
            })
            res.status(200).json({
                "status": true,
                "message": "Schedule updated successfully"
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            });
        }
    }

    async getSchedules(req: Request, res: Response) {
        try {
            const {childId} = req.params;
            const baseService = new BaseService();
            const schedules = await baseService.scheduleRepo().getSchedules({
                childId: childId
            })
            res.status(200).json({
                "status": true,
                "message": "Schedule retreived successfully",
                "data": schedules
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            });
        }
    }

    async activateSchedule(req: Request, res: Response) {
        try {
            const {childId} = req.params;
            const baseService = new BaseService();
            const schedules = await baseService.scheduleRepo().updateSchedule({
                childId: childId
            }, {
                status: ScheduleStatus.Active
            })
            res.status(200).json({
                "status": true,
                "message": "Schedule activated successfully",
                "data": schedules
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            });
        }
    }

    async pauseSchedule(req: Request, res: Response) {
        try {
            const {childId} = req.params;
            const baseService = new BaseService();
            const schedules = await baseService.scheduleRepo().updateSchedule({
                childId: childId
            }, {
                status: ScheduleStatus.Paused
            })
            res.status(200).json({
                "status": true,
                "message": "Schedule paused successfully",
                "data": schedules
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            });
        }
    }

    async deleteSchedule(req: Request, res: Response) {
        try {
            const {childId} = req.params;
            const baseService = new BaseService();
            const schedules = await baseService.scheduleRepo().deleteSchedules({
                childId: childId
            })
            res.status(200).json({
                "status": true,
                "message": "Schedule deleted successfully",
                "data": schedules
            })
        } catch (error) {
            res.status(500).json({
                "message": `Error: ${error}`
            });
        }
    }
}

export default ParentChildScheduleController