import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/user.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    singup(signupData: SignupDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    login(loginData: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
