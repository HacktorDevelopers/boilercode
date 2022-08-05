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
const password_utils_1 = require("../../../shared/password.utils");
class ParentForgotPasswordController {
    services() {
        return new BaseService_1.default();
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const response = yield new BaseService_1.default().parentService().getParentDetailByEmail(data.email);
                if (response === null) {
                    res.status(401).json({
                        "message": "Invalid email or password"
                    });
                }
                else {
                    /// create an entry for the otp
                    /// check existing otp
                    let otp = yield new BaseService_1.default().otpService().getOTP({ userId: response.id, otpReason: client_1.OTPReason.PasswordResetRequest });
                    if (!otp) {
                        const otpData = {
                            otp: "000000",
                            userId: response.id,
                            otpReason: client_1.OTPReason.PasswordResetRequest
                        };
                        otp = yield new BaseService_1.default().otpService().createOTP(otpData);
                    }
                    res.json({ 'status': true, 'message': `An otp have been sent to ${data.email}`, data: otp });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    "message": `Error: ${error}`,
                });
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const otp = yield new BaseService_1.default().otpService().getOTP({ otp: data.otp, otpReason: client_1.OTPReason.PasswordResetRequest });
                if (otp && data.otp == otp.otp) {
                    yield new BaseService_1.default().otpService().deleteOTP(otp.id);
                    const requestData = {
                        userId: otp.userId
                    };
                    const resetRequest = yield new BaseService_1.default().passwordResetRequestService().createPaswordResetRequest(requestData);
                    res.json({ 'status': true, 'message': 'Verification successful', data: {
                            is: resetRequest === null || resetRequest === void 0 ? void 0 : resetRequest.id
                        } });
                }
                else {
                    res.status(401).json({
                        "message": "Invalid OTP"
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    "message": `Error: ${error}`,
                });
            }
        });
    }
    reset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                // const response = await new BaseService().parentService().createParent(data);
                const request = yield new BaseService_1.default().passwordResetRequestService().getPaswordResetRequest(data.requestId);
                if (request && data.requestId === request.id) {
                    if (data.password != data.confirmPassword) {
                        res.status(400).json({
                            "message": "Password and confirm password must match"
                        });
                    }
                    else {
                        const parent = yield new BaseService_1.default().parentService().getParentDetailById(request.userId);
                        const newPassword = yield (0, password_utils_1.hashPassword)(data.password);
                        const newParentData = {
                            password: newPassword
                        };
                        yield new BaseService_1.default().parentService().updateParentPassword({ id: parent.id }, newParentData);
                        res.json({ 'status': true, 'message': 'Password reset successful' });
                    }
                }
                else {
                    res.status(402).json({
                        "message": "Invalid request"
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    "message": `Error: ${error}`,
                });
            }
        });
    }
}
exports.default = ParentForgotPasswordController;
