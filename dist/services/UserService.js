"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const User_1 = require("../models/User");
const uuid_1 = require("uuid");
class UserService {
    constructor() {
        this.userModel = new User_1.UserModel();
    }
    async createUser(user) {
        const isBlacklisted = await this.checkKarmaList(user.email);
        if (isBlacklisted) {
            throw new Error('User is blacklisted');
        }
        const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
        const newUser = await this.userModel.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        return newUser;
    }
    async checkKarmaList(identity) {
        try {
            const response = await axios_1.default.get(`https://adjutor.lendsqr.com/v2/verification/karma/${identity}`, {
                headers: {
                    Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
                },
            });
            if (response.data) {
                return true;
            }
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                if (error.response && error.response.status === 404) {
                    return false;
                }
                console.error('Axios error checking Karma List:', error.message);
            }
            else if (error instanceof Error) {
                console.error('Error checking Karma List:', error.message);
            }
            else {
                console.error('Unexpected error checking Karma List:', error);
            }
            throw new Error('Error checking Karma List');
        }
        return false;
    }
    async loginUser(email, password) {
        const user = await this.userModel.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const token = (0, uuid_1.v4)();
        await this.userModel.update(Object.assign(Object.assign({}, user), { token }));
        return token;
    }
    async findByToken(token) {
        const user = await this.userModel.findByToken(token);
        return user;
    }
}
exports.UserService = UserService;
