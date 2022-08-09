"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const BaseService_1 = __importDefault(require("../../../services/BaseService"));
class ParentChildScheduleController {
    createSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { childId } = req.params;
                const { title, startTime, endTime, description } = req.body;
                const baseService = new BaseService_1.default();
                baseService.scheduleRepo().createSchedule(Object.assign(Object.assign({}, req.body), { childId: childId }));
                res.status(200).json({
                    "status": true,
                    "message": "Schedule created successfully"
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    updateSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { childId } = req.params;
                const { title, startTime, endTime, description, scheduleId } = req.body;
                const baseService = new BaseService_1.default();
                baseService.scheduleRepo().updateSchedule({
                    childId: childId,
                    id: scheduleId
                }, Object.assign(Object.assign({}, req.body), { childId: childId }));
                res.status(200).json({
                    "status": true,
                    "message": "Schedule updated successfully"
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    getSchedules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { childId } = req.params;
                const baseService = new BaseService_1.default();
                const schedules = yield baseService.scheduleRepo().getSchedules({
                    childId: childId
                });
                res.status(200).json({
                    "status": true,
                    "message": "Schedule retreived successfully",
                    "data": schedules
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    activateSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { childId } = req.params;
                const baseService = new BaseService_1.default();
                const schedules = yield baseService.scheduleRepo().updateSchedule({
                    childId: childId
                }, {
                    status: client_1.ScheduleStatus.Active
                });
                res.status(200).json({
                    "status": true,
                    "message": "Schedule activated successfully",
                    "data": schedules
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    pauseSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { childId } = req.params;
                const baseService = new BaseService_1.default();
                const schedules = yield baseService.scheduleRepo().updateSchedule({
                    childId: childId
                }, {
                    status: client_1.ScheduleStatus.Paused
                });
                res.status(200).json({
                    "status": true,
                    "message": "Schedule paused successfully",
                    "data": schedules
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    deleteSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { childId } = req.params;
                const baseService = new BaseService_1.default();
                const schedules = yield baseService.scheduleRepo().deleteSchedules({
                    childId: childId
                });
                res.status(200).json({
                    "status": true,
                    "message": "Schedule deleted successfully",
                    "data": schedules
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
}
exports.default = ParentChildScheduleController;
