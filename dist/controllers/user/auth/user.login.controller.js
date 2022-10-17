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
const jwt_utils_1 = require("../../../shared/jwt.utils");
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
class UserLoginController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = joi_1.default.object({
                    "email": joi_1.default.string().email().required(),
                    "password": joi_1.default.string().required()
                });
                const { value, error } = schema.validate(req.body);
                console.log(error);
                if (error != null) {
                    return res.status(422).json({
                        "message": error.details.map((e) => e.message).join("\n")
                    });
                }
                const userExist = yield prismaClient_1.default.user.findFirst({
                    where: {
                        email: value.email
                    }
                });
                if (userExist == null) {
                    return res.status(404).json({
                        "message": "Account does not exist."
                    });
                }
                return res.json({
                    "message": "Login successful",
                    "data": {
                        "user": userExist,
                        "token": (0, jwt_utils_1.generateToken)({
                            "id": userExist === null || userExist === void 0 ? void 0 : userExist.id
                        }, process.env.JWT_SECRET, {})
                    }
                });
            }
            catch (error) {
                return res.status(500).json({
                    "message": "Error: an error occurred."
                });
            }
        });
    }
}
exports.default = UserLoginController;
