"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
const refreshToken_schema_1 = require("./schemas/refreshToken.schema");
(0, uuid_1.v4)();
let AuthService = class AuthService {
    userModel;
    jwtService;
    refreshModel;
    constructor(userModel, jwtService, refreshModel) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.refreshModel = refreshModel;
    }
    async signUp(signupData) {
        try {
            const { name, email, password } = signupData;
            const emailInUse = await this.userModel.findOne({ email });
            if (emailInUse) {
                throw new common_1.BadRequestException('Email already in use');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            return this.userModel.create({
                name,
                email,
                password: hashedPassword
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong, please try again later');
        }
    }
    async login(loginData) {
        const { email, password } = loginData;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('user not found');
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new common_1.UnauthorizedException('password does not match');
        }
        return this.generateUserTokens(user._id);
    }
    async refreshTken(refrshToken) {
        const token = await this.refreshModel.findOneAndDelete({
            token: refrshToken,
            expiryDate: { $gte: new Date() }
        });
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        return this.generateUserTokens(token.userId);
    }
    async generateUserTokens(userId) {
        const accessToken = await this.jwtService.sign({ userId });
        const refreshToken = (0, uuid_1.v4)();
        await this.storedRefreshToken(refreshToken, userId);
        return {
            accessToken,
            refreshToken
        };
    }
    async storedRefreshToken(token, userId) {
        const expiryDate = new Date;
        expiryDate.setDate(expiryDate.getDate() + 3);
        await this.refreshModel.create({ token, userId, expiryDate });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(refreshToken_schema_1.RefershToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map