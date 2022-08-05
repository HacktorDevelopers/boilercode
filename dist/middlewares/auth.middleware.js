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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jwt_utils_1 = require("../shared/jwt.utils");
/// verify JWT middleware
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decodedToken = yield (0, jwt_utils_1.verifyJWT)(token, "json-web-token-secret");
            // console.log("Token",decodedToken);
            if (!decodedToken) {
                res.status(401).json({
                    "message": "Invalid token"
                });
                return;
            }
            req.userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id;
            next();
        }
        else {
            res.status(401).json({
                "message": "No token provided"
            });
        }
    }
    catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
            return res.status(500).json({
                "message": `Token expired`
            });
        }
        return res.status(500).json({
            "message": `Error: ${error}`
        });
    }
});
exports.authenticateUser = authenticateUser;
