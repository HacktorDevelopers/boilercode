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
class ParentChildrenController {
    children(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseService = new BaseService_1.default();
                const children = yield baseService.childService().getChildren({
                    parentId: req.userId
                });
                res.status(200).json({
                    "status": true,
                    "message": "",
                    "data": children
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    addChild(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (data.name.length == 0) {
                    res.status(400).json({
                        "message": "Child name must be provided"
                    });
                }
                if (data.email.length == 0) {
                    res.status(400).json({
                        "message": "Child email must be provided"
                    });
                }
                if (data.password.length == 0) {
                    res.status(400).json({
                        "message": "Child password must be provided"
                    });
                }
                const baseService = new BaseService_1.default();
                const child = yield baseService.childService().createChild({
                    email: data.email,
                    name: data.name,
                    parentId: req.userId,
                    password: yield (0, password_utils_1.hashPassword)(data.password)
                });
                res.status(200).json({
                    "status": true,
                    "message": "Child added successfully",
                    "data": child
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    removeChild(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseService = new BaseService_1.default();
                const children = yield baseService.childService().removeChild({
                    parentId: req.userId,
                    id: req.params['childId']
                });
                res.status(200).json({
                    "status": true,
                    "message": "Child deleted successfully"
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    updateChild(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const childId = req.params['childId'];
                if (data.name && data.name.length == 0) {
                    res.status(400).json({
                        "message": "Child name must be provided"
                    });
                }
                if (data.email && data.email.length == 0) {
                    res.status(400).json({
                        "message": "Child email must be provided"
                    });
                }
                const baseService = new BaseService_1.default();
                const child = yield baseService.childService().updateChild({
                    id: childId
                }, {
                    name: data.name,
                    email: data.email,
                });
                res.status(200).json({
                    "status": true,
                    "message": "Child updated successfully",
                    "data": child
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    getChild(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const childId = req.params['childId'];
                const baseService = new BaseService_1.default();
                const child = yield baseService.childService().getChildrenWithOtherDetail({
                    id: childId,
                    parentId: req.userId
                });
                res.status(200).json({
                    "status": true,
                    "message": "Child updated successfully",
                    "data": child
                });
            }
            catch (error) {
                res.status(500).json({
                    "message": `Error: ${error}`
                });
            }
        });
    }
    childLocationLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    childCurrentLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = ParentChildrenController;
