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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const prisma = prisma_1.default.getInstance();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { college_id, password } = req.body;
        if (!college_id || !password) {
            res.status(400).json({
                success: false,
                message: "Please provide all the required fields",
            });
            return;
        }
        const user = yield prisma.user.findUnique({
            where: {
                college_id,
            },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ college_id: user.college_id, email: user.email, type: user.type }, process.env.JWT_SECRET);
        const { password: p } = user, userWithoutPassword = __rest(user, ["password"]);
        res.status(200).json({
            success: true,
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("req", req.body);
        const { name, email, college_id, password, type } = req.body;
        if (!name || !email || !college_id || !password || !type) {
            res.status(400).json({
                success: false,
                message: "Please provide all the required fields",
            });
            return;
        }
        const user = yield prisma.user.findUnique({
            where: {
                college_id,
            },
        });
        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exists",
            });
            return;
        }
        const SALT_ROUNDS = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        yield prisma.user.create({
            data: {
                type,
                name,
                email,
                college_id,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    }
    catch (error) {
        console.log(error);
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.register = register;
