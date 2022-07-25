"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminLoginController {
    execute(req, res) {
        try {
            const { email } = req.body;
            // console.log(req.files['image']);
            res.json({ 'status': true, 'message': 'Login success ' + email });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                "message": `Error: ${error}`,
            });
        }
    }
}
exports.default = AdminLoginController;
