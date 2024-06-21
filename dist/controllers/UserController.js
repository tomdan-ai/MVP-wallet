"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const user = await this.userService.createUser(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
            }
        };
        this.login = async (req, res) => {
            try {
                const token = await this.userService.loginUser(req.body.email, req.body.password);
                res.status(200).json({ token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
            }
        };
        this.userService = new UserService_1.UserService();
    }
}
exports.UserController = UserController;
