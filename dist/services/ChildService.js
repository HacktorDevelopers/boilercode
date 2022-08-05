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
const prismaClient_1 = __importDefault(require("../shared/prismaClient"));
class ChildService {
    createChild(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.child.create({
                data: data,
                include: {
                    currentLocation: true,
                }
            });
        });
    }
    updateChild(where, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.child.update({
                where: where,
                data: data
            });
        });
    }
    getChildren(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.child.findMany({
                where: where,
            });
        });
    }
    getChildrenWithOtherDetail(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.child.findMany({
                where: where,
                include: {
                    parent: true,
                    currentLocation: true,
                    locationLog: true
                }
            });
        });
    }
    removeChild(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.child.deleteMany({
                where: where,
            });
        });
    }
}
exports.default = ChildService;
