import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto, SignupDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { RefershToken } from './schemas/refreshToken.schema';
uuidv4()

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(RefershToken.name) private refreshModel: Model<RefershToken>) {}


  async signUp(signupData: SignupDto) {
    try {
      const { name, email, password } = signupData;
      const emailInUse = await this.userModel.findOne({ email })
      if (emailInUse) {
        throw new BadRequestException('Email already in use')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      return this.userModel.create({
        name,
        email,
        password: hashedPassword
      })

    } catch (error) {
      throw new InternalServerErrorException('Something went wrong, please try again later')
    }
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData
    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new UnauthorizedException('user not found')
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
      throw new UnauthorizedException('password does not match')
    }


    return this.generateUserTokens(user._id)


  }

  async refreshTken(refrshToken: string){
    const token = await this.refreshModel.findOneAndDelete({
      token: refrshToken,
      expiryDate: {$gte: new Date()}
    })
    if(!token){
      throw new UnauthorizedException()
    }

    return this.generateUserTokens(token.userId)
  }

  async generateUserTokens(userId) {
    const accessToken = await this.jwtService.sign({ userId })
    const refreshToken = uuidv4();
    await this.storedRefreshToken(refreshToken, userId)
    return {
      accessToken,
      refreshToken
    } 
  }

  async storedRefreshToken(token: string, userId:string) {
    const expiryDate = new Date;
    expiryDate.setDate(expiryDate.getDate() + 3)

    await this.refreshModel.create({ token, userId, expiryDate })
  }
}
