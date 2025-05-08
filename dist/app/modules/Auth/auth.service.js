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
exports.authServices = void 0;
const prisma_1 = require("../../../utils/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const emailSender_1 = __importDefault(require("./emailSender"));
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (existingUser) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Email already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 12);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role || "USER",
    };
    const result = yield prisma_1.prisma.user.create({
        data: userData,
    });
    return result;
});
const loggedInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const isMatch = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isMatch) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
    const accessToken = jwtHelpers_1.jwtHelper.generateToken({
        id: userData.id,
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelper.generateToken({
        id: userData.id,
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.refresh_token_secret);
    }
    catch (error) {
        throw new Error("You are not authorize");
    }
    const userData = yield prisma_1.prisma.user.findFirstOrThrow({
        where: {
            email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email,
        },
    });
    const accessToken = jwtHelpers_1.jwtHelper.generateToken({
        id: userData.id,
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ payload });
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const resetPassToken = jwtHelpers_1.jwtHelper.generateToken({
        id: userData.id,
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.reset_pass_token_secret, config_1.default.jwt.reset_pass_token_expires_in);
    const resetPassUrl = config_1.default.reset_pass_url + `?email=${userData.email}&token=${resetPassToken}`;
    yield (0, emailSender_1.default)(userData.email, `<div>
<p>Dear User,</p>
<p>Your Password reset link 
<a href=${resetPassUrl}>
<button>Reset Password</button>
</a>
</p>
</div>`);
    console.log(resetPassUrl);
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const isValidToken = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.reset_pass_token_secret);
    if (!isValidToken) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are unauthorize");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    yield prisma_1.prisma.user.update({
        where: {
            email: userData.email,
        },
        data: {
            password: hashedPassword,
        },
    });
    return {
        message: "Password reset successfully",
    };
});
exports.authServices = {
    register,
    loggedInUser,
    refreshToken,
    forgotPassword,
    resetPassword,
};
