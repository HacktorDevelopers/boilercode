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
class ParentLoginController {
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
                    res.json({ 'status': true, 'message': 'Login successful', data: response });
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
exports.default = ParentLoginController;
