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
const BaseService_1 = __importDefault(require("../../../services/BaseService"));
const password_utils_1 = require("../../../shared/password.utils");
class ParentProfileController {
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield new BaseService_1.default().parentService().getParentDetailById(req.userId);
                res.status(200).json({
                    'status': true,
                    'data': userData
                });
            }
            catch (error) {
                res.status(500).json({
                    'status': false,
                    'message': error.message
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseService = new BaseService_1.default();
                const data = req.body;
                if (data.email != null) {
                    const existingParent = yield baseService.parentService().getParentDetailByEmail(data.email);
                    if (existingParent) {
                        res.status(400).json({
                            "message": "This email is taken"
                        });
                    }
                }
                const userData = yield baseService.parentService().updateParent(req.userId, data);
                res.status(200).json({
                    'status': true,
                    'data': userData,
                    "message": "Update successful"
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    'status': false,
                    'message': error.message
                });
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseService = new BaseService_1.default();
                const data = req.body;
                const userId = req.userId;
                if (data.newPassword == data.confirmPassword) {
                    const existingParent = yield baseService.parentService().getParentDetailByEmail(userId);
                    if (existingParent && (yield (0, password_utils_1.matchPassword)(data.currentPassword, existingParent.password))) {
                        const userData = yield baseService.parentService().updateParentPassword({
                            id: req.userId,
                        }, { password: yield (0, password_utils_1.hashPassword)(data.newPassword) });
                        res.status(200).json({
                            'status': true,
                            'data': userData,
                            "message": "Password updated successfully"
                        });
                    }
                    else {
                        res.status(400).json({
                            "message": "Current password is not correct."
                        });
                    }
                }
                else {
                    res.status(400).json({
                        'message': "Password and confirm password must match"
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    'status': false,
                    'message': error.message
                });
            }
        });
    }
}
exports.default = ParentProfileController;
