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
const joi_1 = __importDefault(require("joi"));
const password_utils_1 = require("../../../shared/password.utils");
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
class UserRegistrationController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = joi_1.default.object({
                    "first_name": joi_1.default.string().required(),
                    "last_name": joi_1.default.string().required(),
                    "email": joi_1.default.string().email().required(),
                    "password": joi_1.default.string().required()
                });
                const { value, error } = schema.validate(req.body);
                if (error != null) {
                    return res.status(422).json({
                        "message": error.message
                    });
                }
                const existingUser = yield prismaClient_1.default.user.findFirst({
                    where: { email: value.email }
                });
                if (existingUser != null) {
                    return res.status(400).json({
                        "message": "user already exists."
                    });
                }
                yield prismaClient_1.default.user.create({
                    data: {
                        password: yield (0, password_utils_1.hashPassword)(value.password),
                        email: value.email,
                        firstName: value.first_name,
                        lastName: value.last_name
                    }
                });
                return res.json({
                    "message": "Registration successful"
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    "message": "Error: an error occurred."
                });
            }
        });
    }
}
exports.default = UserRegistrationController;
