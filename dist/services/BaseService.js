"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChildService_1 = __importDefault(require("./ChildService"));
const OTPService_1 = __importDefault(require("./OTPService"));
const ParentService_1 = __importDefault(require("./ParentService"));
const PasswordResetRequestService_1 = __importDefault(require("./PasswordResetRequestService"));
const schedule_repository_1 = __importDefault(require("./schedule.repository"));
class BaseService {
    parentService() {
        return new ParentService_1.default();
    }
    passwordResetRequestService() {
        return new PasswordResetRequestService_1.default();
    }
    otpService() {
        return new OTPService_1.default();
    }
    childService() {
        return new ChildService_1.default();
    }
    scheduleRepo() {
        return new schedule_repository_1.default();
    }
}
exports.default = BaseService;
