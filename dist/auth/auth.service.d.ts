import { LoginDto, SignupDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RefershToken } from './schemas/refreshToken.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    private refreshModel;
    constructor(userModel: Model<User>, jwtService: JwtService, refreshModel: Model<RefershToken>);
    signUp(signupData: SignupDto): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    login(loginData: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTken(refrshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateUserTokens(userId: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    storedRefreshToken(token: string, userId: string): Promise<void>;
}
