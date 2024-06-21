"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarmaService = void 0;
const axios_1 = __importDefault(require("axios"));
class KarmaService {
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
}
exports.KarmaService = KarmaService;
